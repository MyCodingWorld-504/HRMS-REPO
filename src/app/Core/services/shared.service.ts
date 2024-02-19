import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {

  overlayVisible: Subject<boolean> = new Subject<boolean>();

  onHover: Subject<boolean> = new Subject<boolean>();

  onHoverIndustries : Subject<boolean> = new Subject<boolean>();

//   showIndustry(){
//     this.onHoverIndustries.next(true);
//   }
//   hideIndustry(){
//     this.onHoverIndustries.next(false);
//   }
// showOverlay() {
//   this.overlayVisible.next(true);
//   this.onHover.next(false);
// }

// hideOverlay() {
//   this.overlayVisible.next(false);
// }

// onHoverShow() {
//   this.onHover.next(true);
//   this.overlayVisible.next(false);
// }

// onHoverHide() {
//   this.onHover.next(false);
// }


setToTrue(variableName: string) {
  switch (variableName) {
    case 'overlayVisible':
      this.overlayVisible.next(true);
      this.onHover.next(false);
      this.onHoverIndustries.next(false);
      break;
    case 'onHover':
      this.overlayVisible.next(false);
      this.onHover.next(true);
      this.onHoverIndustries.next(false);
      break;
    case 'onHoverIndustries':
      this.overlayVisible.next(false);
      this.onHover.next(false);
      this.onHoverIndustries.next(true);
      break;
    default:
      // Handle invalid variableName
      console.error('Invalid variableName');
  }
}

// Method to set a variable to false
setToFalse(variableName: string) {
  switch (variableName) {
    case 'overlayVisible':
      this.overlayVisible.next(false);
      break;
    case 'onHover':
      this.onHover.next(false);
      break;
    case 'onHoverIndustries':
      this.onHoverIndustries.next(false);
      break;
    default:
      // Handle invalid variableName
      console.error('Invalid variableName');
  }
}
}
