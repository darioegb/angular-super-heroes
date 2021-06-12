import { Injectable } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/storage';
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
    return this.getEnumKeys(type).map((key) => {
      return { key, value: type[key] };
    });
  }

  uploadFile(file: File, fileName: string): AngularFireUploadTask {
    return this.storage.upload(`${this.pictureBasePath}/${fileName}`, file);
  }

  fileRef(fileName: string): AngularFireStorageReference {
    return this.storage.ref(`${this.pictureBasePath}/${fileName}`);
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
      reader.onload = () => observer.next(reader.result);
    });
  }
}
