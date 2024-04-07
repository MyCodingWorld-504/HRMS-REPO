import { AfterViewInit, Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { faUserTie, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/Core/services/auth.service';
import { SharedService } from 'src/app/Core/services/shared.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  implements AfterViewInit{
  faUserTie = faUserTie;
  faArrowRight = faArrowRight;
  cursor: HTMLElement | null = null;
constructor(private sharedService : SharedService, private router : Router){}


onMouseEnter() {
  this.sharedService.setToTrue('overlayVisible');
}

// onMouseLeave() {
//   this.sharedService.hideOverlay();
// }
onHoverMouseEnter() {
  this.sharedService.setToTrue('onHover');
}
// onHoverMouseLeave() {
//   this.sharedService.onHoverHide();
// }

onIndustryMouseEnter() {
  this.sharedService.setToTrue('onHoverIndustries');
}
ngAfterViewInit() {
  this.cursor = document.getElementById('cursor');
}

@HostListener('document:mousemove', ['$event'])
@HostListener('document:mousemove', ['$event'])
onMouseMove(event: MouseEvent) {
  if (this.cursor) {
    this.cursor.style.left = (event.clientX - 25) + 'px';
    this.cursor.style.top = (event.clientY - 25) + 'px';
    (this.cursor as any).style.display = 'block';
  }
}

// onLoginClick(){
// this.router.navigate(['/login']);
// }
}


