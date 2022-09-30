import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { AppComponent } from './app.component';
import { LoaderService } from './core/services';
import { SharedModule } from './shared/shared.module';
import { TranslateService } from '@ngx-translate/core';

describe('AppComponent', () => {
  let service: TranslateService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateTestingModule.withTranslations(
          'en',
          require('src/assets/i18n/en.json'),
        ),
        SharedModule,
      ],
      declarations: [AppComponent],
      providers: [LoaderService],
    }).compileComponents();
    service = TestBed.inject(TranslateService);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOn(service, 'use');
    expect(app).toBeTruthy();
    app.ngOnInit();
    expect(service.use).toHaveBeenCalled();
  });
});
