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
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { BankDetailService } from './service/bank-detail.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { DepartmentsComponent } from './departments/departments.component';
import { EmployeeProfilesComponent } from './employee-profiles/employee-profiles.component';
import { FormsModule } from '@angular/forms';
import { AdministrationLayoutComponent } from './administration-layout/administration-layout.component';
import { EditBankDetailsComponent } from './edit-bank-details/edit-bank-details.component';
import { AddBankDetailsComponent } from './add-bank-details/add-bank-details.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { ResignationComponent } from './resignation/resignation.component';
import { EmployeeRolesComponent } from './employee-roles/employee-roles.component';
import { ExportToPdfService } from 'src/app/Core/services/export-to-pdf.service';



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
    EmployeeRolesComponent
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
