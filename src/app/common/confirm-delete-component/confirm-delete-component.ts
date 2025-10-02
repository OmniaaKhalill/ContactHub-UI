import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
declare var bootstrap: any;
@Component({
  selector: 'app-confirm-delete-component',
  imports: [],
  templateUrl: './confirm-delete-component.html',
  styleUrl: './confirm-delete-component.css'
})
export class ConfirmDeleteComponent {

@Input() itemName: string = 'this item';
  @Output() confirm = new EventEmitter<void>();

  @ViewChild('deleteModal') modalElement!: ElementRef;
  private modal: any;

  open() {
    this.modal = new bootstrap.Modal(this.modalElement.nativeElement);
    this.modal.show();
  }

  close() {
    if (this.modal) {
      this.modal.hide();
    }
  }

  onConfirm() {
    this.confirm.emit();
    this.close();
  }
}