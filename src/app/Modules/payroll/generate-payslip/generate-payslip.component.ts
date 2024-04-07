import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { PayrollService } from 'src/app/Core/services/payroll.service';
import { ExportToPdfService } from 'src/app/Core/services/export-to-pdf.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
  
  @ViewChild('payslipForm', { static: false })
  payslipForm!: ElementRef;

constructor(private payrollService : PayrollService,
 private exportPDF:ExportToPdfService,
 private toastr: ToastrService,
 private router : Router){

  }

  // onClose(): void{
  //   this.showPayslip = false;
  // }
  getEmployeeDetails(): void {
    // this.showPayslip = true; 
    this.showPayslip = !this.showPayslip;
    this.payrollService.getEmployeeDetailsById(this.employeeId)
      .subscribe((data: any) => {
        this.employeeDetails = data;
      });
  }

  exportToPDF(): void {
    const elementToPrint = this.payslipForm.nativeElement;
    this.exportPDF.exportFormToPDF(elementToPrint, 'payslip.pdf');
  }

  OnRouteDashboard(){
    this.router.navigate(['dashboard', 'payroll', 'payrollDashboard']);
  }

}
