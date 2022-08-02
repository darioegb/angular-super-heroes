import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';

import { GridActionsComponent } from './grid-actions.component';

describe('GridActionsComponent', () => {
  let component: GridActionsComponent<unknown>;
  let fixture: ComponentFixture<GridActionsComponent<unknown>>;
  let hostElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridActionsComponent],
      imports: [MatIconModule],
    }).compileComponents();

    fixture = TestBed.createComponent(GridActionsComponent<unknown>);
    component = fixture.componentInstance;
    hostElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit delete event when delete button is clicked', () => {
    spyOn(component.delete, 'emit');
    const deleteButton = hostElement.querySelector<HTMLButtonElement>(
      'button[color="warn"]',
    );
    deleteButton.click();
    fixture.detectChanges();
    expect(component.delete.emit).toHaveBeenCalled();
  });

  it('should emit editOrView event when view button is clicked', () => {
    spyOn(component.editOrView, 'emit');
    const viewButton = hostElement.querySelector<HTMLButtonElement>(
      'button[aria-label~="visibility"]',
    );
    viewButton.click();
    expect(component.editOrView.emit).toHaveBeenCalledWith({
      item: undefined,
      view: true,
    });
  });

  it('should emit editOrView event when edit button is clicked', () => {
    spyOn(component.editOrView, 'emit');
    const editButton = hostElement.querySelector<HTMLButtonElement>(
      'button[color="primary"]',
    );
    editButton.click();
    expect(component.editOrView.emit).toHaveBeenCalledOnceWith({
      item: undefined,
    });
  });
});
