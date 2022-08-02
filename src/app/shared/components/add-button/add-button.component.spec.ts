import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';

import { AddButtonComponent } from './add-button.component';

describe('AddButtonComponent', () => {
  let component: AddButtonComponent;
  let fixture: ComponentFixture<AddButtonComponent>;
  let hostElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddButtonComponent],
      imports: [MatIconModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AddButtonComponent);
    component = fixture.componentInstance;
    hostElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit addClick event when add button is clicked', () => {
    spyOn(component.addClick, 'emit');
    const addButton = hostElement.querySelector<HTMLButtonElement>(
      'button[aria-label~="add"]',
    );
    addButton.click();
    fixture.detectChanges();
    expect(component.addClick.emit).toHaveBeenCalled();
  });
});
