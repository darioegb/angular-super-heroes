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
  filter,
  map,
  takeUntil,
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
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.onLoadData());
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

  private setPageConfig() {
    this.pageConfig.page = this.paginator.pageIndex + 1;
    this.pageConfig.limit = this.paginator.pageSize;
    this.pageConfig.sort =
      this.sort.direction.length !== 0 ? this.sort.active : '';
    this.pageConfig.order = this.sort.direction || this.sort.start;
    this.pageConfig.filter = this.input.nativeElement.value;
  }
}
