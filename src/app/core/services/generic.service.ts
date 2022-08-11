import { environment } from '@environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PageConfig, Page } from '@shared/models';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { HTTP_METHOD_KEYS } from '@shared/globals';
import { Injectable, Input } from '@angular/core';

@Injectable()
export abstract class GenericService<T> {
  @Input()
  set baseUrl(urlName: string) {
    this._baseUrl = `${environment[urlName]}/${this.getResourceUrl()}`;
  }
  get baseUrl(): string {
    return this._baseUrl;
  }

  constructor(
    protected httpClient: HttpClient,
    protected toastr: ToastrService,
    protected translateService: TranslateService,
  ) {
    this.baseUrl = 'apiUrl';
  }

  abstract getResourceUrl(): string;
  private _baseUrl: string;

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
          }),
        ),
      );
  }

  get(id: string | number): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}/${id}`).pipe(
      map((json) => this.fromServerModel(json)),
      catchError((error) => this.handleError(error, HTTP_METHOD_KEYS.get)),
    );
  }

  add(resource: T): Observable<unknown> {
    return this.httpClient
      .post(`${this.baseUrl}`, this.toServerModel(resource))
      .pipe(
        catchError((error) => this.handleError(error, HTTP_METHOD_KEYS.post)),
      );
  }

  delete(id: string | number): Observable<unknown> {
    return this.httpClient
      .delete(`${this.baseUrl}/${id}`)
      .pipe(
        catchError((error) => this.handleError(error, HTTP_METHOD_KEYS.delete)),
      );
  }

  update(resource: T): Observable<unknown> {
    const resourceServer = this.toServerModel(resource);
    return this.httpClient
      .put(`${this.baseUrl}/${resourceServer.id}`, resourceServer)
      .pipe(
        catchError((error) => this.handleError(error, HTTP_METHOD_KEYS.put)),
      );
  }

  protected handleError(
    error: HttpErrorResponse,
    operation: string,
  ): Observable<never> {
    this.toastr.error(
      this.translateService.instant(`globals.toasts.${operation}.error`, {
        value: this.translateService.instant(
          `${this.getResourceUrl()}.detail.title`,
        ),
      }),
    );
    return throwError(() => error);
  }
}
