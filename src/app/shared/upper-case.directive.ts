import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUpperCase]',
})
export class UpperCaseDirective {
  constructor(private el: ElementRef, private ngControl: NgControl) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: Event) {
    this.toUpperCase(event);
  }

  @HostListener('blur', ['$event'])
  onBlur(event: Event) {
    this.toUpperCase(event);
  }

  @HostListener('change', ['$event'])
  onChange(event: Event) {
    this.toUpperCase(event);
  }

  private toUpperCase(event: Event) {
    let newVal: string = (event.target as HTMLInputElement).value.toUpperCase();
    this.el.nativeElement.value = newVal;
    this.ngControl.control.patchValue(newVal);
    event.stopPropagation();
  }
}
