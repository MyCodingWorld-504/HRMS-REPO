import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'src/app/Core/models/MenuItem';

import {
  faClipboardUser,
  faClock,
  faGauge,
  faMoneyBill,
  faUpRightFromSquare,
  faCaretDown,
  faCaretUp,
  faUserTie,
  faSearch

} from '@fortawesome/free-solid-svg-icons';
import { BankDetailService } from '../../administration/service/bank-detail.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSearchengin } from '@fortawesome/free-brands-svg-icons';




@Component({
  selector: 'app-hr-sidebar',
  templateUrl: './hr-sidebar.component.html',
  styleUrls: ['./hr-sidebar.component.scss'],
})
export class HrSidebarComponent implements OnInit  {
  faCaretUp = faCaretUp;
  faCaretDown = faCaretDown;
  @Input() isCollapsed = false;

  @Input() isExpanded: boolean = true;
  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(private router: Router, private menuservice : BankDetailService,
    library: FaIconLibrary) {
      library.addIcons(faGauge);
      library.addIcons(faClipboardUser);
      library.addIcons(faUserTie);
      library.addIcons(faMoneyBill);
      library.addIcons(faUpRightFromSquare);
      library.addIcons(faClock);
      library.addIcons(faSearch );
    }
menuItems: MenuItem[] = [
    { label: 'Dashboard', route: 'dashboard', icon: faGauge },
    {
      label: 'Administration',
      icon: faUserTie,
      submenu: [
        { label: 'Employee Profiles', route: 'administration/emp-profiles' },
        { label: 'Groups', route: 'administration/groups' },
        { label: 'Departments ', route: 'administration/departments' },
        { label: 'Bank Details', route: 'administration/bank-details' },
        { label: 'Resignation', route: 'administration/resignation' },
        { label: 'Holidays', route: 'administration/holydays' },
        { label: 'EmployeeRoles & Permissions', route: 'administration/employee-roles', },
      ],
    },
    {
      label: 'Attendence',
      icon: faClipboardUser,
      submenu: [
        { label: 'Contact', route: 'administration/view' },
        { label: 'Service', route: 'administration/edit' },
      ],
    },
    {
      label: 'Payrol',
      icon: faMoneyBill,
      submenu: [
        { label: 'Payroll', route: 'payroll' },
        { label: 'Payslip', route: 'payroll' },
      ],
    },
    {
      label: 'Timesheet',
      icon: faClock,
      submenu: [
        { label: 'Contact', route: '/contact' },
        { label: 'Service', route: '/service' },
      ],
    },
    {
      label: 'Recruitment',
      icon: faSearchengin,
      submenu: [
        { label: 'Contact', route: '/contact' },
        { label: 'Service', route: '/service' },
      ],
    },
    {
      label: 'Leave',
      icon: faUpRightFromSquare,
      submenu: [
        { label: 'Contact', route: '/contact' },
        { label: 'Service', route: '/service' },
      ],
    },
  ];

  ngOnInit(): void {
  // this.fetchMenuData();
  }
  // fetchMenuData():void{
  //   this.menuservice.getAdmin().subscribe(data => {
  //     this.menuItems = data;
  //   })
  //  }
  toggleSubMenu(item: MenuItem): void {
    if (item.submenu) {
      item.expanded = !item.expanded;
      item.collapsed = !item.expanded;
    }
  }
  handleMenuItemClick(item: MenuItem): void {
    if (item.label === 'Dashboard') {
      this.router.navigate([item.route]);
    } else if( item.label === 'Administration') {
      this.router.navigate(['dashboard', 'administration', 'admin-dashboard']);
      this.toggleSubMenu(item);
    }
    else if(item.label === 'Payrol'){
      this.router.navigate(['dashboard','payroll', 'payrollDashboard']);
      this.toggleSubMenu(item);
    }
    else {
      this.toggleSubMenu(item);
    }
  }

}
