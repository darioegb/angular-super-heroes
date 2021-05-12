import { DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { SuperHero } from '../shared/super-hero.model';
import { Column, ColumnDef, Page } from 'src/app/shared/interfaces';
import { SuperHeroService } from '../shared/super-hero.service';
import { PageConfig } from 'src/app/shared/models';
import { catchError } from 'rxjs/operators';

export class SuperHeroGridDataSource extends DataSource<SuperHero> {

  private columns: Column[] = [
    { headerDef: 'name', cellDef: 'Name' },
    { headerDef: 'age', cellDef: 'Age' },
    { headerDef: 'genre', cellDef: 'Genre' },
    { headerDef: 'specialty', cellDef: 'Specialty' },
    { headerDef: 'height', cellDef: 'Height' },
    { headerDef: 'weight', cellDef: 'Weight' },
    { headerDef: 'picture', cellDef: 'Picture' },
  ];
  private displayedColumns: string[] = [];
  private dataSubject = new BehaviorSubject<SuperHero[]>([]);
  private countSubject = new BehaviorSubject<number>(0);

  count$ = this.countSubject.asObservable();

  constructor(private superHeroService: SuperHeroService) {
    super();
    this.initDisplayedColumns();
  }

  connect(): Observable<SuperHero[]> {
    return this.dataSubject.asObservable();
  }

  disconnect() {
    this.dataSubject.complete();
  }

  columnsDef(): ColumnDef {
    return { columns: this.columns, displayedColumns: this.displayedColumns };
  }

  loadData(pageConfig: PageConfig) {
    this.superHeroService
      .getSuperHeroes(pageConfig)
      .pipe(catchError(() => of([])))
      .subscribe((result: Page<SuperHero>) => {
        this.dataSubject.next(result.items);
        this.countSubject.next(result.count);
      });
  }

  private initDisplayedColumns() {
    this.columns.forEach((column) =>
      this.displayedColumns.push(column.headerDef)
    );
    this.displayedColumns.push('actions');
  }
}
