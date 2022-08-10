import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { StorybookTranslateModule } from '@root/app/storybook-translate/storybook-translate.module';
import { EmptyGridComponent } from './empty-grid.component';

export default {
  title: 'Components/Grid/EmptyGrid',
  component: EmptyGridComponent,
  argTypes: {
    filter: {
      control: 'text',
      description: 'Input filter value',
      type: {
        required: true,
      } as unknown,
    },
    _filter: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        NoopAnimationsModule,
        StorybookTranslateModule,
        MatInputModule,
        MatIconModule,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: 'EmptyGrid is text with empty grid message',
      },
      source: {
        code: `
        <app-empty-grid [filter]="filter"></app-empty-grid>`,
        language: 'html',
      },
    },
  },
} as Meta;

const Template: Story<EmptyGridComponent> = (args: EmptyGridComponent) => ({
  props: args,
});

export const Default = Template.bind({});

Default.args = {
  filter: '',
};
