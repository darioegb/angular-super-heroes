import { Component, Input } from '@angular/core';

import { imgSrc } from '@app/constants';
import { Column } from '@shared/models';

@Component({
  selector: 'app-grid-item',
  template: `
    <ng-container *ngIf="column.isImg; else default">
      <img
        class="picture"
        [src]="row[column.headerDef] || noImageSrc"
        alt="picture"
      />
    </ng-container>
    <ng-template #default>{{
      column.format
        ? column.format(row[column.headerDef])
        : row[column.headerDef] || '-'
    }}</ng-template>
  `,
  styles: [],
})
export class GridItemComponent<T> {
  noImageSrc = `${imgSrc}/no-image.png`;
  @Input() row: T;
  @Input() column: Column;
}
