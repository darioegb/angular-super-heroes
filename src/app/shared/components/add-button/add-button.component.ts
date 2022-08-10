import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-button',
  template: `
    <button
      mat-icon-button
      aria-label="Icon button with a add icon"
      (click)="addClick.emit()"
    >
      <mat-icon color="primary" aria-hidden="false">add</mat-icon>
    </button>
  `,
})
export class AddButtonComponent {
  @Output() addClick = new EventEmitter<void>();
}
