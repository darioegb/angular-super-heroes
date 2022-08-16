import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { SuperHeroGridComponent } from './super-hero-grid.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '@shared/shared.module';
import { ActiveToast, ToastrModule, ToastrService } from 'ngx-toastr';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SuperHero, SuperHeroService } from '@modules/super-hero/shared';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogStub } from '@root/testing';
import { PageConfig } from '@shared/models/page-config.model';
import { Page } from '@root/app/shared/models';

describe('SuperHeroGridComponent', () => {
  let component: SuperHeroGridComponent;
  let fixture: ComponentFixture<SuperHeroGridComponent>;
  let toastServiceStub: Partial<ToastrService>;
  let superHeroServiceStub: Partial<SuperHeroService>;
  let dialog: DialogStub;

  beforeEach(() => {
    toastServiceStub = {
      success: (): ActiveToast<unknown> => null,
    };
    superHeroServiceStub = {
      getPage: (): Observable<Page<SuperHero>> =>
        of({
          items: [
            { id: '1', name: 'AAA' },
            { id: '2', name: 'BBB' },
          ] as SuperHero[],
          count: 2,
        }),
      delete: (): Observable<unknown> => of(),
    };
    dialog = new DialogStub();
  });

  describe('with module setup', () => {
    let hostElement: HTMLElement;
    const routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', [
      'navigate',
    ]);

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SuperHeroGridComponent],
        imports: [
          NoopAnimationsModule,
          FormsModule,
          MatIconModule,
          MatInputModule,
          MatPaginatorModule,
          MatSortModule,
          MatTableModule,
          HttpClientTestingModule,
          TranslateTestingModule.withTranslations(
            'en',
            require('src/assets/i18n/en.json'),
          ),
          ToastrModule.forRoot(),
          SharedModule,
        ],
        providers: [
          {
            provide: Router,
            useValue: routerSpy,
          },
          {
            provide: ActivatedRoute,
            useValue: {},
          },
          {
            provide: MatDialog,
            useValue: dialog,
          },
          { provide: ToastrService, useValue: toastServiceStub },
          { provide: SuperHeroService, useValue: superHeroServiceStub },
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(SuperHeroGridComponent);
      component = fixture.componentInstance;
      hostElement = fixture.nativeElement;
      fixture.detectChanges();
    });

    it('should init grid', () => {
      spyOn(superHeroServiceStub, 'getPage').and.returnValue(
        of({
          items: [],
          count: 0,
        }),
      );
      component.ngOnInit();
      fixture.detectChanges();
      expect(superHeroServiceStub.getPage).toHaveBeenCalled();
      expect(hostElement.querySelectorAll('tr').length).toEqual(4);
    });

    it('should tell router to navigate when add button clicked', () => {
      const spy = routerSpy.navigate;
      const addButton = hostElement.querySelector<HTMLButtonElement>(
        'button[aria-label~="add"]',
      );
      addButton.click();
      const navArgs = spy.calls.mostRecent().args[0];
      expect(spy).toHaveBeenCalled();
      expect(navArgs[0]).toBe('detail');
    });

    it('should tell router to navigate when edit button clicked', () => {
      const superHeroId = '1';
      const spy = routerSpy.navigate;
      const editButton = hostElement.querySelector<HTMLButtonElement>(
        'button[aria-label~="edit"]',
      );
      editButton.click();
      const navArgs = spy.calls.mostRecent().args[0];
      expect(spy).toHaveBeenCalled();
      expect(navArgs[0]).toBe(`detail/${superHeroId}`);
    });

    it('should tell router to navigate when view button clicked', () => {
      const superHeroId = '1';
      const spy = routerSpy.navigate;
      const viewButton = hostElement.querySelector<HTMLButtonElement>(
        'button[aria-label~="visibility"]',
      );
      viewButton.click();
      const navArgs = spy.calls.mostRecent().args;
      const queryParams = Object.fromEntries(
        Object.entries(navArgs[1].queryParams),
      );
      expect(spy).toHaveBeenCalled();
      expect(navArgs[0][0]).toBe(`detail/${superHeroId}`);
      expect(queryParams.view).toBeTruthy();
    });

    it('should delete hero when delete button clicked and confirm dialog', () => {
      spyOn(toastServiceStub, 'success');
      spyOn(dialog, 'open').and.callThrough();
      spyOn(superHeroServiceStub, 'delete').and.returnValue(of({}));

      const superHeroId = '1';
      const deleteButton = hostElement.querySelector<HTMLButtonElement>(
        'button[aria-label~="delete"]',
      );
      deleteButton.click();
      expect(dialog.open).toHaveBeenCalled();
      expect(superHeroServiceStub.delete).toHaveBeenCalledWith(superHeroId);
      expect(toastServiceStub.success).toHaveBeenCalled();
    });

    it('should not delete hero when delete button clicked and cancel dialog', () => {
      dialog.setInstance(false);
      spyOn(dialog, 'open').and.callThrough();

      const deleteButton = hostElement.querySelector<HTMLButtonElement>(
        'button[aria-label~="delete"]',
      );
      deleteButton.click();
      expect(dialog.open).toHaveBeenCalled();
    });

    it('should call onLoadData when change sort', () => {
      spyOn(component, 'onLoadData');
      const columnHeader =
        hostElement.querySelector<HTMLElement>('th.cdk-column-name');
      columnHeader.click();
      expect(component.onLoadData).toHaveBeenCalled();
      expect(component.sort.active.length).toBeGreaterThan(0);
    });

    it('should call onLoadData when sort event change', () => {
      component.pageConfig = new PageConfig(1, 10, null, 'desc');
      const sortName = component.pageConfig.sort;
      component.sort.sort({ id: null, start: 'desc', disableClear: false });
      expect(component.pageConfig.sort).not.toEqual(sortName);
      component.sort.sort({ id: 'name', start: 'desc', disableClear: false });
      expect(component.pageConfig.sort).not.toEqual(sortName);
    });

    // it('should call onLoadData when is fired keyup event on search input', fakeAsync(() => {
    //   spyOn(component, 'onLoadData');
    //   const input = component.input.nativeElement as HTMLInputElement;
    //   input.value = '';
    //   input.dispatchEvent(new Event('keyup'));
    //   expect(input.eventListeners('keyup').length).toEqual(1);
    //   input.value = 'AAA';
    //   input.dispatchEvent(new Event('keyup'));
    //   tick(1000);
    //   expect(component.onLoadData).toHaveBeenCalled();
    // }));
  });
});
