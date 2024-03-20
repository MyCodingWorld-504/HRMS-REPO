import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyShiftsComponent } from './daily-shifts.component';

describe('DailyShiftsComponent', () => {
  let component: DailyShiftsComponent;
  let fixture: ComponentFixture<DailyShiftsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyShiftsComponent]
    });
    fixture = TestBed.createComponent(DailyShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
