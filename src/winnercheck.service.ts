import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WinnercheckService {

  constructor(private winnerCheckService: WinnercheckService) { }

  dimension = 3
  board = Array(9).fill(null)
  xTurn = false

  addSymbol(id: number) {
    if (this.board[id]) return;
    this.board[id] = (this.xTurn ? "X" : "O") ;
    this.xTurn = !this.xTurn;
  }

  indexFinder(board: Array<string>) {
    let xIndex = [];
    let oIndex = [];
    board.map(
      (item, index) => {
        item === "X" ? xIndex.push([Math.floor(index / this.dimension), (index % this.dimension)])
          : (item === "O" ? oIndex.push([Math.floor(index / this.dimension), index % this.dimension])
            : void (0))
      })
    return [xIndex, oIndex];
  }

  checkX(board: Array<string>): any[]{
    let xIndex = this.indexFinder(board)[0];
    let xRow:any[] = Array(this.dimension).fill(0);
    let xColumn: any[] = Array(this.dimension).fill(0);
    let xMainDia: number = xIndex.filter((item) => item[0] == item[1]).length;
    let xSubDia: number = 0;
    let currentDimension = this.dimension;
    xIndex.forEach(item => { xRow[item[0]]++; xColumn[item[1]]++ });

    for (let iter = 0; iter <= this.dimension; iter++) {
      xIndex.forEach(item => {
        item[0] == iter && item[1] == (currentDimension - 1) && (xSubDia++);
      })
      currentDimension--;
    }
    return [xColumn, xRow, xMainDia, xSubDia];
  }

  checkO(board: Array<string>): any[]{
    let oIndex = this.indexFinder(board)[1];
    let oRow: any[] = Array(this.dimension).fill(0);
    let oColumn: any[] = Array(this.dimension).fill(0);
    let oMainDia: number = oIndex.filter((item) => item[0] == item[1]).length;
    let currentDimension = this.dimension;
    let oSubDia: number = 0;
    oIndex.forEach((item) => { oRow[item[0]]++; oColumn[item[1]]++ });

    for (let iter = 0; iter <= this.dimension; iter++) {
      oIndex.map((item) => item[0] == iter && item[1] == (currentDimension - 1)
        ? oSubDia++ : oSubDia = oSubDia)
      currentDimension--;
    }
    return [oColumn, oRow, oMainDia, oSubDia];
  }

  makeDias(board: Array<string>){
    let xSubDia = this.checkX(board)[3];
    let xMainDia = this.checkX(board)[2];
    let oSubDia = this.checkO(board)[3];
    let oMainDia = this.checkO(board)[2];

    return [xMainDia, oMainDia, xSubDia, oSubDia];
  }

  checkWinner(board: Array<string>) {
    let xIndex = this.indexFinder(board)[0];
    let oIndex = this.indexFinder(board)[1];
    let xRow = this.checkX(board)[1];
    let oRow = this.checkO(board)[1];
    let oColumn = this.checkO(board)[0];
    let xColumn = this.checkX(board)[0];

    let winner = []
    let indexes = []

    oRow.filter((item, index) => {if(item == 3) winner = ["O" , "row", index]})
    oColumn.filter((item, index) => {if(item == 3) winner = ["O", "column", index]})
    xRow.filter((item, index) => {if(item == 3) winner = ["X", "row", index]})
    xColumn.filter((item, index) => {if(item == 3) winner = ["X", "column", index]})

    let Dias = this.makeDias(board);
    if (Dias[0] == 3) winner = ["X", "Main"];
    if (Dias[1] == 3) winner = ["O", "Main"];
    if (Dias[2] == 3) winner = ["X", "Sub"];
    if (Dias[3] == 3) winner = ["O", "Sub"];

    // if (xIndex.length + oIndex.length == 9) winner = ["Draw"];

    if (winner.length == 3){
      winner[1] == "row" ? indexes.push([winner[2] * this.dimension, (winner[2] * this.dimension) + 1, (winner[2] * this.dimension) + 2])
        : indexes.push([winner[2], winner[2] + this.dimension, winner[2] + (2 * this.dimension)])
        return indexes[0]
    }else if (winner.length == 2){
      winner[1] == "Main" ? indexes.push([0, this.dimension + 1, 2 * (this.dimension + 1)])
        : indexes.push([this.dimension - 1, (this.dimension - 1) * 2, (this.dimension - 1) * 3])
        return indexes[0]
    }
    return indexes
  }
}
