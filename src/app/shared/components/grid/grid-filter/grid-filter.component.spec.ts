import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { GridFilterComponent } from './grid-filter.component';

describe('GridFilterComponent', () => {
  let component: GridFilterComponent;
  let fixture: ComponentFixture<GridFilterComponent>;
  let hostElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridFilterComponent],
      imports: [NoopAnimationsModule, MatInputModule, MatIconModule],
    }).compileComponents();

    fixture = TestBed.createComponent(GridFilterComponent);
    component = fixture.componentInstance;
    hostElement = fixture.nativeElement;
    component.filterInput = {
      label: 'search field',
      placeholder: 'type for ex. test',
    };
    fixture.detectChanges();
  });

  it('should call filterChange event when filter value changed', fakeAsync(() => {
    spyOn(component.filterChange, 'emit');
    const input = hostElement.querySelector<HTMLInputElement>('input');
    input.value = 'test';
    input.dispatchEvent(new Event('keyup'));
    tick(1000);
    expect(component.filterChange.emit).toHaveBeenCalled();
  }));

  it('should call filterChange event when filter value was deleted', fakeAsync(() => {
    spyOn(component.filterChange, 'emit');
    component.input.nativeElement.value = 'test';
    fixture.detectChanges();
    const input = hostElement.querySelector<HTMLInputElement>('input');
    input.value = '';
    input.dispatchEvent(new Event('keyup'));
    tick(1000);
    expect(component.filterChange.emit).toHaveBeenCalled();
  }));

  it('should reset input & call filterChange event when reset button is clicked', () => {
    spyOn(component.filterChange, 'emit');
    component.input.nativeElement.value = 'test';
    fixture.detectChanges();
    const resetButton = hostElement.querySelector<HTMLButtonElement>('button');
    resetButton.click();
    expect(component.input.nativeElement.value).toBe('');
    expect(component.filterChange.emit).toHaveBeenCalled();
  });
});
