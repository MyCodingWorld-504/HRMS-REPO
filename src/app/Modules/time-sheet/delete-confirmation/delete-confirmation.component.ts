import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Shift } from 'src/app/Core/models/MenuItem';
import { faExclamationCircle, faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent {
  faExclamation = faExclamationCircle;
faCross = faX;
  @Input() shift: Shift | null = null;
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
  cancelDelete() {
    this.cancel.emit();
  }
}

