import { Component } from '@angular/core';

@Component({
  selector: 'app-hr-layout',
  templateUrl: './hr-layout.component.html',
  styleUrls: ['./hr-layout.component.scss']
})
export class HrLayoutComponent {
  isSidebarExpanded = true;

  toggleSidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }
}
