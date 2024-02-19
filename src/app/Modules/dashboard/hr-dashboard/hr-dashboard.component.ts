import { Component } from '@angular/core';

@Component({
  selector: 'app-hr-dashboard',
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.scss']
})
export class HrDashboardComponent {
  Data = [
    {
      name: 'John Dorx',
      years: 2,
      photoPath: '/assets/face.jpg'
    },
    {
      name: 'Abigail Doe',
      years: 5,
      photoPath: '/assets/face.jpg'
    },
    {
      name: 'Bernadette Axe',
      years: 7,
      photoPath: '/assets/face.jpg'
    },
    {
      name: 'Emma Faith',
      years: 3,
      photoPath: '/assets/face.jpg'
    },

  ];
}
