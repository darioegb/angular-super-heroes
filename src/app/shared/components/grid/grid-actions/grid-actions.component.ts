import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-grid-actions',
  templateUrl: './grid-actions.component.html',
  styleUrls: ['./grid-actions.component.scss'],
})
export class GridActionsComponent<T> {
  @Input() item: T;
  @Output() editOrView = new EventEmitter<{ item: T; view?: boolean }>();
  @Output() delete = new EventEmitter<T>();

  handleEditOrView(view?: boolean): void {
    this.editOrView.emit(
      view ? { item: this.item, view } : { item: this.item },
    );
  }

  handleDelete(): void {
    this.delete.emit(this.item);
  }
}
