import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { TimeSheetRoutingModule } from './time-sheet-routing.module';
import { SchedulerDashboardComponent } from './scheduler-dashboard/scheduler-dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { NgxPaginationModule } from 'ngx-pagination';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { LeaveManagementComponent } from './leave/leave-management/leave-management.component';
import { LeaveFormComponent } from './leave/leave-form/leave-form.component';
import { LeaveHistoryComponent } from './leave/leave-history/leave-history.component';
import { AppliedLeavesComponent } from './leave/applied-leaves/applied-leaves.component';
import { AttendanceDetailsComponent } from './attendance-details/attendance-details.component';
import { DailyShiftsComponent } from './daily-shifts/daily-shifts.component';
import { TimesheetDashboardComponent } from './timesheet-dashboard/timesheet-dashboard.component';

library.add(fas);
@NgModule({
  declarations: [


    SchedulerDashboardComponent,
        DeleteConfirmationComponent,
        LeaveManagementComponent,
        LeaveFormComponent,
        LeaveHistoryComponent,
        AppliedLeavesComponent,
        AttendanceDetailsComponent,
        DailyShiftsComponent,
        TimesheetDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TimeSheetRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class TimeSheetModule { }
