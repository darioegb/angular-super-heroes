import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let hostElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [
        NoopAnimationsModule,
        FormsModule,
        MatToolbarModule,
        MatSelectModule,
        TranslateTestingModule.withTranslations(
          'es',
          require('src/assets/i18n/es.json'),
        ),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    hostElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  beforeEach(() => localStorage.clear());

  it('should create', () => {
    localStorage.setItem('lang', 'es');
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    expect(hostElement.querySelector('h1').innerHTML).toBe('ABM con material');
  });

  it('should set locale when change select', () => {
    spyOn(component, 'changeLanguaje');
    const selectTrigger = fixture.debugElement.query(
      By.css('.mat-select-trigger'),
    );
    selectTrigger.triggerEventHandler('click', {});
    fixture.detectChanges();
    const options = document.querySelectorAll('.mat-select-panel mat-option');
    (options[0] as any).click(); // Click the second option, "English".
    fixture.detectChanges();
    expect(component.changeLanguaje).toHaveBeenCalled();
    expect(component.selectedLang).toBe('en');
  });

  it('should change language', () => {
    component.selectedLang = 'en';
    component.changeLanguaje();
    expect(localStorage.getItem('lang')).toBe('en');
  });
});
