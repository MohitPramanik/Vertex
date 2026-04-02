import { Component, computed, HostBinding, input, model } from '@angular/core';

@Component({
  selector: 'div[app-modal]',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss'
})
export class Modal {
  isShown = model<boolean>(false);
  modalTitle = input<string>();
  closeBtn = input<boolean>(true);
  isConfirmationModal = input<boolean>(false);

  close() {
    this.isShown.set(false);
  }
}
