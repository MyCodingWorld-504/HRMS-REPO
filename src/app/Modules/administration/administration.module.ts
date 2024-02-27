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
<<<<<<< HEAD
import { DepartmentsComponent } from './departments/departments.component';
import { EmployeeProfilesComponent } from './employee-profiles/employee-profiles.component';
import { FormsModule } from '@angular/forms';
=======
>>>>>>> f46a5594cddea03cfaf4f734e9839dd0152f60f4


library.add(fas);

@NgModule({
  declarations: [
    GroupsComponent,
    BankDetailsComponent,
    DepartmentsComponent,
    EmployeeProfilesComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
<<<<<<< HEAD
    FormsModule,
=======
>>>>>>> f46a5594cddea03cfaf4f734e9839dd0152f60f4
    NgxPaginationModule
  ],
  providers:[GroupService,BankDetailService]
})
export class AdministrationModule { }
