import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  convertToParamMap,
} from '@angular/router';

import { SuperHeroResolver } from './super-hero.resolver';
import { SuperHeroService } from './super-hero.service';
import { of } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { RouterStub } from '@testing/router-stub';

describe('HeroResolver', () => {
  let resolver: SuperHeroResolver;
  let route: ActivatedRouteSnapshot;
  let router: RouterStub;
  const heroId = '1';
  const superHeroServiceSpy: jasmine.SpyObj<SuperHeroService> =
    jasmine.createSpyObj('SuperHeroService', ['get']);
  const activatedRouteStub = {
    paramMap: convertToParamMap({ superHeroId: '1' }),
  };

  beforeEach(() => {
    router = new RouterStub();
  });

  describe('with complete state', () => {
    describe('with state data object', () => {
      beforeEach(() =>
        router.setState({
          data: {
            superHero: { id: '1' },
          },
        })
      );

      beforeEach(
        waitForAsync(() => {
          TestBed.configureTestingModule({
            imports: [
              HttpClientTestingModule,
              TranslateTestingModule.withTranslations('es', {}),
              ToastrModule.forRoot(),
            ],
            providers: [
              {
                provide: Router,
                useValue: router,
              },
            ],
          });
          resolver = TestBed.inject(SuperHeroResolver);
        })
      );

      it('should resolve superHero', () => {
        resolver.resolve(route, null).subscribe((resolved) => {
          const { id } = resolved;
          expect(id).toEqual(heroId);
        });
      });
    });
  });

  describe('without complete state', () => {
    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [
            {
              provide: Router,
              useValue: router,
            },
            {
              provide: ActivatedRouteSnapshot,
              useValue: activatedRouteStub,
            },
            { provide: SuperHeroService, useValue: superHeroServiceSpy },
          ],
        });
        resolver = TestBed.inject(SuperHeroResolver);
        route = TestBed.inject(ActivatedRouteSnapshot);
      })
    );
    describe('without superHero data', () => {
      beforeEach(() => {
        router.setState({
          data: null,
        });
      });

      it('should resolve superHero', () => {
        superHeroServiceSpy.get.and.returnValue(of({ id: heroId } as never));
        resolver.resolve(route, null).subscribe((resolved) => {
          const { id } = resolved;
          expect(id).toEqual(heroId);
        });
      });
    });

    describe('without state data object', () => {
      it('should resolve superHero', () => {
        superHeroServiceSpy.get.and.returnValue(of({ id: heroId } as never));
        resolver.resolve(route, null).subscribe((resolved) => {
          const { id } = resolved;
          expect(id).toBeDefined();
        });
      });
    });
  });
});
