import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { FormCardComponent } from './form-card.component';

describe('FormCardComponent', () => {
  let component: FormCardComponent;
  let fixture: ComponentFixture<FormCardComponent>;
  let hostElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormCardComponent],
      imports: [
        MatCardModule,
        TranslateTestingModule.withTranslations(
          'es',
          require('src/assets/i18n/es.json'),
        ),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormCardComponent);
    component = fixture.componentInstance;
    hostElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(component).toBeTruthy();
    expect(hostElement.querySelector('mat-card-title').textContent).toContain(
      'Superhéroe',
    );
    expect(hostElement.querySelector('mat-card-content')).toBeDefined();
  });
});
