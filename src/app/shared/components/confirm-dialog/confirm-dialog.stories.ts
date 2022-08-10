import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { Component, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ConfirmDialogComponent } from './confirm-dialog.component';
import { StorybookTranslateModule } from '@root/app/storybook-translate/storybook-translate.module';
import { userEvent, within } from '@storybook/testing-library';

@Component({
  selector: 'app-launcher', // <--- 1. add selector
  template: `
    <button mat-raised-button color="primary" (click)="launch()">Launch</button>
  `,
})
class LaunchDialogComponent {
  @Input() title: string;
  @Input() body: string;
  constructor(private _dialog: MatDialog) {}

  launch(): void {
    this._dialog.open(ConfirmDialogComponent, {
      data: {
        title: this.title,
        body: this.body,
      },
    });
  }
}

export default {
  title: 'Components/ConfirmDialog',
  component: LaunchDialogComponent,
  argTypes: {
    title: {
      description: 'Dialog  title',
      type: {
        required: true,
      } as unknown,
    },
    body: {
      description: 'Optional body text',
    },
    launch: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    moduleMetadata({
      declarations: [ConfirmDialogComponent],
      imports: [
        BrowserAnimationsModule,
        StorybookTranslateModule,
        MatDialogModule,
        MatButtonModule,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'ConfirmDialog is a confirmation modal using angular material',
      },
      source: {
        code: `
        // Import MatDialog in constructor and used it in the component method
        this._dialog.open(ConfirmDialogComponent, { data: { title: 'Some title', body:
        'Some body text', }, });`,
        language: 'javascript',
      },
    },
  },
} as Meta;

const Template: Story<LaunchDialogComponent> = (
  args: LaunchDialogComponent,
) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  title: 'Title',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};
Default.play = async ({ canvasElement }): Promise<void> => {
  const canvas = within(canvasElement);
  const launchButton = await canvas.getByRole('button', { name: /Launch/i });
  await userEvent.click(launchButton);
};
