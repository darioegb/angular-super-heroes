import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Page } from 'src/app/shared/interfaces';
import { PageConfig } from 'src/app/shared/models';
import { environment } from 'src/environments/environment';
import { SuperHero } from './super-hero.model';

@Injectable({
  providedIn: 'root',
})
export class SuperHeroService {
  baseUrl: string = `${environment.mockApiUrl}/superHeroes`;

  constructor(private http: HttpClient) {}

  getSuperHeroes(pageConfig: PageConfig): Observable<Page<SuperHero>> {
    let params = new HttpParams()
      .set('_page', pageConfig.page.toString())
      .set('_limit', pageConfig.limit.toString())
      .set('_sort', !!pageConfig.sort ? pageConfig.sort : 'id')
      .set('_order', pageConfig.order.toString());

    if (pageConfig.filter.length > 0) {
      params = params.append('name_like', pageConfig.filter);
    }

    return this.http
      .get<SuperHero[]>(this.baseUrl, {
        params,
        observe: 'response',
      })
      .pipe(
        map((response) => {
          return {
            items: response.body,
            count: +response.headers.get('x-total-count'),
          };
        })
      );
  }

  getSuperHero(id: string): Observable<SuperHero> {
    return this.http.get<SuperHero>(`${this.baseUrl}/${id}`);
  }

  addSuperHero(newSuperHero: SuperHero): Observable<void> {
    return this.http.post<void>(this.baseUrl, newSuperHero);
  }

  editSuperHero(superHero: SuperHero): Observable<SuperHero> {
    return this.http.put<SuperHero>(
      `${this.baseUrl}/${superHero.id}`,
      superHero
    );
  }

  deleteSuperHero(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
