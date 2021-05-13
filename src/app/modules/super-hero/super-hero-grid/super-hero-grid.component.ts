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
import { PageConfig } from 'src/app/shared/models/page-config.model';
import { fromEvent, merge, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

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
  private unsubscribe$ = new Subject<void>();

  constructor(
    private superHeroService: SuperHeroService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.dataSource = new SuperHeroGridDataSource(
      this.superHeroService,
      this.translateService
    );
    this.dataSource.loadData(this.pageConfig);
  }

  ngAfterViewInit(): void {
    this.sort.sortChange
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => (this.paginator.pageIndex = 0));
    this.initFilterData();
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(() => this.onLoadData())
      )
      .subscribe();
  }

  get columnsDef(): ColumnDef {
    return this.dataSource.columnsDef();
  }

  onLoadData() {
    this.setPageConfig();
    this.dataSource.loadData(this.pageConfig);
  }

  onAddOrEditOrView(item?: SuperHero, view = false) {
    console.log(item, view);
  }

  onDelete(id: string) {
    console.log(id);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private initFilterData() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        takeUntil(this.unsubscribe$),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.onLoadData();
        })
      )
      .subscribe();
  }

  private setPageConfig() {
    this.pageConfig.page = this.paginator.pageIndex + 1;
    this.pageConfig.limit = this.paginator.pageSize;
    this.pageConfig.sort =
      this.sort.direction.length !== 0 ? this.sort.active : '';
    this.pageConfig.order = this.sort.direction || this.sort.start;
    this.pageConfig.filter = this.input.nativeElement.value;
  }
}
