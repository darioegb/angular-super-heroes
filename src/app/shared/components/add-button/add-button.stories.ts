import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AddButtonComponent } from './add-button.component';

export default {
  title: 'Components/AddButton',
  component: AddButtonComponent,
  argTypes: {
    addClick: {
      description: 'Click handler',
      control: false,
      type: {
        required: true,
      } as unknown,
    },
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [MatButtonModule, MatIconModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: 'AddButton is a plus icon button using angular material',
      },
    },
  },
} as Meta;

const Template: Story<AddButtonComponent> = (args: AddButtonComponent) => ({
  props: args,
});

export const Default = Template.bind({});
