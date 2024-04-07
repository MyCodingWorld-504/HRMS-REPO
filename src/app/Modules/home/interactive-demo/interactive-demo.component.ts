import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/Core/services/shared.service';

@Component({
  selector: 'app-interactive-demo',
  templateUrl: './interactive-demo.component.html',
  styleUrls: ['./interactive-demo.component.scss']
})
export class InteractiveDemoComponent {
  isHovered = false;
  private hoverSubscription!: Subscription;
  overlayVisible: boolean = false;
  constructor(private sharedService: SharedService) {}


  ngOnInit() {
    this.sharedService.overlayVisible.subscribe((visible: boolean) => {
      this.overlayVisible = visible;
    });
  }

  onMouseLeave() {
    this.sharedService.setToFalse('overlayVisible');
  }
  // onMouseEnter() {
  //   this.sharedService.showOverlay();
  // }
  ngOnDestroy() {
    if (this.hoverSubscription) {
      this.hoverSubscription.unsubscribe();
    }
  }
}
