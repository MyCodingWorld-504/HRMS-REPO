import { Component, DoCheck, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { faBars, faHandsPraying,faSquareCaretDown} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hr-navbar',
  templateUrl: './hr-navbar.component.html',
  styleUrls: ['./hr-navbar.component.scss']
})
export class HrNavbarComponent implements DoCheck {
  faBars = faBars;
  faHandsPraying = faHandsPraying;
  faSquareCaretDown = faSquareCaretDown;
  isadmin=false;
  isMenuVisible=false;
    isCollapsed!: boolean;

    constructor(private readonly router :Router, private readonly authService :AuthService){}
    @Output() toggleSidebar = new EventEmitter<void>();
    ngDoCheck(): void {
      let currentroute = this.router.url;
      let role=sessionStorage.getItem('role');
      if (this.authService.isLoggedIn()) {
        this.isMenuVisible = true
      } else {
        this.isMenuVisible = false
      }
    }
    onToggleSidebarClick() {
      this.toggleSidebar.emit();
    }
  }


