import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { PayrollService } from 'src/app/Core/services/payroll.service';

@Component({
  selector: 'app-generate-payslip',
  templateUrl: './generate-payslip.component.html',
  styleUrls: ['./generate-payslip.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0)'
      })),
      state('out', style({
        transform: 'translateX(100%)'
      })),
      transition('in => out', animate('300ms ease-out')),
      transition('out => in', animate('300ms ease-in'))
    ])
  ]
})

export class GeneratePayslipComponent   {
  showPayslip: boolean = false;
  employeeDetails: any;
  employeeId : any;
constructor(private payrollService : PayrollService){}

  onClose(): void{
    this.showPayslip = false;
  }
  getEmployeeDetails(): void {
    this.showPayslip = true;
    this.payrollService.getEmployeeDetailsById(this.employeeId)
      .subscribe((data: any) => {
        this.employeeDetails = data;
      });
  }

}
