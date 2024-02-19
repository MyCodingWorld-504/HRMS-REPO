import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrNavbarComponent } from './hr-navbar/hr-navbar.component';
import { HrSidebarComponent } from './hr-sidebar/hr-sidebar.component';
import { HrDashboardComponent } from './hr-dashboard/hr-dashboard.component';
import { HrLayoutComponent } from './hr-layout/hr-layout.component';
import { HrUserListComponent } from './hr-user-list/hr-user-list.component';
import { authGuard } from 'src/app/Core/guard/auth.guard';


const routes: Routes = [

  {
    path: '',
    component: HrLayoutComponent,canActivate:[authGuard],
    children: [
      {
        path:'administration',
        loadChildren: () => import('../administration/administration.module').then((m)=>m.AdministrationModule)
      },
      {
        path: 'hr-sidebar',
        component: HrSidebarComponent,

      },
      {
        path: 'hr-dashboard',
        component: HrDashboardComponent,
      },
      {
        path:'hr-user-list',
        component:HrUserListComponent,
      },
      {
        path: 'hr-navbar',
        component: HrLayoutComponent,
      },
      {
        path: '',
        redirectTo: 'hr-dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
