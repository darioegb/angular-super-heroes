import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { GridActionsComponent } from './grid-actions.component';

export default {
  title: 'Components/Grid/GridActions',
  component: GridActionsComponent,
  argTypes: {
    item: {
      control: 'object',
      description: 'Generic item value',
      type: {
        required: true,
      } as unknown,
    },
    editOrView: {
      description:
        'Emit item on edit action or object with item and view flag on view action',
      control: false,
    },
    delete: {
      description: 'Emit item on delete action',
      control: false,
    },
    handleEditOrView: {
      table: {
        disable: true,
      },
    },
    handleDelete: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [MatButtonModule, MatIconModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'GridActions is button groups that contain row action buttons',
      },
    },
  },
} as Meta;

const Template: Story<GridActionsComponent<unknown>> = (
  args: GridActionsComponent<unknown>,
) => ({
  props: args,
});

export const Default = Template.bind({});

Default.args = {
  item: { id: 1, name: 'test' },
};
