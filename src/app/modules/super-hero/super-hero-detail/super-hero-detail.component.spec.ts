import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { SuperHeroDetailComponent } from './super-hero-detail.component';
import { ActivatedRoute } from '@angular/router';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '@app/shared/shared.module';
import { ActivatedRouteStub } from '@testing/activated-route-stub';
import { SuperHero } from '@app/modules/super-hero/shared/super-hero.model';
import { SuperHeroService } from '@app/modules/super-hero/shared/super-hero.service';
import { of, throwError } from 'rxjs';

describe('SuperHeroDetailComponent', () => {
  const SPANISH_TRANSLATIONS = {
    superHeroes: {
      toasts: {
        add: {
          success: 'El superheoe se agregó con éxito',
          error: 'Ocurrió un error al agregar un superheroe',
        },
        update: {
          success: 'El superheoe fue actualizado con éxito',
          error: 'Ocurrió un error al actualizar un superheroe',
        },
      },
    },
    globals: {
      enums: {
        genres: {
          male: 'Masculino',
          female: 'Femenino',
          undefined: 'Indefinido',
        },
      },
    },
  };
  let activatedRoute: ActivatedRouteStub;
  let component: SuperHeroDetailComponent;
  let fixture: ComponentFixture<SuperHeroDetailComponent>;
  let toastServiceStub: Partial<ToastrService>;

  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
    toastServiceStub = {
      success: () => null,
    };
  });

  describe('with module setup', () => {
    let hostElement: HTMLElement;
    let submitButton: HTMLButtonElement;
    let toastService: ToastrService;
    const superHeroServiceSpy: jasmine.SpyObj<SuperHeroService> =
      jasmine.createSpyObj('SuperHeroService', ['add', 'update']);

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          declarations: [SuperHeroDetailComponent],
          imports: [
            NoopAnimationsModule,
            ReactiveFormsModule,
            MatButtonModule,
            MatCardModule,
            MatInputModule,
            MatRadioModule,
            MatSelectModule,
            HttpClientTestingModule,
            TranslateTestingModule.withTranslations('es', SPANISH_TRANSLATIONS),
            ToastrModule.forRoot(),
            SharedModule,
          ],
          providers: [
            {
              provide: ActivatedRoute,
              useValue: activatedRoute,
            },
            { provide: SuperHeroService, useValue: superHeroServiceSpy },
            { provide: ToastrService, useValue: toastServiceStub },
          ],
        }).compileComponents();
      })
    );

    beforeEach(() => {
      toastService = TestBed.inject(ToastrService);
      fixture = TestBed.createComponent(SuperHeroDetailComponent);
      component = fixture.componentInstance;
      hostElement = fixture.nativeElement;
      submitButton = hostElement.querySelector('button[type="submit"]');
      fixture.detectChanges();
    });

    describe('when view mode', () => {
      beforeEach(
        waitForAsync(() => {
          activatedRoute.setData({
            superHero: {
              id: '1',
              name: 'A',
              genre: 1,
              specialty: 'He can fly',
            } as SuperHero,
          });
          activatedRoute.setQueryParams({ view: true });
          activatedRoute.setParam({ superHeroId: '1' });
        })
      );

      it('should disabled form and defined superHero', fakeAsync(() => {
        component.ngOnInit();
        tick();
        fixture.detectChanges();
        expect(component.view).toBeTruthy();
        expect(component.superHeroForm.disabled).toBeTruthy();
        expect(submitButton.disabled).toBeTruthy();
        expect(component.superHero).toBeDefined();
      }));
    });

    describe('when edit mode', () => {
      beforeEach(
        waitForAsync(() => {
          activatedRoute.setData({
            superHero: {
              id: '1',
              name: 'A',
              genre: 1,
              specialty: 'He can fly',
            } as SuperHero,
          });
          activatedRoute.setParam({ superHeroId: '1' });
        })
      );

      it('should active form and defined superHero', fakeAsync(() => {
        component.ngOnInit();
        tick();
        fixture.detectChanges();
        expect(component.view).not.toBeTruthy();
        expect(component.superHeroForm.disabled).not.toBeTruthy();
        expect(submitButton.disabled).not.toBeTruthy();
        expect(component.superHero).toBeDefined();
      }));

      it('should update super hero when data is valid', () => {
        spyOn(toastService, 'success');
        superHeroServiceSpy.update.and.returnValue(of({}));
        component.superHeroControls.age.setValue(100);
        fixture.detectChanges();
        component.onSubmit();
        expect(component.superHeroForm.valid).toBeTruthy();
        expect(component.superHero).toBeDefined();
        expect(superHeroServiceSpy.update).toHaveBeenCalled();
        expect(toastService.success).toHaveBeenCalled();
      });

      it('should not update super hero when error occured', () => {
        superHeroServiceSpy.update.and.returnValue(
          throwError('fail to update')
        );
        component.superHeroControls.age.setValue(100);
        fixture.detectChanges();
        component.onSubmit();
        expect(component.superHeroForm.valid).toBeTruthy();
        expect(component.superHero).toBeDefined();
        expect(superHeroServiceSpy.update).toHaveBeenCalled();
      });
    });

    describe('when create mode', () => {
      const newSuperHero: SuperHero = {
        name: 'B',
        genre: 1,
        specialty: 'He can run fast',
      };
      it('should active form and undefined superHero', fakeAsync(() => {
        component.ngOnInit();
        tick();
        fixture.detectChanges();
        expect(component.view).not.toBeTruthy();
        expect(component.superHeroForm.disabled).not.toBeTruthy();
        expect(submitButton.disabled).not.toBeTruthy();
        expect(component.superHero).not.toBeDefined();
      }));

      it('should invalid form when send invalid data', () => {
        component.onSubmit();
        expect(component.superHeroForm.invalid).toBeTruthy();
        expect(component.superHeroForm.touched).toBeTruthy();
      });

      it('should add new super hero when data is valid', () => {
        spyOn(toastService, 'success');
        superHeroServiceSpy.add.and.returnValue(of({}));
        component.superHeroForm.patchValue(newSuperHero);
        fixture.detectChanges();
        component.onSubmit();
        expect(component.superHeroForm.valid).toBeTruthy();
        expect(component.superHero).toBeDefined();
        expect(superHeroServiceSpy.add).toHaveBeenCalled();
        expect(toastService.success).toHaveBeenCalled();
      });

      it('should not add new super hero when error occured', () => {
        superHeroServiceSpy.add.and.returnValue(throwError('fail to save'));
        component.superHeroForm.patchValue(newSuperHero);
        fixture.detectChanges();
        component.onSubmit();
        expect(component.superHeroForm.valid).toBeTruthy();
        expect(component.superHero).toBeDefined();
        expect(superHeroServiceSpy.add).toHaveBeenCalled();
      });
    });
  });
});
