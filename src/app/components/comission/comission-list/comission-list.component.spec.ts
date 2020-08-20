import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComissionListComponent } from './comission-list.component';

describe('ComissionListComponent', () => {
  let component: ComissionListComponent;
  let fixture: ComponentFixture<ComissionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComissionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
