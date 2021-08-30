import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { idKey } from '@root/app/constants';
import { Observable, of } from 'rxjs';
import { SuperHero } from './super-hero.model';
import { SuperHeroService } from './super-hero.service';

@Injectable()
export class SuperHeroResolver implements Resolve<SuperHero> {
  constructor(
    private superHeroService: SuperHeroService,
    private router: Router,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): Observable<SuperHero> {
    const superHero =
      this.router.getCurrentNavigation().extras.state?.data?.superHero;
    return superHero
      ? of(superHero)
      : this.superHeroService.get(route.paramMap.get(idKey));
  }
}
