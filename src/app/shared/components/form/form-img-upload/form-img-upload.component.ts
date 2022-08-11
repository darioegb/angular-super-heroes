import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Self,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { AngularFireStorageReference } from '@angular/fire/compat/storage';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

import { Observable, take, takeLast } from 'rxjs';

import { IMG_SRC } from '@shared/globals';
import { UtilService } from '@shared/services';

@Component({
  selector: 'app-form-img-upload',
  templateUrl: './form-img-upload.component.html',
  styleUrls: ['./form-img-upload.component.scss'],
})
export class FormImgUploadComponent implements OnInit, ControlValueAccessor {
  formControl: FormControl;
  disabled = false;
  noImageSrc: string;
  uploadProgress$: Observable<number>;
  previewPicture$: Observable<string | ArrayBuffer>;
  @Input() picture: string;
  @Output() pictureChange = new EventEmitter<string>();
  @Output() fileUploaded = new EventEmitter<void>();
  onChange = (_: string): void => {};
  onTouch = (): void => {};
  private _isUploading: boolean;

  @Input()
  set isUploading(value: boolean) {
    this._isUploading = value;
    value && this.upload();
  }
  get isUploading(): boolean {
    return this._isUploading;
  }

  constructor(
    @Self() private ngControl: NgControl,
    private translateService: TranslateService,
    private toastr: ToastrService,
    private utilService: UtilService,
  ) {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    this.formControl = this.ngControl
      ? (this.ngControl.control as FormControl)
      : new FormControl();
    this.noImageSrc = `${IMG_SRC}/no-image.png`;
  }

  writeValue(obj: string): void {
    this.onChange(obj);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  pictureChanged(): void {
    const { value: file } = this.formControl;
    this.previewPicture$ = this.utilService.fileToBase64String(file);
    this.picture = null;
    this.pictureChange.emit(this.picture);
  }

  upload(): void {
    const fileName = this.utilService.fileName();
    const filePath = this.utilService.filePath(fileName);
    const fileRef = this.utilService.fileRef(filePath);
    const task = this.utilService.uploadFile(filePath, this.formControl.value);
    this.uploadProgress$ = task.percentageChanges();
    task
      .snapshotChanges()
      .pipe(takeLast(1))
      .subscribe({
        complete: () => this.handleFileUpload(fileRef),
        error: () =>
          this.toastr.error(
            this.translateService.instant('globals.toasts.imageError'),
          ),
      });
  }

  private handleFileUpload(fileRef: AngularFireStorageReference): void {
    fileRef
      .getDownloadURL()
      .pipe(take(1))
      .subscribe((url) => {
        this.onChange(url);
        this.fileUploaded.emit();
      });
  }
}
