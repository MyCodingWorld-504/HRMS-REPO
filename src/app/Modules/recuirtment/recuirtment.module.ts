import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { RecuirtmentDashboardComponent } from './recuirtment-dashboard/recuirtment-dashboard.component';
import { OurClientsComponent } from './our-clients/our-clients.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { RecuirtmentRoutingModule } from './recuirtment-routing.module';
import { ProfileDatabaseComponent } from './profile-database/profile-database.component';
import { JobTitleSchedulerStatusComponent } from './job-title-scheduler-status/job-title-scheduler-status.component';
import { OpenPositionsComponent } from './open-positions/open-positions.component';
import { SchedulerStatusComponent } from './scheduler-status/scheduler-status.component';


@NgModule({
  declarations: [
    RecuirtmentDashboardComponent,
    OurClientsComponent,
    ProfileDatabaseComponent,
    JobTitleSchedulerStatusComponent,
    OpenPositionsComponent,
    SchedulerStatusComponent
  ],
  imports: [
    CommonModule,
    RecuirtmentRoutingModule,    
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class RecuirtmentModule { }
