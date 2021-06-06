import { Injectable } from '@angular/core';
import { Option } from '@shared/models/option.model';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
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
}
