import { Data, Params } from '@angular/router';
import { ReplaySubject } from 'rxjs';

export class ActivatedRouteStub {
  private paramsSubject = new ReplaySubject<Params>();
  private dataSubject = new ReplaySubject<Data>();

  constructor(
    initialParams?: Params,
    initialData?: Data,
    initialQueryParam?: Params
  ) {
    this.setParam(initialParams);
    this.setData(initialData);
    this.setQueryParams(initialQueryParam);
  }

  readonly params = this.paramsSubject.asObservable();
  readonly data = this.dataSubject.asObservable();
  readonly snapshot = {
    queryParams: {}
  };

  setParam(params: Params = {}) {
    this.paramsSubject.next(params);
  }

  setData(data: Data = {}) {
    this.dataSubject.next(data);
  }

  setQueryParams(queryParam: Params) {
    this.snapshot.queryParams = queryParam;
  }
}
