import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-grid',
  template: `
    {{ 'globals.grid.noMatchingDataText' | translate: { value: filter || '' } }}
  `,
})
export class EmptyGridComponent {
  @Input()
  set filter(value: string) {
    this._filter = value;
  }
  get filter(): string {
    return this._filter;
  }

  private _filter: string;
}
