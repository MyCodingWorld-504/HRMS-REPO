import { Component, DoCheck, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/services/auth.service';
import { faBars, faHandsPraying,faUserCircle} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-hr-navbar',
  templateUrl: './hr-navbar.component.html',
  styleUrls: ['./hr-navbar.component.scss']
})
export class HrNavbarComponent implements DoCheck {
  faBars = faBars;
  faHandsPraying = faHandsPraying;
  faUserIcon = faUserCircle;
  isadmin=false;
  isMenuVisible=false;
    isCollapsed!: boolean;

    constructor(private readonly router :Router, private readonly authService :AuthService,
      private toastr :ToastrService,
      private toast : NgToastService){}
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
    onLogout() : void{
      this.authService.logout();
       this.toast.info({detail:"Logout",summary:'logged out successfully', position: 'topRight', duration: 3000});

    }
  }


