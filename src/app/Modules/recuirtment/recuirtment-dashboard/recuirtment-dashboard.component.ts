import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuirtment-dashboard',
  templateUrl: './recuirtment-dashboard.component.html',
  styleUrls: ['./recuirtment-dashboard.component.scss']
})
export class RecuirtmentDashboardComponent {

  constructor(private router: Router){

  }

onClickClients() {
  this.router.navigate(['dashboard', 'recuirtment', 'clients']);
}
onClickProfileDatabase() {
  this.router.navigate(['dashboard', 'recuirtment', 'profile-database']);
}
onClickOpenPositions() {
  this.router.navigate(['dashboard', 'recuirtment', 'open-position']);
}
onClickOpenScheduler() {
  this.router.navigate(['dashboard', 'recuirtment', 'scheduler-status']);
}
onClickOpenJobtitles(){
  this.router.navigate(['dashboard', 'recuirtment', 'job-titles-scheduler-status']);
}


}
