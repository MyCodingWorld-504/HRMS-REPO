import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HrDashboardComponent } from './hr-dashboard/hr-dashboard.component';
import { HrLayoutComponent } from './hr-layout/hr-layout.component';
import { HrNavbarComponent } from './hr-navbar/hr-navbar.component';
import { HrSidebarComponent } from './hr-sidebar/hr-sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/Core/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HrUserListComponent } from './hr-user-list/hr-user-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdministrationModule } from '../administration/administration.module';

library.add(fas);

@NgModule({
  declarations: [
    HrDashboardComponent,
    HrLayoutComponent,
    HrNavbarComponent,
    HrSidebarComponent,
    HrUserListComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    NgxPaginationModule,

  ],
  providers:[AuthService]
})
export class DashboardModule { }
