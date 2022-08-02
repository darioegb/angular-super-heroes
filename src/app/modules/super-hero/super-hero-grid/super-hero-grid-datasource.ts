import { DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject } from 'rxjs';

import { genresEnum } from '@app/constants';
import { Column, ColumnDef, PageConfig } from '@shared/models';
import { DropdownTranslatePipe } from '@shared/pipes/dropdown-translate.pipe';
import { SuperHero, SuperHeroService } from '@modules/super-hero/shared';

export class SuperHeroGridDataSource extends DataSource<SuperHero> {
  private columns: Column[] = [
    { headerDef: 'name', cellDef: 'superHeroes.grid.columns.name' },
    { headerDef: 'age', cellDef: 'superHeroes.grid.columns.age' },
    {
      headerDef: 'genre',
      cellDef: 'superHeroes.grid.columns.genre',
      format: (value): string =>
        this.dropdownTranslatePipe.transform(
          genresEnum[value],
          'globals.enums.genres',
        ),
    },
    { headerDef: 'specialty', cellDef: 'superHeroes.grid.columns.specialty' },
    { headerDef: 'height', cellDef: 'superHeroes.grid.columns.height' },
    { headerDef: 'weight', cellDef: 'superHeroes.grid.columns.weight' },
    {
      headerDef: 'picture',
      cellDef: 'superHeroes.grid.columns.picture',
      isImg: true,
    },
  ];
  private displayedColumns: string[] = [];
  private dataSubject = new BehaviorSubject<SuperHero[]>([]);
  private countSubject = new BehaviorSubject<number>(0);

  count$ = this.countSubject.asObservable();

  constructor(
    private superHeroService: SuperHeroService,
    private dropdownTranslatePipe: DropdownTranslatePipe,
  ) {
    super();
    this.initDisplayedColumns();
  }

  connect(): Observable<SuperHero[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(): void {
    this.dataSubject.complete();
    this.countSubject.complete();
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
