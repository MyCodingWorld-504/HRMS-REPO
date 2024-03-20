import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timesheet-dashboard',
  templateUrl: './timesheet-dashboard.component.html',
  styleUrls: ['./timesheet-dashboard.component.scss']
})
export class TimesheetDashboardComponent {

  constructor(private router : Router){}
  
  onClickSchedulerDash() {
    this.router.navigate(['dashboard', 'timesheet','Scheduler-Dashboard']);
  }
  
  onClickDailyShift() {
    this.router.navigate(['dashboard', 'timesheet','daily-shifts']);
  }
  
  onClickTimesheet(){
    this.router.navigate(['dashboard', 'timesheet','attendance-sheet']);
  }

  onClickLeave(){
    this.router.navigate(['dashboard', 'timesheet','leaveManagement']);
  }

}
