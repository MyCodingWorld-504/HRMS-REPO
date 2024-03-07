import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayslipComponent } from './payslip/payslip/payslip.component';
import { PayrollDashboardComponent } from './payroll-dashboard/payroll-dashboard.component';
import { GeneratePayslipComponent } from './generate-payslip/generate-payslip.component';

const routes: Routes = [
  {path:'payrollDashboard',component:PayrollDashboardComponent},
  {path:'payslipForm',component:GeneratePayslipComponent},
  {path:'',component:PayslipComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollRoutingModule { }
