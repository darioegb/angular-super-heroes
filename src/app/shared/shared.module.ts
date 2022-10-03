import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { TranslateModule } from '@ngx-translate/core';
import { NgxErrorMessageModule } from 'ngx-error-message';

import { UpperCaseDirective, FileSizeValidatorDirective } from './directives';
import { DropdownTranslatePipe } from './pipes';
import {
  AddButtonComponent,
  ConfirmDialogComponent,
  EmptyGridComponent,
  FormCardActionsComponent,
  FormCardComponent,
  FormImgUploadComponent,
  GridActionsComponent,
  GridFilterComponent,
  GridItemComponent,
  NavbarComponent,
} from './components';

@NgModule({
  declarations: [
    UpperCaseDirective,
    DropdownTranslatePipe,
    ConfirmDialogComponent,
    NavbarComponent,
    FormCardComponent,
    FormCardActionsComponent,
    FormImgUploadComponent,
    EmptyGridComponent,
    GridActionsComponent,
    GridItemComponent,
    GridFilterComponent,
    AddButtonComponent,
    FileSizeValidatorDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxErrorMessageModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatInputModule,
    NgxMatFileInputModule,
    TranslateModule.forChild(),
  ],
  exports: [
    UpperCaseDirective,
    DropdownTranslatePipe,
    NavbarComponent,
    FormCardComponent,
    FormCardActionsComponent,
    FormImgUploadComponent,
    EmptyGridComponent,
    GridActionsComponent,
    GridItemComponent,
    GridFilterComponent,
    AddButtonComponent,
    TranslateModule,
    MatButtonModule,
  ],
  providers: [DropdownTranslatePipe],
})
export class SharedModule {}
