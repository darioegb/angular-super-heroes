import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class MatPaginatorI18nService extends MatPaginatorIntl {
  constructor(private translate: TranslateService) {
    super();

    this.translate.onLangChange.subscribe(() => {
      this.getAndInitTranslations();
    });

    this.getAndInitTranslations();
  }

  getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return `0 / ${length}`;
    }

    // eslint-disable-next-line no-param-reassign
    length = Math.max(length, 0);

    const startIndex: number = page * pageSize;
    const endIndex: number =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} / ${length}`;
  };

  getAndInitTranslations(): void {
    this.translate.get('globals.paginator').subscribe((translation: any) => {
      this.itemsPerPageLabel = translation.itemsPerPageLabel;
      this.nextPageLabel = translation.nextPageLabel;
      this.previousPageLabel = translation.previousPageLabel;
      this.firstPageLabel = translation.firstPageLabel;
      this.lastPageLabel = translation.lastPageLabel;
      this.changes.next();
    });
  }
}
