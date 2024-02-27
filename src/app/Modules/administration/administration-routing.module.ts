import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './groups/groups.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { EmployeeProfilesComponent } from './employee-profiles/employee-profiles.component';
import { DepartmentsComponent } from './departments/departments.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { ResignationComponent } from './resignation/resignation.component';

const routes: Routes = [{ path:'',component:GroupsComponent},
{path:'bank-details',component :BankDetailsComponent},
{path:'emp-profiles',component :EmployeeProfilesComponent},
{path:'departments', component :DepartmentsComponent},
{path:'holidays',component:HolidaysComponent},
{path:'Resignation',component:ResignationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
