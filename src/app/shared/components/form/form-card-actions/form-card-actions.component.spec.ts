import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpyLocation } from '@angular/common/testing';
import { MatCardModule } from '@angular/material/card';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { FormCardActionsComponent } from './form-card-actions.component';

describe('FormCardActionsComponent', () => {
  let component: FormCardActionsComponent;
  let fixture: ComponentFixture<FormCardActionsComponent>;
  let hostElement: HTMLElement;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormCardActionsComponent],
      imports: [
        MatCardModule,
        TranslateTestingModule.withTranslations(
          'es',
          require('src/assets/i18n/es.json'),
        ),
      ],
      providers: [
        {
          provide: Location,
          useClass: SpyLocation,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormCardActionsComponent);
    component = fixture.componentInstance;
    hostElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  beforeEach(() => {
    location = TestBed.inject(Location);
  });

  it('should render', () => {
    const buttons = hostElement.querySelectorAll('button');
    expect(component).toBeTruthy();
    expect(buttons.length).toBe(3);
  });

  it('should emit goBack event when add button is clicked', () => {
    spyOn(location, 'back');
    const cancelButton = hostElement.querySelector<HTMLButtonElement>(
      'button[color="warn"]',
    );
    cancelButton.click();
    fixture.detectChanges();
    expect(location.back).toHaveBeenCalled();
  });
});
