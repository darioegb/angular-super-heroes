import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'dropdownTranslate',
})
export class DropdownTranslatePipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(value: string, key: string): string {
    return this.translateService.instant(`${key}.${value?.toLowerCase()}`);
  }
}
