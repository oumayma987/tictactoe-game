import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SquarComponent } from './squar.component';

describe('SquarComponent', () => {
  let component: SquarComponent;
  let fixture: ComponentFixture<SquarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
