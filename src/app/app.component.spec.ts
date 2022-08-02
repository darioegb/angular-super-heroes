import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { AppComponent } from './app.component';
import { LoaderService } from './core/services';
import { SharedModule } from './shared/shared.module';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateTestingModule.withTranslations(
          'es',
          require('src/assets/i18n/es.json'),
        ),
        SharedModule,
      ],
      declarations: [AppComponent],
      providers: [LoaderService],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    app.ngOnInit();
    expect(app.isLoading$).toBeDefined();
  });
});
