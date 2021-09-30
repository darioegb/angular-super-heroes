import { DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { Column, ColumnDef, Page, PageConfig } from '@shared/models';
import { TranslateService } from '@ngx-translate/core';
import { SuperHero, SuperHeroService } from '@modules/super-hero/shared';

export class SuperHeroGridDataSource extends DataSource<SuperHero> {
  private columns: Column[] = [];
  private displayedColumns: string[] = [];
  private dataSubject = new BehaviorSubject<SuperHero[]>([]);
  private countSubject = new BehaviorSubject<number>(0);
  private translateSubscription: Subscription;

  count$ = this.countSubject.asObservable();

  constructor(
    private superHeroService: SuperHeroService,
    private translateService: TranslateService,
  ) {
    super();
    this.getTranslations();
    this.initDisplayedColumns();
  }

  connect(): Observable<SuperHero[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(): void {
    this.dataSubject.complete();
    this.countSubject.complete();
    this.translateSubscription.unsubscribe();
  }

  getTranslations(): void {
    this.translateSubscription = this.translateService
      .get('superHeroes.grid.columns')
      .subscribe(({ name, age, genre, specialty, height, weight, picture }) => {
        this.columns = [
          { headerDef: 'name', cellDef: name },
          { headerDef: 'age', cellDef: age },
          { headerDef: 'genre', cellDef: genre },
          { headerDef: 'specialty', cellDef: specialty },
          { headerDef: 'height', cellDef: height },
          { headerDef: 'weight', cellDef: weight },
          { headerDef: 'picture', cellDef: picture },
        ];
      });
  }

  columnsDef(): ColumnDef {
    return { columns: this.columns, displayedColumns: this.displayedColumns };
  }

  loadData(pageConfig: PageConfig): void {
    this.superHeroService.getPage(pageConfig).subscribe(({ items, count }) => {
      this.dataSubject.next(items);
      this.countSubject.next(count);
    });
  }

  private initDisplayedColumns(): void {
    this.columns.forEach(({ headerDef }) =>
      this.displayedColumns.push(headerDef),
    );
    this.displayedColumns.push('actions');
  }
}
