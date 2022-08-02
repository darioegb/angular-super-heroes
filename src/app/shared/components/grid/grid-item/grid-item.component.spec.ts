import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridItemComponent } from './grid-item.component';

describe('GridItemComponent', () => {
  let component: GridItemComponent<unknown>;
  let fixture: ComponentFixture<GridItemComponent<unknown>>;
  let hostElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridItemComponent<unknown>],
    }).compileComponents();
  });

  describe('with image', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(GridItemComponent);
      component = fixture.componentInstance;
      hostElement = fixture.nativeElement;
      component.column = {
        headerDef: 'picture',
        cellDef: 'Picture',
        isImg: true,
      };
      component.row = { picture: 'test.png' };
      fixture.detectChanges();
    });
    it('should row image', () => {
      expect(hostElement.querySelector('img')).toBeDefined();
    });
  });

  describe('without image', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(GridItemComponent);
      component = fixture.componentInstance;
      hostElement = fixture.nativeElement;
      component.column = {
        headerDef: 'name',
        cellDef: 'Name',
      };
      component.row = { name: 'Test' };
      fixture.detectChanges();
    });
    it('should row text', () => {
      expect(hostElement.innerText).toBe('Test');
    });
  });
});
