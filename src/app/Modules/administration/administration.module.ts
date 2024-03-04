import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { AdministrationRoutingModule } from './administration-routing.module';
import { GroupsComponent } from './groups/groups.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupService } from 'src/app/Core/services/group.service';
import { BankDetailsComponent } from './bank/bank-details/bank-details.component';
import { BankDetailService } from './service/bank-detail.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { DepartmentsComponent } from './departments/departments.component';
import { EmployeeProfilesComponent } from './employee/employee-profiles/employee-profiles.component';
import { FormsModule } from '@angular/forms';
import { AdministrationLayoutComponent } from './administration-layout/administration-layout.component';
import { EditBankDetailsComponent } from './bank/edit-bank-details/edit-bank-details.component';
import { AddBankDetailsComponent } from './bank/add-bank-details/add-bank-details.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { ResignationComponent } from './employee-resignation/resignation/resignation.component';
import { EmployeeRolesComponent } from './employee/employee-roles/employee-roles.component';
import { ExportToPdfService } from 'src/app/Core/services/export-to-pdf.service';
import { EmployeePermissionsComponent } from './employee/employee-permissions/employee-permissions.component';
import { ConfirmDeletePopupComponent } from './confirm-delete-popup/confirm-delete-popup.component';
import { AddEmployeeProfileComponent } from './employee/add-employee-profile/add-employee-profile.component';
import { EditEmpProfilesComponent } from './employee/edit-emp-profiles/edit-emp-profiles.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EditResignationComponent } from './employee-resignation/edit-resignation/edit-resignation.component';
import { AddResignationComponent } from './employee-resignation/add-resignation/add-resignation.component';
import { ViewResignationComponent } from './employee-resignation/view-resignation/view-resignation.component';
import { ViewBankDetailsComponent } from './bank/view-bank-details/view-bank-details.component';
import { ViewEmpProfileComponent } from './employee/view-emp-profile/view-emp-profile.component';
import { EditEmployeeRoleComponent } from './employee/edit-employee-role/edit-employee-role.component';



library.add(fas);

@NgModule({
  declarations: [
    GroupsComponent,
    BankDetailsComponent,
    DepartmentsComponent,
    EmployeeProfilesComponent,
    AdministrationLayoutComponent,
    EditBankDetailsComponent,
    AddBankDetailsComponent,
    HolidaysComponent,
    ResignationComponent,
    EmployeeRolesComponent,
    EmployeePermissionsComponent,
    ConfirmDeletePopupComponent,
    AddEmployeeProfileComponent,
    EditEmpProfilesComponent,
    AdminDashboardComponent,
    EditResignationComponent,
    AddResignationComponent,
    ViewResignationComponent,
    ViewBankDetailsComponent,
    ViewEmpProfileComponent,
    EditEmployeeRoleComponent,

  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers:[GroupService,BankDetailService,ExportToPdfService]
})
export class AdministrationModule { }
