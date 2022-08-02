import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { ActiveToast, ToastrModule, ToastrService } from 'ngx-toastr';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import {
  AngularFireStorage,
  AngularFireUploadTask,
  AngularFireStorageReference,
} from '@angular/fire/compat/storage';

import { SharedModule } from '@shared/shared.module';
import { fileSizeValidator } from '@shared/directives';

@Component({
  template: ` <form [formGroup]="form">
    <app-form-img-upload
      [formControl]="form.controls.picture"
      [isUploading]="isUploading"
      [(picture)]="picture"
      (fileUploaded)="onFileUploaded()"
    ></app-form-img-upload>
  </form>`,
})
class TestHostComponent implements OnInit {
  form: UntypedFormGroup;
  picture: string;
  isUploading = false;

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      picture: [null, fileSizeValidator],
    });
  }
  onFileUploaded(): void {
    this.isUploading = false;
  }
}

describe('FileSizeValidatorDirective', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  const file = new File(['foo'], 'foo.png', {
    type: 'image/png',
  });
  Object.defineProperty(file, 'size', { value: 1024 * 1024 + 200 });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        TranslateTestingModule.withTranslations(
          'es',
          require('src/assets/i18n/es.json'),
        ),
        ToastrModule.forRoot(),
        SharedModule,
      ],
      providers: [
        UntypedFormBuilder,
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
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set fileSize error when file is bigger than 20mb', () => {
    const formControl = component.form.get('picture');
    formControl.setValue(file);
    formControl.markAsTouched();
    expect(formControl.invalid).toBeTruthy();
  });
});
