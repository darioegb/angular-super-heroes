import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

export function fileSizeValidator(
  control: AbstractControl,
): ValidationErrors | null {
  return control.value?.size >= 200000 ? { fileSize: true } : null;
}

@Directive({
  selector: '[appFileSizeValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: FileSizeValidatorDirective,
      multi: true,
    },
  ],
})
export class FileSizeValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return fileSizeValidator(control);
  }
}
