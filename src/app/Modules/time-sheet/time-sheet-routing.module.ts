import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulerDashboardComponent } from './scheduler-dashboard/scheduler-dashboard.component';
import { LeaveManagementComponent } from './leave/leave-management/leave-management.component';
import { LeaveFormComponent } from './leave/leave-form/leave-form.component';
import { LeaveHistoryComponent } from './leave/leave-history/leave-history.component';
import { AppliedLeavesComponent } from './leave/applied-leaves/applied-leaves.component';
import { AttendanceDetailsComponent } from './attendance-details/attendance-details.component';
import { DailyShiftsComponent } from './daily-shifts/daily-shifts.component';
import { TimesheetDashboardComponent } from './timesheet-dashboard/timesheet-dashboard.component';


const routes: Routes = [
  {path:'Scheduler-Dashboard',component:SchedulerDashboardComponent},
  {path:'leaveManagement', component:LeaveManagementComponent},
  {path:'leave-form',component:LeaveFormComponent},
  {path:'leave-history',component:LeaveHistoryComponent},
  {path:'applied-leave', component:AppliedLeavesComponent},
  {path:'attendance-sheet',component:AttendanceDetailsComponent},
  {path:'daily-shifts' , component:DailyShiftsComponent},
  {path:'timesheetDashboard',component:TimesheetDashboardComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeSheetRoutingModule { }
