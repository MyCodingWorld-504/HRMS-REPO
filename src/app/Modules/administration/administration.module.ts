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
import { HolidaysComponent } from './holidays/holidays.component';
import { ResignationComponent } from './resignation/resignation.component';


library.add(fas);

@NgModule({
  declarations: [
    GroupsComponent,
    BankDetailsComponent,
    DepartmentsComponent,
    EmployeeProfilesComponent,
    HolidaysComponent,
    ResignationComponent
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
  providers:[GroupService,BankDetailService]
})
export class AdministrationModule { }
