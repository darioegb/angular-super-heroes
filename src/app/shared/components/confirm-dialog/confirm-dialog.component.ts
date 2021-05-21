import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../models/dialog.model';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h1 mat-dialog-title>{{ data.title }}</h1>
    <div mat-dialog-content *ngIf="data.body">
      <p>{{ data.body }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button color="primary" [mat-dialog-close]="true" cdkFocusInitial>
        {{ 'globals.buttons.confirm' | translate }}
      </button>
      <button mat-button mat-dialog-close>
        {{ 'globals.buttons.cancel' | translate }}
      </button>
    </div>
  `,
  styles: [],
})
export class ConfirmDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
}
