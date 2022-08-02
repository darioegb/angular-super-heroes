import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-button',
  template: `
    <button
      mat-icon-button
      aria-label="Icon button with a add icon"
      (click)="onAdd()"
    >
      <mat-icon color="primary" aria-hidden="false">add</mat-icon>
    </button>
  `,
  styles: [],
})
export class AddButtonComponent {
  @Output() addClick = new EventEmitter<void>();

  onAdd(): void {
    this.addClick.emit();
  }
}
