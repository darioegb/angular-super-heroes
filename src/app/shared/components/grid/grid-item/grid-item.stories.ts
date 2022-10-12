import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { GridItemComponent } from './grid-item.component';

export default {
  title: 'Components/Grid/GridItem',
  component: GridItemComponent,
  argTypes: {
    row: {
      description: 'Row value',
      type: {
        required: true,
      } as unknown,
    },
    column: {
      description: 'Column value',
      type: {
        required: true,
      } as unknown,
    },
    noImageSrc: {
      table: {
        disable: true,
      },
    },
    ngOnInit: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [NoopAnimationsModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: 'GridItem is row grid',
      },
      source: {
        code: `
        <app-grid-item [row]="row" [column]="column"></app-grid-item>
        `,
        language: 'html',
      },
    },
  },
} as Meta;

const Template: Story<GridItemComponent<unknown>> = (
  args: GridItemComponent<unknown>,
) => ({
  props: args,
});

export const Default = Template.bind({});

Default.args = {
  row: { id: 1, name: 'Test' },
  column: { headerDef: 'name', cellDef: 'Name' },
};

export const RowImg = Template.bind({});
RowImg.args = {
  row: {
    id: 1,
    picture: 'https://webkit.org/demos/srcset/image-src.png',
  },
  column: { headerDef: 'picture', cellDef: 'Picture', isImg: true },
};

export const RowImgEmpty = Template.bind({});
RowImgEmpty.args = {
  row: {
    id: 1,
    picture: null,
  },
  column: { headerDef: 'picture', cellDef: 'Picture', isImg: true },
};

export const RowFormat = Template.bind({});
RowFormat.args = {
  row: { id: 1, amount: 10 },
  column: {
    headerDef: 'amount',
    cellDef: 'Amount',
    format: (value: number): string => `${value}$`,
  },
};
