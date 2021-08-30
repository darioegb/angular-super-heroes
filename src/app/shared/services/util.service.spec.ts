import { TestBed } from '@angular/core/testing';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { UtilService } from './util.service';

describe('UtilService', () => {
  enum testEnum {
    A = 1,
    B = 2,
    C = 3,
  }
  let service: UtilService;
  let fireStorageStub: Partial<AngularFireStorage>;

  beforeEach(() => {
    fireStorageStub = {
      upload: (..._arg): AngularFireUploadTask => null,
      ref: (_path: string): AngularFireStorageReference => null,
    };
  });

  describe('with module setup', () => {
    let fireStorageService: AngularFireStorage;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: AngularFireStorage,
            useValue: fireStorageStub,
          },
        ],
      });
      fireStorageService = TestBed.inject(AngularFireStorage);
      service = TestBed.inject(UtilService);
    });

    it('should convert enum to keyValueArray', () => {
      expect(service.convertEnumToKeyValueArray(testEnum)).toBeInstanceOf(
        Array,
      );
    });

    it('should upload file when uploadFile method is call', () => {
      spyOn(fireStorageService, 'upload');
      service.uploadFile({} as never, 'test');
      expect(fireStorageService.upload).toHaveBeenCalled();
    });

    it('should get file ref when fileRef method is call', () => {
      spyOn(fireStorageService, 'ref');
      service.fileRef('test');
      expect(fireStorageService.ref).toHaveBeenCalled();
    });

    it('should return an string when fileName method is call', () => {
      expect(service.fileName()).toBeDefined();
    });

    it('should return an observable string when fileToBase64String method is call', (done: DoneFn) => {
      const file = new File(['foo'], 'foo.png', {
        type: 'image/png',
      });
      service.fileToBase64String(file).subscribe((result) => {
        expect(result).toBeDefined();
        done();
      });
    });

    it('should get property value from object path', () => {
      const user = {
        userName: 'test',
        address: {
          street: '9 de julio',
          number: 200,
        },
      };
      expect(service.getObjectProperty(user, 'address.street')).toBe(
        user.address.street,
      );
    });
  });
});
