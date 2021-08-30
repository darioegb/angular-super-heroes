import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderService],
    });
    service = TestBed.inject(LoaderService);
  });

  it('#show should set isLoading to true', (done: DoneFn) => {
    service.show();
    service.isLoading$.subscribe((loading) => {
      expect(loading).toBeTruthy();
      done();
    });
  });

  it('#hide should set isLoading to false', (done: DoneFn) => {
    service.hide();
    service.isLoading$.subscribe((loading) => {
      expect(loading).not.toBeTruthy();
      done();
    });
  });
});
