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

  private toUpperCase({ target }): void {
    const newVal: string = (target as HTMLInputElement).value.toUpperCase();
    this.el.nativeElement.value = newVal;
    this.ngControl.control.patchValue(newVal);
  }
}
