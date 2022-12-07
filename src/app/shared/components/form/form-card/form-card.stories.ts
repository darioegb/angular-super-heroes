import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NgxErrorMessageModule } from 'ngx-error-message';

import { StorybookTranslateModule } from '@app/storybook-translate/storybook-translate.module';
import { FormCardComponent } from './form-card.component';
import { FormCardActionsComponent } from '@shared/components';

export default {
  title: 'Components/Form/FormCard',
  component: FormCardComponent,
  argTypes: {
    title: {
      description: 'Card  title',
      type: {
        required: true,
      } as unknown,
    },
  },
  decorators: [
    moduleMetadata({
      declarations: [FormCardActionsComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        StorybookTranslateModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        NgxErrorMessageModule,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `FormCard is a card form container using angular material.
          Can project content by default projection and also using actions select for inject FormCardActions component.
        `,
      },
    },
  },
} as Meta;

const Template: Story<FormCardComponent> = (args: FormCardComponent) => ({
  props: {
    ...args,
    myGroup: new FormGroup({ name: new FormControl('', Validators.required) }),
  },
  template: `
  <form [formGroup]="myGroup">
    <app-form-card [title]="title">
      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Name</mat-label>
        <input
        type="text"
        [placeholder]="'ex Peter'"
        formControlName="name"
        matInput
        ngxErrorMessage
        />
      </mat-form-field>
      <!-- Others form fields -->
      <app-form-card-actions
        actions
        [isEditOrView]="false"
        [view]="false"
      ></app-form-card-actions>
    </app-form-card>
  </form>
  `,
});

export const Default = Template.bind({});
Default.args = {
  title: 'Title',
};
