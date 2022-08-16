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
          'en',
          require('src/assets/i18n/en.json'),
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
    component.title = 'Test';
    fixture.detectChanges();
    expect(hostElement.querySelector('mat-card-title').textContent).toContain(
      'Test',
    );
    expect(hostElement.querySelector('mat-card-content')).toBeDefined();
  });
});
