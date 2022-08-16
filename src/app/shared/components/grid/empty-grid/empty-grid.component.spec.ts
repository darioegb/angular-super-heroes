import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { EmptyGridComponent } from './empty-grid.component';

describe('EmptyGridComponent', () => {
  let component: EmptyGridComponent;
  let fixture: ComponentFixture<EmptyGridComponent>;
  let hostElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptyGridComponent],
      imports: [
        TranslateTestingModule.withTranslations(
          'en',
          require('src/assets/i18n/en.json'),
        ),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyGridComponent);
    component = fixture.componentInstance;
    hostElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should show empty row message', () => {
    expect(component).toBeTruthy();
    expect(hostElement.innerText).toBe('No data matching the filter');
  });
});
