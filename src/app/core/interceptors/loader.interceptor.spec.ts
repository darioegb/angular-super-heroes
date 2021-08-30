import { TestBed } from '@angular/core/testing';

import { LoaderInterceptor } from './loader.interceptor';
import { LoaderService } from '@core/services';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SuperHeroService } from '@modules/super-hero/shared/super-hero.service';
import { ToastrModule } from 'ngx-toastr';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { SuperHero } from '@modules/super-hero/shared/super-hero.model';

describe('LoaderInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let service: SuperHeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateTestingModule.withTranslations(
          'es',
          require('src/assets/i18n/es.json'),
        ),
        ToastrModule.forRoot(),
      ],
      providers: [
        SuperHeroService,
        LoaderService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoaderInterceptor,
          multi: true,
        },
      ],
    });

    service = TestBed.inject(SuperHeroService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should add an Authorization header', () => {
    const expectedHero = { id: '1', name: 'A' } as SuperHero;
    const superHeroId = '1';

    service
      .get(superHeroId)
      .subscribe(
        (hero) =>
          expect(hero).toEqual(
            expectedHero,
            'should return expected superHero',
          ),
        fail,
      );

    const httpRequest = httpTestingController.expectOne(
      `${service.baseUrl}/${superHeroId}`,
    );
    expect(httpRequest.request.method).toEqual('GET');
    httpRequest.flush(expectedHero);
  });
});
