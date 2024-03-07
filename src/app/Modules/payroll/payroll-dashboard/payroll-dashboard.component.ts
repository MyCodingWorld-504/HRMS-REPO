import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payroll-dashboard',
  templateUrl: './payroll-dashboard.component.html',
  styleUrls: ['./payroll-dashboard.component.scss']
})
export class PayrollDashboardComponent {

  constructor(private router : Router){}
  
onClickPayslip() {
  this.router.navigate(['dashboard', 'payroll']);
}

onClickPayForm() {
  this.router.navigate(['dashboard', 'payroll','payslipForm']);
}

}
