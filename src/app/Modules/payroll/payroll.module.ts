import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayrollRoutingModule } from './payroll-routing.module';
import { PayslipComponent } from './payslip/payslip/payslip.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PayrollDashboardComponent } from './payroll-dashboard/payroll-dashboard.component';
import { GeneratePayslipComponent } from './generate-payslip/generate-payslip.component';
import { TaxDeclarationComponent } from './tax-declaration/tax-declaration.component';


@NgModule({
  declarations: [
    PayslipComponent,
    PayrollDashboardComponent,
    GeneratePayslipComponent,
    TaxDeclarationComponent,
   
  ],
  imports: [
    CommonModule,
    PayrollRoutingModule,
    FormsModule,
    ReactiveFormsModule,


  ]
})
export class PayrollModule { }
