import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerStatusComponent } from './scheduler-status.component';

describe('SchedulerStatusComponent', () => {
  let component: SchedulerStatusComponent;
  let fixture: ComponentFixture<SchedulerStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchedulerStatusComponent]
    });
    fixture = TestBed.createComponent(SchedulerStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
