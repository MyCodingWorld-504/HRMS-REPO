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
  menuItems: any[] = [];
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


  ngOnInit(): void {
  this.fetchMenuData();
  }
  fetchMenuData():void{
    this.menuservice.getAdmin().subscribe(data => {
      this.menuItems = data;
    })
   }
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
    else {
      this.toggleSubMenu(item);
    }
  }

}
