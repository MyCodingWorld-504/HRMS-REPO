import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTitleSchedulerStatusComponent } from './job-title-scheduler-status.component';

describe('JobTitleSchedulerStatusComponent', () => {
  let component: JobTitleSchedulerStatusComponent;
  let fixture: ComponentFixture<JobTitleSchedulerStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobTitleSchedulerStatusComponent]
    });
    fixture = TestBed.createComponent(JobTitleSchedulerStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
