import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpperCaseDirective } from './directives/upper-case.directive';
import { DropdownTranslatePipe } from './pipes/dropdown-translate.pipe';

@NgModule({
  declarations: [UpperCaseDirective, DropdownTranslatePipe],
  imports: [CommonModule],
  exports: [UpperCaseDirective, DropdownTranslatePipe]
})
export class SharedModule {}
