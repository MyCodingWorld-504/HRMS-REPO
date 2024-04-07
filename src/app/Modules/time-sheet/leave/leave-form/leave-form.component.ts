import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.scss']
})
export class LeaveFormComponent {

  constructor(private router : Router){

  }

  leaveRequest: any = {}; 
  submitForm() {
    console.log(this.leaveRequest); 
  }

  OnRouteDashboard(){
    this.router.navigate(['dashboard', 'timesheet', 'timesheetDashboard']);
  }

  onRouteLeaveDashboard(){
    this.router.navigate(['dashboard', 'timesheet', 'leaveManagement']);
  }


}
