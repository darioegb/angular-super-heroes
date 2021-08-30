import { Data, Params } from '@angular/router';
import { ReplaySubject } from 'rxjs';

export class ActivatedRouteStub {
  private paramsSubject = new ReplaySubject<Params>();
  private dataSubject = new ReplaySubject<Data>();

  constructor(
    initialParams?: Params,
    initialData?: Data,
    initialQueryParam?: Params,
  ) {
    this.setParam(initialParams);
    this.setData(initialData);
    this.setQueryParams(initialQueryParam);
  }

  readonly params = this.paramsSubject.asObservable();
  readonly data = this.dataSubject.asObservable();
  readonly snapshot = {
    queryParams: {},
  };

  setParam(params: Params = {}): void {
    this.paramsSubject.next(params);
  }

  setData(data: Data = {}): void {
    this.dataSubject.next(data);
  }

  setQueryParams(queryParam: Params): void {
    this.snapshot.queryParams = queryParam;
  }
}
