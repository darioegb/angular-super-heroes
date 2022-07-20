import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, fromEvent, merge, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
  takeUntil,
} from 'rxjs/operators';
import { SuperHero, SuperHeroService } from '@modules/super-hero/shared';
import { SuperHeroGridDataSource } from './super-hero-grid-datasource';
import { ColumnDef, PageConfig } from '@shared/models';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { genresEnum, imgSrc } from '@app/constants';

@Component({
  selector: 'app-super-hero-grid',
  templateUrl: './super-hero-grid.component.html',
  styleUrls: ['./super-hero-grid.component.scss'],
})
export class SuperHeroGridComponent
  implements AfterViewInit, OnInit, OnDestroy
{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  dataSource: SuperHeroGridDataSource;
  pageConfig: PageConfig = new PageConfig();
  toastDeleteSuccess: string;
  genres = genresEnum;
  noImageSrc = `${imgSrc}/no-image.png`;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private toastr: ToastrService,
    private dialogService: MatDialog,
    private superHeroService: SuperHeroService,
  ) {}

  ngOnInit(): void {
    this.dataSource = new SuperHeroGridDataSource(this.superHeroService);
    this.onLoadData(true);
    this.getTranslations();
  }

  ngAfterViewInit(): void {
    this.sort.sortChange
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => (this.paginator.pageIndex = 0));
    this.initFilterData();
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.onLoadData());
  }

  get columnsDef(): ColumnDef {
    return this.dataSource.columnsDef();
  }

  onLoadData(skipPageConfig = false): void {
    if (!skipPageConfig) {
      this.setPageConfig();
    }
    this.dataSource.loadData(this.pageConfig);
  }

  onAddOrEditOrView(item?: SuperHero, view = false): void {
    if (!item) {
      this.router.navigate(['detail'], {
        relativeTo: this.route,
      });
    } else {
      this.router.navigate([`detail/${item.id}`], {
        state: {
          data: {
            superHero: item,
          },
        },
        queryParams: view
          ? {
              view,
            }
          : null,
        relativeTo: this.route,
      });
    }
  }

  getTranslations(): void {
    this.translateService
      .get('globals.toasts.delete.success', {
        value: this.translateService.instant('superHeroes.detail.title'),
      })
      .pipe(take(1))
      .subscribe((result) => (this.toastDeleteSuccess = result));
  }

  onDelete(item: SuperHero): void {
    const dialogRef = this.dialogService.open(ConfirmDialogComponent, {
      data: {
        title: this.translateService.instant('globals.dialogs.delete.title', {
          value: item.name,
        }),
      },
    });
    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        switchMap((result: boolean) =>
          result ? this.superHeroService.delete(item.id) : EMPTY,
        ),
      )
      .subscribe(() => {
        this.onLoadData(true);
        this.toastr.success(this.toastDeleteSuccess);
      });
  }

  onReset(): void {
    this.input.nativeElement.value = '';
    this.onLoadData();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private initFilterData(): void {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        map(({ target: { value } }) => value),
        filter(({ length }) => length > 2 || length === 0),
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(() => {
        this.paginator.pageIndex = 0;
        this.onLoadData();
      });
  }

  private setPageConfig(): void {
    const { active, direction, start } = this.sort;
    const { pageIndex, pageSize } = this.paginator;
    this.pageConfig.page = pageIndex + 1;
    this.pageConfig.limit = pageSize;
    this.pageConfig.sort = direction.length !== 0 ? active : '';
    this.pageConfig.order = direction || start;
    this.pageConfig.filter = this.input.nativeElement.value;
  }
}
