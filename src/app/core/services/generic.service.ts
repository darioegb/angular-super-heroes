import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PageConfig } from '@app/shared/models/page-config.model';
import { Page } from '@app/shared/models/grid.model';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export abstract class GenericService<T> {
  public readonly baseUrl = `${environment.apiUrl}/${this.getResourceUrl()}`;

  constructor(
    protected httpClient: HttpClient,
    protected toastr: ToastrService,
    protected translateService: TranslateService
  ) {}

  abstract getResourceUrl(): string;

  toServerModel(entity: T): any {
    return entity;
  }

  fromServerModel(json: any): T {
    return json;
  }

  getPage(pageConfig: PageConfig): Observable<Page<T>> {
    let params = new HttpParams()
      .set('_page', pageConfig.page.toString())
      .set('_limit', pageConfig.limit.toString())
      .set('_sort', !!pageConfig.sort ? pageConfig.sort : 'id')
      .set('_order', pageConfig.order.toString());

    if (pageConfig.filter.length > 0) {
      params = params.append('name_like', pageConfig.filter);
    }

    return this.httpClient
      .get<T[]>(this.baseUrl, {
        params,
        observe: 'response',
      })
      .pipe(
        map((response) => {
          return {
            items: response.body.map((item) => this.fromServerModel(item)),
            count: +response.headers.get('x-total-count'),
          };
        }),
        catchError(() =>
          of({
            items: [],
            count: 0,
          })
        )
      );
  }

  get(id: string | number): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}/${id}`).pipe(
      map((json) => this.fromServerModel(json)),
      catchError((error) => this.handleError(error, 'get'))
    );
  }

  add(resource: T): Observable<unknown> {
    return this.httpClient
      .post(`${this.baseUrl}`, this.toServerModel(resource))
      .pipe(catchError((error) => this.handleError(error, 'add')));
  }

  delete(id: string | number): Observable<unknown> {
    return this.httpClient
      .delete(`${this.baseUrl}/${id}`)
      .pipe(catchError((error) => this.handleError(error, 'delete')));
  }

  update(resource: T): Observable<Object> {
    const resourceServer = this.toServerModel(resource);
    return this.httpClient
      .put(`${this.baseUrl}/${resourceServer.id}`, resourceServer)
      .pipe(catchError((error) => this.handleError(error, 'update')));
  }

  private handleError(error: HttpErrorResponse, operation: string) {
    this.toastr.error(
      this.translateService.instant(
        `${this.getResourceUrl()}.toasts.${operation}.error`
      )
    );

    return throwError(error);
  }
}
