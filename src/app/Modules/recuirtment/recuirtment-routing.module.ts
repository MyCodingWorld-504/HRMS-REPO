import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecuirtmentDashboardComponent } from './recuirtment-dashboard/recuirtment-dashboard.component';
import { OurClientsComponent } from './our-clients/our-clients.component';
import { JobTitleSchedulerStatusComponent } from './job-title-scheduler-status/job-title-scheduler-status.component';
import { ProfileDatabaseComponent } from './profile-database/profile-database.component';
import { OpenPositionsComponent } from './open-positions/open-positions.component';
import { SchedulerStatusComponent } from './scheduler-status/scheduler-status.component';

const routes: Routes = [
  {path:'recuirtment-dashboard',component:RecuirtmentDashboardComponent},
  {path:'clients',component:OurClientsComponent},
  {path:'job-titles-scheduler-status',component:JobTitleSchedulerStatusComponent},
  {path:'profile-database',component:ProfileDatabaseComponent},
  {path:'open-position',component:OpenPositionsComponent},
  {path:'scheduler-status',component:SchedulerStatusComponent}
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecuirtmentRoutingModule { }
