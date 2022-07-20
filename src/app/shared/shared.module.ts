import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpperCaseDirective } from './directives/upper-case.directive';
import { DropdownTranslatePipe } from './pipes/dropdown-translate.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    UpperCaseDirective,
    DropdownTranslatePipe,
    ConfirmDialogComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    TranslateModule.forChild(),
  ],
  exports: [
    UpperCaseDirective,
    DropdownTranslatePipe,
    NavbarComponent,
    TranslateModule,
    MatButtonModule,
  ],
})
export class SharedModule {}
