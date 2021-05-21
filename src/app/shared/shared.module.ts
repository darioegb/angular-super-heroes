import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpperCaseDirective } from './directives/upper-case.directive';
import { DropdownTranslatePipe } from './pipes/dropdown-translate.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    UpperCaseDirective,
    DropdownTranslatePipe,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    TranslateModule.forChild(),
  ],
  exports: [UpperCaseDirective, DropdownTranslatePipe],
})
export class SharedModule {}
