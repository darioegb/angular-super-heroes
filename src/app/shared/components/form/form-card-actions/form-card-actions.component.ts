import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-card-actions',
  templateUrl: './form-card-actions.component.html',
  styleUrls: ['./form-card-actions.component.scss'],
})
export class FormCardActionsComponent {
  @Input() isEditOrView: boolean;
  @Input() view: boolean;

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
