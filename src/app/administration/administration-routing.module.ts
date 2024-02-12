import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './groups/groups.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';

const routes: Routes = [{
  path:'',
  component:GroupsComponent
},
{
  path:'bank-details',
  component :BankDetailsComponent
}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
