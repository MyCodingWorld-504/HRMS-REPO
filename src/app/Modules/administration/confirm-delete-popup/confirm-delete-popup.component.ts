import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faExclamationCircle, faX } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-confirm-delete-popup',
  templateUrl: './confirm-delete-popup.component.html',
  styleUrls: ['./confirm-delete-popup.component.scss']
})
export class ConfirmDeletePopupComponent {
faExclamation = faExclamationCircle;
faCross = faX;
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  confirmDelete() {
    this.confirmed.emit();
  }

  cancelDelete() {
    this.cancelled.emit();
  }
}
