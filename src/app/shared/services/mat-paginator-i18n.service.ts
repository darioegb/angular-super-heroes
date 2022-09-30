import { Injectable, OnDestroy } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class MatPaginatorI18nService
  extends MatPaginatorIntl
  implements OnDestroy
{
  private unsubscribe$ = new Subject<void>();

  constructor(private translateService: TranslateService) {
    super();

    this.translateService.onLangChange
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.getAndInitTranslations());

    this.getAndInitTranslations();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if ([pageSize, length].includes(0)) {
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
    this.translateService
      .get('globals.paginator')
      .subscribe(
        ({
          itemsPerPageLabel,
          nextPageLabel,
          previousPageLabel,
          firstPageLabel,
          lastPageLabel,
        }) => {
          this.itemsPerPageLabel = itemsPerPageLabel;
          this.nextPageLabel = nextPageLabel;
          this.previousPageLabel = previousPageLabel;
          this.firstPageLabel = firstPageLabel;
          this.lastPageLabel = lastPageLabel;
          this.changes.next();
        },
      );
  }
}
