import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuperHero } from './super-hero.model';
import { GenericService } from '@core/services/generic.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class SuperHeroService extends GenericService<SuperHero> {
  constructor(
    http: HttpClient,
    toastr: ToastrService,
    translateService: TranslateService
  ) {
    super(http, toastr, translateService);
  }

  getResourceUrl(): string {
    return 'superHeroes';
  }
}
