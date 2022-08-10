import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ReactiveFormsModule, FormControl, NgControl } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ActiveToast, ToastrModule, ToastrService } from 'ngx-toastr';
import {
  AngularFireStorage,
  AngularFireUploadTask,
  AngularFireStorageReference,
} from '@angular/fire/compat/storage';

import { FormImgUploadComponent } from './form-img-upload.component';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { UtilService } from '@root/app/shared/services';

describe('FormImgUploadComponent', () => {
  let component: FormImgUploadComponent;
  let fixture: ComponentFixture<FormImgUploadComponent>;
  let utilService: UtilService;
  const file = new File(['foo'], 'foo.png', {
    type: 'image/png',
  });

  beforeEach(async () => {
    const NG_CONTROL_PROVIDER = {
      provide: NgControl,
      useClass: class extends NgControl {
        control = new FormControl();
        viewToModelUpdate(): void {}
      },
    };
    await TestBed.configureTestingModule({
      declarations: [FormImgUploadComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatInputModule,
        NgxMatFileInputModule,
        MatProgressBarModule,
        MatCardModule,
        TranslateTestingModule.withTranslations(
          'es',
          require('src/assets/i18n/es.json'),
        ),
        ToastrModule.forRoot(),
      ],
      providers: [
        {
          provide: ToastrService,
          useValue: {
            error: (): ActiveToast<unknown> => null,
          },
        },
        {
          provide: AngularFireStorage,
          useValue: {
            upload: (..._arg: never): AngularFireUploadTask => {
              return {
                percentageChanges: () => of(0),
                snapshotChanges: () => of({}),
              } as never;
            },
            ref: (_path: string): AngularFireStorageReference => null,
          },
        },
      ],
    })
      .overrideComponent(FormImgUploadComponent, {
        add: { providers: [NG_CONTROL_PROVIDER] },
      })
      .compileComponents();
    utilService = TestBed.inject(UtilService);
    fixture = TestBed.createComponent(FormImgUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit pictureChange event when picture is changed', () => {
    spyOn(component.pictureChange, 'emit');
    component.formControl.setValue(file);
    component.pictureChanged();
    expect(component.pictureChange.emit).toHaveBeenCalled();
  });

  it('should upload file when isUploading flag is setting to true', () => {
    spyOn(utilService, 'fileRef').and.returnValue({
      getDownloadURL: () => of('url image'),
    } as never);
    spyOn(component.fileUploaded, 'emit');
    component.isUploading = true;
    component.formControl.setValue(file);
    expect(utilService.fileRef).toHaveBeenCalled();
    expect(component.fileUploaded.emit).toHaveBeenCalled();
  });
});
