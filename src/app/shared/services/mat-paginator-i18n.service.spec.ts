import { TestBed } from '@angular/core/testing';

import { MatPaginatorI18nService } from './mat-paginator-i18n.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { DefaultLangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ReplaySubject, of } from 'rxjs';

describe('MatPaginatorI18nService', () => {
  const SPANISH_TRANSLATIONS = {
    paginator: {
      itemsPerPageLabel: 'Items por pagina',
      nextPageLabel: 'Siguiente Pagina',
      previousPageLabel: 'Pagina Anterior',
      firstPageLabel: 'Primera Pagina',
      lastPageLabel: 'Ultima Pagina',
    },
  };
  const eventSubject = new ReplaySubject<DefaultLangChangeEvent>(1);
  const fakeTranslate = {
    onLangChange: eventSubject.asObservable(),
    setDefaultLang: jasmine.createSpy('setDefaultLang'),
    get: (_: string) => of({}),
    defaultLang: 'es',
  };
  let service: MatPaginatorI18nService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateTestingModule.withTranslations('es', SPANISH_TRANSLATIONS),
      ],
      providers: [
        {
          provide: TranslateService,
          useValue: fakeTranslate,
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
    fakeTranslate.onLangChange.subscribe((newLang) => {
      expect(newLang.lang).toEqual('en');
      expect(service.getAndInitTranslations).toHaveBeenCalled();
    });
  });
});
