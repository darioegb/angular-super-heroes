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
import { DropdownTranslatePipe } from './pipes/dropdown-translate.pipe';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormCardComponent } from './components/form/form-card/form-card.component';
import { FormCardActionsComponent } from './components/form/form-card-actions/form-card-actions.component';
import { FormImgUploadComponent } from './components/form/form-img-upload/form-img-upload.component';
import { EmptyGridComponent } from './components/grid/empty-grid/empty-grid.component';
import { GridActionsComponent } from './components/grid/grid-actions/grid-actions.component';
import { GridItemComponent } from './components/grid/grid-item/grid-item.component';
import { GridFilterComponent } from './components/grid/grid-filter/grid-filter.component';
import { AddButtonComponent } from './components/add-button/add-button.component';

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
