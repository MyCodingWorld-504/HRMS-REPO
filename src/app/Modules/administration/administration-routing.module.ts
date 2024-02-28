import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './groups/groups.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { EmployeeProfilesComponent } from './employee-profiles/employee-profiles.component';
import { DepartmentsComponent } from './departments/departments.component';
import { AdministrationLayoutComponent } from './administration-layout/administration-layout.component';
import { EditBankDetailsComponent } from './edit-bank-details/edit-bank-details.component';
import { AddBankDetailsComponent } from './add-bank-details/add-bank-details.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { ResignationComponent } from './resignation/resignation.component';

const routes: Routes = [
  {
    path: '',
    component: AdministrationLayoutComponent,
    children: [
      { path: 'bank-details', component: BankDetailsComponent },
      { path: 'emp-profiles', component: EmployeeProfilesComponent },
      { path: 'departments', component: DepartmentsComponent },
      { path: 'groups', component: GroupsComponent },
      { path: 'edit-bank-details/:id', component: EditBankDetailsComponent },
      { path: 'add-bank-details', component: AddBankDetailsComponent },
      { path: 'holydays', component: HolidaysComponent },
      { path: 'resignation', component: ResignationComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {}
