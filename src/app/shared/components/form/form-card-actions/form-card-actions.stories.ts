import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { StorybookTranslateModule } from '@root/app/storybook-translate/storybook-translate.module';
import { FormCardActionsComponent } from './form-card-actions.component';

export default {
  title: 'Components/Form/FormCardActions',
  component: FormCardActionsComponent,
  argTypes: {
    isEditOrView: {
      description:
        'Flag to disabled reset button. Is true when is on edit or view mode',
      type: {
        required: true,
      } as unknown,
    },
    view: {
      description:
        'Flag to disabled submit button. Is true when is on view mode',
      type: {
        required: true,
      } as unknown,
    },
    goBack: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [StorybookTranslateModule, MatCardModule, MatButtonModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          // eslint-disable-next-line max-len
          'FormCardActions is a form card actions using angular material that contain form actions buttons. Must used with FormCard component',
      },
      source: {
        code: `
        <app-form-card-actions
        actions
        [isEditOrView]="isEditOrView"
        [view]="view">
        </app-form-card-actions>`,
        language: 'html',
      },
    },
  },
} as Meta;

const Template: Story<FormCardActionsComponent> = (
  args: FormCardActionsComponent,
) => ({
  props: args,
  template: `
  <mat-card>
    <app-form-card-actions
    actions
    [isEditOrView]="isEditOrView"
    [view]="view">
    </app-form-card-actions>
</mat-card>`,
});

export const Default = Template.bind({});
Default.args = {
  isEditOrView: false,
  view: false,
};
