import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.scss']
})
export class LeaveManagementComponent {

  constructor(private router : Router){}

  onClickLeaveForm() {
    this.router.navigate(['dashboard', 'timesheet','leave-form']);
  }

  onClickLeaveHistory() {
    this.router.navigate(['dashboard', 'timesheet','leave-history']);
  }
  onClickAppliedLeaveHistory() {
    this.router.navigate(['dashboard', 'timesheet','applied-leave']);
  }

  OnRouteDashboard(){
    this.router.navigate(['dashboard', 'timesheet', 'timesheetDashboard']);
  }
}
