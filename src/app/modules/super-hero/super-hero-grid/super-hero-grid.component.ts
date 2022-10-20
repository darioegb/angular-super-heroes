import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
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
import { EMPTY, merge, Subject } from 'rxjs';
import { switchMap, take, takeUntil, withLatestFrom } from 'rxjs/operators';
import { SuperHero, SuperHeroService } from '@modules/super-hero/shared';
import { SuperHeroGridDataSource } from './super-hero-grid-datasource';
import { ColumnDef, FilterInput, PageConfig } from '@shared/models';
import { ConfirmDialogComponent } from '@shared/components';
import { DropdownTranslatePipe } from '@shared/pipes';

@Component({
  selector: 'app-super-hero-grid',
  templateUrl: './super-hero-grid.component.html',
  styleUrls: ['./super-hero-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperHeroGridComponent
  implements AfterViewInit, OnInit, OnDestroy
{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  toastDeleteSuccess: string;
  dataSource: SuperHeroGridDataSource;
  filterInput: FilterInput;
  filter = '';
  pageConfig: PageConfig = new PageConfig();
  private unsubscribe$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private toastr: ToastrService,
    private dialogService: MatDialog,
    private superHeroService: SuperHeroService,
    private dropdownTranslatePipe: DropdownTranslatePipe,
  ) {
    this.translateService.onLangChange
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.getTranslations());
  }

  ngOnInit(): void {
    this.dataSource = new SuperHeroGridDataSource(
      this.superHeroService,
      this.dropdownTranslatePipe,
    );
    this.onLoadData(true);
    this.getTranslations();
  }

  ngAfterViewInit(): void {
    this.sort.sortChange
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.onLoadData());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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

  onAddOrEditOrView(event: { item: SuperHero; view?: boolean }): void {
    if (!event) {
      this.router.navigate(['detail'], {
        relativeTo: this.route,
      });
    } else {
      const { item, view } = event;
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
        value: this.translateService.instant('superheroes.detail.title'),
      })
      .pipe(
        withLatestFrom(
          this.translateService.get('superheroes.grid.filterInput'),
        ),
      )
      .subscribe(([deleteSucess, { label, placeholder }]) => {
        this.toastDeleteSuccess = deleteSucess;
        this.filterInput = {
          label,
          placeholder,
        };
      });
  }

  onDelete({ name, id }: SuperHero): void {
    const dialogRef = this.dialogService.open(ConfirmDialogComponent, {
      data: {
        title: this.translateService.instant('globals.dialogs.delete.title', {
          value: name,
        }),
      },
    });
    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        switchMap((result: boolean) =>
          result ? this.superHeroService.delete(id) : EMPTY,
        ),
      )
      .subscribe(() => {
        this.onLoadData(true);
        this.toastr.success(this.toastDeleteSuccess);
      });
  }

  onFilterChange(value: string): void {
    this.filter = value;
    value.length !== 0 ? this.initFilterData() : this.onReset();
  }

  onReset(): void {
    this.onLoadData();
  }

  private initFilterData(): void {
    this.paginator.pageIndex = 0;
    this.onLoadData();
  }

  private setPageConfig(): void {
    const { active, direction, start } = this.sort;
    const { pageIndex, pageSize } = this.paginator;
    this.pageConfig.page = pageIndex + 1;
    this.pageConfig.limit = pageSize;
    this.pageConfig.sort = direction.length !== 0 ? active : '';
    this.pageConfig.order = direction || start;
    this.pageConfig.filter = this.filter;
  }
}
