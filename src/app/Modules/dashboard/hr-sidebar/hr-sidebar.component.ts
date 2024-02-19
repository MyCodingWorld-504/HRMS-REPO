import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'src/app/Core/models/MenuItem';

import {faClipboardUser, faClock, faGauge, faMoneyBill, faUpRightFromSquare, faCaretDown,faCaretUp,faUserTie} from '@fortawesome/free-solid-svg-icons';
import { faSearchengin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-hr-sidebar',
  templateUrl: './hr-sidebar.component.html',
  styleUrls: ['./hr-sidebar.component.scss']
})
export class HrSidebarComponent {
  faCaretUp = faCaretUp;
  faCaretDown = faCaretDown;
    @Input() isCollapsed = false;

    @Input() isExpanded: boolean = true;
    @Output() toggleSidebar = new EventEmitter<void>();
    constructor(private router : Router){}
    menuItems: MenuItem[] = [
      { label: 'Dashboard', route:'dashboard',icon: faGauge },
      { label: 'Administration', icon: faUserTie, submenu: [{ label: 'Groups', route: 'administration' }, { label: 'Bank Details', route: 'administration/bank-details' }, { label: 'Designation', route: '/shared/layout' }, { label: 'Employee Profiles', route: '/shared/layout' }, { label: 'Resignation', route: '/shared/layout' }] },
      { label: 'Attendence', icon: faClipboardUser, submenu: [{ label: 'Contact', route: '/login' }, { label: 'Service', route: '/service' }] },
      { label: 'Payrol', icon: faMoneyBill, submenu: [{ label: 'Contact', route: '/contact' }, { label: 'Service', route: '/service' }] },
      { label: 'Timesheet', icon:faClock, submenu: [{ label: 'Contact', route: '/contact' }, { label: 'Service', route: '/service' }] },
      { label: 'Recruitment', icon: faSearchengin, submenu: [{ label: 'Contact', route: '/contact' }, { label: 'Service', route: '/service' }] },
      { label: 'Leave', icon: faUpRightFromSquare, submenu: [{ label: 'Contact', route: '/contact' }, { label: 'Service', route: '/service' }] },

    ];

    toggleSubMenu(item: MenuItem): void {
      if (item.submenu) {
        item.expanded = !item.expanded;
        item.collapsed = !item.expanded;

      }
    }
    handleMenuItemClick(item: MenuItem): void {
      if (item.label === 'Dashboard') {
        this.router.navigate([item.route]);
      } else {
        this.toggleSubMenu(item);
      }
    }
}
