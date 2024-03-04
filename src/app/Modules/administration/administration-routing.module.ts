import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './groups/groups.component';
import { BankDetailsComponent } from './bank/bank-details/bank-details.component';
import { EmployeeProfilesComponent } from './employee/employee-profiles/employee-profiles.component';
import { DepartmentsComponent } from './departments/departments.component';
import { AdministrationLayoutComponent } from './administration-layout/administration-layout.component';
import { EditBankDetailsComponent } from './bank/edit-bank-details/edit-bank-details.component';
import { AddBankDetailsComponent } from './bank/add-bank-details/add-bank-details.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { ResignationComponent } from './employee-resignation/resignation/resignation.component';
import { EmployeeRolesComponent } from './employee/employee-roles/employee-roles.component';
import { ConfirmDeletePopupComponent } from './confirm-delete-popup/confirm-delete-popup.component';
import { EmployeePermissionsComponent } from './employee/employee-permissions/employee-permissions.component';
import { AddEmployeeProfileComponent } from './employee/add-employee-profile/add-employee-profile.component';
import { EditEmpProfilesComponent } from './employee/edit-emp-profiles/edit-emp-profiles.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EditResignationComponent } from './employee-resignation/edit-resignation/edit-resignation.component';
import { AddResignationComponent } from './employee-resignation/add-resignation/add-resignation.component';
import { ViewResignationComponent } from './employee-resignation/view-resignation/view-resignation.component';
import { ViewBankDetailsComponent } from './bank/view-bank-details/view-bank-details.component';
import { ViewEmpProfileComponent } from './employee/view-emp-profile/view-emp-profile.component';
import { EditEmployeeRoleComponent } from './employee/edit-employee-role/edit-employee-role.component';



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
      { path: 'add-emp-details', component: AddEmployeeProfileComponent },
      { path: 'add-resignation', component: AddResignationComponent},
      { path: 'holydays', component: HolidaysComponent },
      { path: 'resignation', component: ResignationComponent },
      { path: 'employee-roles', component: EmployeeRolesComponent },
      { path: 'employee-permissions', component: EmployeePermissionsComponent },
      { path: 'delete-popup', component: ConfirmDeletePopupComponent },
      { path: 'edit-emp-profile/:id', component:EditEmpProfilesComponent },
      { path: 'admin-dashboard', component: AdminDashboardComponent },
      { path: 'edit-resignation/:id', component:EditResignationComponent },
      { path: 'view-resignation/:id', component:ViewResignationComponent},
      { path: 'view-bank-details/:id', component:ViewBankDetailsComponent},
      { path: 'view-emp-profile/:id', component:ViewEmpProfileComponent},
      { path: 'edit-emp-role/:id', component: EditEmployeeRoleComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {}
