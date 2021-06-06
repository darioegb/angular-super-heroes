import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SuperHero } from '../shared/super-hero.model';
import { SuperHeroGridDataSource } from './super-hero-grid-datasource';
import { ColumnDef } from '../../../shared/models/grid.model';
import { SuperHeroService } from '../shared/super-hero.service';
import { PageConfig } from '@app/shared/models/page-config.model';
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
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@app/shared/components/confirm-dialog/confirm-dialog.component';
import { ToastTranslation } from '@app/shared/models/toast.model';
import { genresEnum } from '@app/shared/constants/constants';

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
  toastTranslations: ToastTranslation;
  genres = genresEnum;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private toastr: ToastrService,
    private dialogService: MatDialog,
    private superHeroService: SuperHeroService
  ) {}

  ngOnInit(): void {
    this.dataSource = new SuperHeroGridDataSource(
      this.superHeroService,
      this.translateService
    );
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
      .get('superHeroes.toasts.delete')
      .pipe(take(1))
      .subscribe((translations) => (this.toastTranslations = translations));
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
          result ? this.superHeroService.delete(item.id) : EMPTY
        )
      )
      .subscribe(() => {
        this.onLoadData(true);
        this.toastr.success(this.toastTranslations.success);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private initFilterData(): void {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        filter((result) => result.length > 2 || result.length === 0),
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.paginator.pageIndex = 0;
        this.onLoadData();
      });
  }

  private setPageConfig(): void {
    this.pageConfig.page = this.paginator.pageIndex + 1;
    this.pageConfig.limit = this.paginator.pageSize;
    this.pageConfig.sort =
      this.sort.direction.length !== 0 ? this.sort.active : '';
    this.pageConfig.order = this.sort.direction || this.sort.start;
    this.pageConfig.filter = this.input.nativeElement.value;
  }
}
