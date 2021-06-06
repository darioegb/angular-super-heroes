import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUpperCase]',
})
export class UpperCaseDirective {
  constructor(private el: ElementRef, private ngControl: NgControl) {}

  @HostListener('keyup', ['$event'])
  onKeyUp(event: Event): void {
    this.toUpperCase(event);
  }

  @HostListener('blur', ['$event'])
  onBlur(event: Event): void {
    this.toUpperCase(event);
  }

  private toUpperCase(event: Event): void {
    const newVal: string = (
      event.target as HTMLInputElement
    ).value.toUpperCase();
    this.el.nativeElement.value = newVal;
    this.ngControl.control.patchValue(newVal);
    event.stopPropagation();
  }
}
