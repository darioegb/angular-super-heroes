import { TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { DropdownTranslatePipe } from './dropdown-translate.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { TranslateServiceStub } from '@root/testing';
import { UtilService } from '../services';

describe('DropdownTranslatePipe', () => {
  let pipe: DropdownTranslatePipe;
  let service: TranslateService;
  let translateServiceStub: TranslateServiceStub;

  beforeEach(
    waitForAsync(() => {
      translateServiceStub = new TranslateServiceStub(
        new UtilService({} as never),
      );
      TestBed.configureTestingModule({
        imports: [
          BrowserModule,
          HttpClientTestingModule,
          TranslateTestingModule.withTranslations(
            'es',
            require('src/assets/i18n/es.json'),
          ),
        ],
        providers: [
          {
            provide: TranslateService,
            useValue: translateServiceStub,
          },
        ],
      });
      service = TestBed.inject(TranslateService);
      pipe = new DropdownTranslatePipe(service);
    }),
  );

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms `Male` to `Masculino`', () => {
    expect(pipe.transform('Male', 'globals.enums.genres')).toBe('Masculino');
  });
});
