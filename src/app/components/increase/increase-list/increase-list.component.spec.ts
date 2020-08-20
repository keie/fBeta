import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncreaseListComponent } from './increase-list.component';

describe('IncreaseListComponent', () => {
  let component: IncreaseListComponent;
  let fixture: ComponentFixture<IncreaseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncreaseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncreaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
