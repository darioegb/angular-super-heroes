import { HttpClientModule } from '@angular/common/http';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxErrorMessageModule } from 'ngx-error-message';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { ToastrModule } from 'ngx-toastr';

import { environment } from '@environments/environment';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

import { StorybookTranslateModule } from '@app/storybook-translate/storybook-translate.module';
import { FormImgUploadComponent } from './form-img-upload.component';
import { fileSizeValidator } from '@shared/directives';

export default {
  title: 'Components/Form/FormImgUpload',
  component: FormImgUploadComponent,
  argTypes: {
    isUploading: {
      description: 'Flag to indicate when start to upload picture',
      control: false,
      type: {
        required: true,
      } as unknown,
    },
    picture: {
      description: 'Picture is image url',
      type: {
        required: true,
      } as unknown,
    },
    _isUploading: {
      table: {
        disable: true,
      },
    },
    pictureChange: {
      table: {
        disable: true,
      },
    },
    fileUploaded: {
      description: 'Runs when image upload finished',
      control: false,
    },
    formControl: {
      table: {
        disable: true,
      },
    },
    disabled: {
      table: {
        disable: true,
      },
    },
    noImageSrc: {
      table: {
        disable: true,
      },
    },
    uploadProgress$: {
      table: {
        disable: true,
      },
    },
    previewPicture$: {
      table: {
        disable: true,
      },
    },
    pictureChanged: {
      table: {
        disable: true,
      },
    },
    upload: {
      table: {
        disable: true,
      },
    },
    onChange: {
      table: {
        disable: true,
      },
    },
    onTouch: {
      table: {
        disable: true,
      },
    },
    handleFileUpload: {
      table: {
        disable: true,
      },
    },
    ngOnInit: {
      table: {
        disable: true,
      },
    },
    registerOnChange: {
      table: {
        disable: true,
      },
    },
    registerOnTouched: {
      table: {
        disable: true,
      },
    },
    setDisabledState: {
      table: {
        disable: true,
      },
    },
    writeValue: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        NoopAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        StorybookTranslateModule,
        MatCardModule,
        MatProgressBarModule,
        MatIconModule,
        MatInputModule,
        NgxMatFileInputModule,
        NgxErrorMessageModule,
        AngularFireStorageModule,
        AngularFireModule.initializeApp(environment.firebase),
        ToastrModule.forRoot(),
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'FormImgUpload is a file image uploader using ngx-mat-file input and angular material',
      },
      source: {
        code: `
        <app-form-img-upload
        [formControl]="picture"
        [isUploading]="isUploading"
        [(picture)]="picture"
        (fileUploaded)="onFileUploaded()"
        ></app-form-img-upload>`,
        language: 'html',
      },
    },
  },
} as Meta;

const Template: Story<FormImgUploadComponent> = (
  args: FormImgUploadComponent,
) => ({
  props: {
    ...args,
    myGroup: new FormGroup({
      picture: new FormControl(null, fileSizeValidator),
    }),
  },
  template: `
  <form [formGroup]="myGroup">
    <app-form-img-upload
      [formControl]="myGroup.controls.picture"
      [isUploading]="isUploading"
      [(picture)]="picture"
      (fileUploaded)="onFileUploaded()"
    ></app-form-img-upload>
  </form>
  `,
});

export const Default = Template.bind({});
Default.args = {
  isUploading: false,
  picture: '',
};
