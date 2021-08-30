import { TestBed } from '@angular/core/testing';

import { MatPaginatorI18nService } from './mat-paginator-i18n.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { DefaultLangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ReplaySubject, of, Observable } from 'rxjs';

describe('MatPaginatorI18nService', () => {
  const eventSubject = new ReplaySubject<DefaultLangChangeEvent>(1);
  const translateStub = {
    onLangChange: eventSubject.asObservable(),
    setDefaultLang: jasmine.createSpy('setDefaultLang'),
    get: (_: string): Observable<unknown> => of({}),
    defaultLang: 'es',
  };
  let service: MatPaginatorI18nService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateTestingModule.withTranslations(
          'es',
          require('src/assets/i18n/es.json'),
        ),
      ],
      providers: [
        MatPaginatorI18nService,
        {
          provide: TranslateService,
          useValue: translateStub,
        },
      ],
    });
    service = TestBed.inject(MatPaginatorI18nService);
  });

  it('getRangeLabel should return string ranges', () => {
    expect(service.getRangeLabel(0, 10, 2)).toBe('1 - 2 / 2');
    expect(service.getRangeLabel(3, 10, 20)).toBe('31 - 40 / 20');
    expect(service.getRangeLabel(0, 0, 10)).toBe('0 / 10');
  });

  it('getAndInitTranslations should be called when langChange', () => {
    spyOn(service, 'getAndInitTranslations');
    eventSubject.next({ lang: 'en', translations: [] });
    translateStub.onLangChange.subscribe((newLang) => {
      expect(newLang.lang).toEqual('en');
      expect(service.getAndInitTranslations).toHaveBeenCalled();
    });
  });
});
