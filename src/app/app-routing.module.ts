import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./Modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path:'dashboard',
    loadChildren: () => import('./Modules/dashboard/dashboard.module').then((m)=>m.DashboardModule),

  },
  


  // {
  //   path:'administration',
  //   loadChildren: () => import('./Modules/administration/administration.module').then((m)=>m.AdministrationModule),

  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
