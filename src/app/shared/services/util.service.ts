import { Injectable } from '@angular/core';
// import {
//   Storage,
//   UploadTask,
//   StorageReference,
//   ref,
//   uploadBytesResumable,
// } from '@angular/fire/storage';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';

import { Option } from '@shared/models/option.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private storage: AngularFireStorage) {}

  private pictureBasePath = 'pictures';

  /**
   * Get enum keys from enum object
   * @param type enum
   */
  getEnumKeys(type: unknown): string[] {
    return Object.keys(type).filter((key) => !Number(key));
  }

  /**
   * Convert enum Object to array from key, value par.
   * @param type enum
   * @example [ { key: 'A', value: 1 }, { key: 'B', value: 2 } ]
   */
  convertEnumToKeyValueArray(type: unknown): Option[] {
    return this.getEnumKeys(type).map((key) => ({ key, value: type[key] }));
  }

  uploadFile(path: string, file: File): AngularFireUploadTask {
    return this.storage.upload(path, file);
  }

  fileRef(path: string): AngularFireStorageReference {
    return this.storage.ref(path);
  }

  filePath(fileName: string): string {
    return `${this.pictureBasePath}/${fileName}`;
  }

  fileName(): string {
    return `picture-${Date.now()}`;
  }

  /**
   * Convert file to base64 string.
   * @param file File
   * @returns Observable<string | ArrayBuffer>
   */
  fileToBase64String(file: File): Observable<string | ArrayBuffer> {
    const reader = new FileReader();
    return new Observable<string | ArrayBuffer>((observer) => {
      reader.readAsDataURL(file);
      reader.onload = (): void => observer.next(reader.result);
    });
  }

  /**
   * Get object property value by path
   * @param object T
   * @param path string. Ex: 'address.name'
   */
  getObjectProperty<T>(object: T, path: string): unknown {
    if (path === undefined || path === null) {
      return object;
    }
    const parts = path.split('.');
    return parts.reduce((obj, key) => obj?.[key], object);
  }

  /**
   * Replace string variable with param value
   * @param source string
   * @param param string
   * @param regexp string. Ex. {var}
   * @returns string
   */
  replaceStringVariable(
    source: string,
    param: string,
    regexp?: RegExp,
  ): string {
    const regexpFinal = regexp ? regexp : /\{\{[a-zA-Z]+\}\}/;
    return source.replace(regexpFinal, param);
  }
}
