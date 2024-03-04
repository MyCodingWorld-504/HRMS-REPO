import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  constructor(private router : Router){}
onClickRoles() {
  this.router.navigate(['dashboard', 'administration', 'employee-roles']);
}
onClickHolidays() {
  this.router.navigate(['dashboard', 'administration', 'holydays']);
}
onClickResignation() {
  this.router.navigate(['dashboard', 'administration', 'resignation']);
}
onClickBank() {
  this.router.navigate(['dashboard', 'administration', 'bank-details']);
}
onClickDepartment() {
  this.router.navigate(['dashboard', 'administration', 'departments']);
}
onClickGroup() {
  this.router.navigate(['dashboard', 'administration', 'groups']);
}

onClickEmp() {
this.router.navigate(['dashboard', 'administration', 'emp-profiles']);
}

}
