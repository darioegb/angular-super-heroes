import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { NgxErrorMessageModule } from 'ngx-error-message';
import { MatInputModule } from '@angular/material/input';

import { StorybookTranslateModule } from '@root/app/storybook-translate/storybook-translate.module';
import { UpperCaseDirective } from './upper-case.directive';

@Component({
  selector: 'app-dummy',
  template: `<mat-form-field appearance="fill" class="full-width">
    <mat-label>Name</mat-label>
    <input
      type="text"
      [placeholder]="'ex Peter'"
      [formControl]="control"
      matInput
      ngxErrorMessage
      appUpperCase
    />
  </mat-form-field>`,
})
class DummyComponent {
  control = new FormControl('', Validators.required);
}

export default {
  title: 'directives/UpperCase',
  component: DummyComponent,
  argTypes: {
    myGroup: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    moduleMetadata({
      declarations: [UpperCaseDirective],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        StorybookTranslateModule,
        MatInputModule,
        NgxErrorMessageModule,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'UpperCase directive is directive for uppercase input values',
      },
      source: {
        code: `
        <!-- Add UpperCase directive to input tag -->
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Name</mat-label>
          <input
          type="text"
          placeholder="ex Peter"
          formControlName="name"
          matInput
          ngxErrorMessage
          appUpperCase
        />
        `,
        language: 'html',
      },
    },
  },
} as Meta;

const Template: Story<DummyComponent> = (args: DummyComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
