import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { GridFilterComponent } from './grid-filter.component';

export default {
  title: 'Components/Grid/GridFilter',
  component: GridFilterComponent,
  argTypes: {
    filterInput: {
      description: 'Input filter texts',
      type: {
        required: true,
      } as unknown,
    },
    filterChange: {
      description: 'Emit input value when is changed or reseted',
      control: false,
    },
    input: {
      table: {
        disable: true,
      },
    },
    unsubscribe$: {
      table: {
        disable: true,
      },
    },
    ngAfterViewInit: {
      table: {
        disable: true,
      },
    },
    onReset: {
      table: {
        disable: true,
      },
    },
    ngOnDestroy: {
      table: {
        disable: true,
      },
    },
    onKeyUp: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [MatInputModule, MatButtonModule, MatIconModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: 'GridFilter is input search field using angular material',
      },
    },
  },
} as Meta;

const Template: Story<GridFilterComponent> = (args: GridFilterComponent) => ({
  props: args,
});

export const Default = Template.bind({});

Default.args = {
  filterInput: { label: 'Search', placeholder: 'Ex. test' },
};
