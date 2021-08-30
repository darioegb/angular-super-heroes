import { UtilService } from '@root/app/shared/services';
import { Observable, of } from 'rxjs';

export class TranslateServiceStub {
  constructor(private utilService: UtilService) {}

  get<T>(key: T): Observable<T> {
    return of(key);
  }

  instant(path: string): unknown {
    return this.utilService.getObjectProperty(
      require('src/assets/i18n/es.json'),
      path,
    );
  }
}
