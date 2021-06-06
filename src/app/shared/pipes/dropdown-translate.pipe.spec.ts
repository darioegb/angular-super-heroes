import { TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { DropdownTranslatePipe } from './dropdown-translate.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';

describe('DropdownTranslatePipe', () => {
  let pipe: DropdownTranslatePipe;
  let service: TranslateService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          BrowserModule,
          HttpClientTestingModule,
          TranslateTestingModule.withTranslations(
            'es',
            require('src/assets/i18n/es.json')
          ),
        ],
      });
      service = TestBed.inject(TranslateService);
      pipe = new DropdownTranslatePipe(service);
    })
  );

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms `Male` to `Masculino`', () => {
    expect(pipe.transform('Male', 'globals.enums.genres')).toBe('Masculino');
  });
});
