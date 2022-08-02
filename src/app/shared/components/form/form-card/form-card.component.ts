import { Component } from '@angular/core';

@Component({
  selector: 'app-form-card',
  template: `
    <mat-card class="shipping-card">
      <mat-card-header>
        <mat-card-title>{{
          'superHeroes.detail.title' | translate
        }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <ng-content></ng-content>
      </mat-card-content>
      <ng-content select="[actions]"></ng-content>
    </mat-card>
  `,
  styles: [
    `
      .shipping-card {
        min-width: 120px;
        margin: 20px auto;
      }
    `,
  ],
})
export class FormCardComponent {}
