import { Component, Input, OnInit } from '@angular/core';

import { IMG_SRC } from '@shared/globals';
import { Column } from '@shared/models';

@Component({
  selector: 'app-grid-item',
  template: `
    <ng-container *ngIf="column.isImg; else default">
      <img
        class="picture"
        [src]="row[column.headerDef] ?? noImageSrc"
        alt="picture"
      />
    </ng-container>
    <ng-template #default>{{
      column.format
        ? column.format(row[column.headerDef])
        : row[column.headerDef] ?? '-'
    }}</ng-template>
  `,
})
export class GridItemComponent<T> implements OnInit {
  noImageSrc: string;
  @Input() row: T;
  @Input() column: Column;

  ngOnInit(): void {
    this.noImageSrc = `${IMG_SRC}/no-image.png`;
  }
}
