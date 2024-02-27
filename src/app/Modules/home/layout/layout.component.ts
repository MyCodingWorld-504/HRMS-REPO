import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/Core/services/shared.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements  OnInit ,OnDestroy{
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
