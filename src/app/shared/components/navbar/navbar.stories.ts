import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { StorybookTranslateModule } from '@app/storybook-translate/storybook-translate.module';
import { NavbarComponent } from './navbar.component';

export default {
  title: 'Components/Navbar',
  component: NavbarComponent,
  argTypes: {
    langOptions: {
      table: {
        disable: true,
      },
    },
    selectedLang: {
      table: {
        disable: true,
      },
    },
    networkStatus: {
      table: {
        disable: true,
      },
    },
    networkStatus$: {
      table: {
        disable: true,
      },
    },
    ngOnInit: {
      table: {
        disable: true,
      },
    },
    ngOnDestroy: {
      table: {
        disable: true,
      },
    },
    changeLanguaje: {
      table: {
        disable: true,
      },
    },
    checkNetworkStatus: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        NoopAnimationsModule,
        FormsModule,
        StorybookTranslateModule,
        MatToolbarModule,
        MatSelectModule,
        MatIconModule,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Navbar is top navbar using angular material. It display status connection and combobox to change language',
      },
    },
  },
} as Meta;

const Template: Story<NavbarComponent> = (args: NavbarComponent) => ({
  props: args,
});

export const Default = Template.bind({});
