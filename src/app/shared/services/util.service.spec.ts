import { TestBed } from '@angular/core/testing';

import { UtilService } from './util.service';

describe('UtilService', () => {
  enum testEnum {
    A = 1,
    B = 2,
    C = 3,
  }
  let service: UtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilService);
  });

  it('should convert enum to keyValueArray', () => {
    expect(service.convertEnumToKeyValueArray(testEnum)).toBeInstanceOf(
      Array
    );
  });
});
