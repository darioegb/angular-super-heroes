import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ToastrModule } from 'ngx-toastr';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { SuperHeroService } from './super-hero.service';
import { SuperHero } from './super-hero.model';
import { PageConfig } from '@shared/models';

describe('SuperHeroService', () => {
  let httpTestingController: HttpTestingController;
  let service: SuperHeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        TranslateTestingModule.withTranslations(
          'en',
          require('src/assets/i18n/en.json'),
        ),
        ToastrModule.forRoot(),
      ],
      providers: [SuperHeroService],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SuperHeroService);
  });

  afterEach(() => httpTestingController.verify());

  describe('#getPage', () => {
    let expectedHeroes: SuperHero[];
    let pageConfing: PageConfig;
    let superHeroeUrl: string;

    beforeEach(() => {
      expectedHeroes = [
        { id: '1', name: 'A' },
        { id: '2', name: 'B' },
      ] as SuperHero[];
      pageConfing = new PageConfig();
      superHeroeUrl = getSuperHeroUrl(pageConfing);
    });

    function getSuperHeroUrl(conf: PageConfig): string {
      const { page, limit, sort, order } = conf;
      let url = `${service.baseUrl}?_page=${page}&_limit=${limit}&_sort=${
        sort ?? 'id'
      }&_order=${order}`;
      if (conf.filter) {
        url = url.concat(`&name_like=${conf.filter}`);
      }
      return url;
    }

    it('should return expected superheroes (called once)', () => {
      service.getPage(pageConfing).subscribe({
        next: (page) =>
          expect(page.items).toEqual(
            expectedHeroes,
            'should return expected superheroes',
          ),
        error: fail,
      });

      const req = httpTestingController.expectOne(superHeroeUrl);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedHeroes);
    });

    it('should return expected superheroes (called once) with sort by name', () => {
      const pageConfigAlt = { ...pageConfing };
      pageConfigAlt.sort = 'name';
      superHeroeUrl = getSuperHeroUrl(pageConfigAlt);
      service.getPage(pageConfigAlt).subscribe({
        next: (page) =>
          expect(page.items[0].name).toEqual(
            expectedHeroes[0].name,
            'should return expected superheroes sorter by name',
          ),
        error: fail,
      });

      const req = httpTestingController.expectOne(superHeroeUrl);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedHeroes);
    });

    it('should return expected superheroes (called once) with filter', () => {
      const pageConfigAlt = { ...pageConfing };
      pageConfigAlt.filter = 'B';
      superHeroeUrl = getSuperHeroUrl(pageConfigAlt);
      service.getPage(pageConfigAlt).subscribe({
        next: (page) =>
          expect(page.items[0].name).toEqual(
            expectedHeroes[1].name,
            'should return expected superheroes filtered',
          ),
        error: fail,
      });

      const req = httpTestingController.expectOne(superHeroeUrl);
      expect(req.request.method).toEqual('GET');

      req.flush([expectedHeroes[1]]);
    });

    it('should turn 404 into an empty heroes result', () => {
      service.getPage(pageConfing).subscribe({
        next: (page) =>
          expect(page.items.length).toEqual(
            0,
            'should return empty heroes array',
          ),
        error: fail,
      });

      const req = httpTestingController.expectOne(superHeroeUrl);
      const msg = 'deliberate 404 error';
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });

    it('should be OK returning no superheroes', () => {
      service.getPage(pageConfing).subscribe({
        next: (page) =>
          expect(page.items.length).toEqual(
            0,
            'should have empty superheroes array',
          ),
        error: fail,
      });

      const req = httpTestingController.expectOne(superHeroeUrl);
      req.flush([]);
    });
  });

  describe('#get', () => {
    let expectedHero: SuperHero;
    let superHeroeUrl: string;
    const superHeroId = '1';

    beforeEach(() => {
      expectedHero = { id: '1', name: 'A' } as SuperHero;
      superHeroeUrl = `${service.baseUrl}/${superHeroId}`;
    });

    it('should return expected superHero (called once)', () => {
      service.get(superHeroId).subscribe({
        next: (hero) =>
          expect(hero).toEqual(
            expectedHero,
            'should return expected superHero',
          ),
        error: fail,
      });

      const req = httpTestingController.expectOne(superHeroeUrl);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedHero);
    });

    it('should turn 404 when no hero found', () => {
      service.get(superHeroId).subscribe({
        error: (err: HttpErrorResponse) =>
          expect(err.status).toEqual(
            404,
            'should return 404 when superHeroe not found',
          ),
      });

      const req = httpTestingController.expectOne(superHeroeUrl);
      const msg = 'deliberate 404 error';
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('#add', () => {
    const newHero = { id: '1', name: 'A' } as SuperHero;
    it('should add a superHeroe and return it', () => {
      service.add(newHero).subscribe({
        next: (data) => expect(data).toEqual(newHero, 'should return the hero'),
        error: fail,
      });

      const req = httpTestingController.expectOne(service.baseUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(newHero);

      const expectedResponse = new HttpResponse({
        status: 201,
        statusText: 'OK',
        body: newHero,
      });
      req.event(expectedResponse);
    });

    it('should turn 400 error into return of the add hero', () => {
      service.add(newHero).subscribe({
        error: (err: HttpErrorResponse) =>
          expect(err.status).toEqual(
            400,
            'should return 400 when superHeroe can not create',
          ),
      });

      const req = httpTestingController.expectOne(service.baseUrl);
      const msg = 'deliberate 400 error';
      req.flush(msg, { status: 400, statusText: 'Malformed Data' });
    });
  });

  describe('#update', () => {
    let superHeroeUrl: string;
    const updateHero = { id: '1', name: 'A' } as SuperHero;

    beforeEach(() => {
      superHeroeUrl = `${service.baseUrl}/${updateHero.id}`;
    });

    it('should update a superHeroe and return it', () => {
      service.update(updateHero).subscribe({
        next: (data) =>
          expect(data).toEqual(updateHero, 'should return the hero'),
        error: fail,
      });

      const req = httpTestingController.expectOne(superHeroeUrl);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updateHero);

      const expectedResponse = new HttpResponse({
        status: 200,
        statusText: 'OK',
        body: updateHero,
      });
      req.event(expectedResponse);
    });

    it('should turn 404 error into return of the update hero', () => {
      service.update(updateHero).subscribe({
        error: (err: HttpErrorResponse) =>
          expect(err.status).toEqual(
            404,
            'should return 404 when superHeroe does not exist',
          ),
      });

      const req = httpTestingController.expectOne(superHeroeUrl);
      const msg = 'deliberate 404 error';
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('#delete', () => {
    let superHeroeUrl: string;
    const superHeroId = '1';

    beforeEach(() => {
      superHeroeUrl = `${service.baseUrl}/${superHeroId}`;
    });

    it('should delete a superHeroe', () => {
      service.delete(superHeroId).subscribe({
        next: (data) => expect(data).toEqual({}, 'should delete the hero'),
        error: fail,
      });

      const req = httpTestingController.expectOne(superHeroeUrl);
      expect(req.request.method).toEqual('DELETE');

      const expectedResponse = new HttpResponse({
        status: 200,
        statusText: 'OK',
        body: {},
      });
      req.event(expectedResponse);
    });

    it('should turn 404 error into return of the delete hero', () => {
      service.delete(superHeroId).subscribe({
        error: (err: HttpErrorResponse) =>
          expect(err.status).toEqual(
            404,
            'should return 404 when superHeroe with provide id does not exist',
          ),
      });

      const req = httpTestingController.expectOne(superHeroeUrl);
      const msg = 'deliberate 404 error';
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });
  });
});
