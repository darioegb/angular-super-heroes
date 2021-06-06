import { DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { SuperHero } from '../shared/super-hero.model';
import { Column, ColumnDef, Page } from '@app/shared/models/grid.model';
import { SuperHeroService } from '../shared/super-hero.service';
import { PageConfig } from '@app/shared/models/page-config.model';
import { TranslateService } from '@ngx-translate/core';

export class SuperHeroGridDataSource extends DataSource<SuperHero> {
  private columns: Column[] = [];
  private displayedColumns: string[] = [];
  private dataSubject = new BehaviorSubject<SuperHero[]>([]);
  private countSubject = new BehaviorSubject<number>(0);
  private translateSubscription: Subscription;

  count$ = this.countSubject.asObservable();

  constructor(
    private superHeroService: SuperHeroService,
    private translateService: TranslateService
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
      .subscribe((translations) => {
        const { name, age, genre, specialty, height, weight, picture } =
          translations;
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
    this.superHeroService
      .getPage(pageConfig)
      .subscribe((result: Page<SuperHero>) => {
        this.dataSubject.next(result.items);
        this.countSubject.next(result.count);
      });
  }

  private initDisplayedColumns(): void {
    this.columns.forEach((column) =>
      this.displayedColumns.push(column.headerDef)
    );
    this.displayedColumns.push('actions');
  }
}
