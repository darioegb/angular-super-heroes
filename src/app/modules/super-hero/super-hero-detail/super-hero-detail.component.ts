import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, Observable } from 'rxjs';
import { map, take, takeUntil, withLatestFrom } from 'rxjs/operators';
import { genresEnum, httpMethodKeys, imgSrc } from '@app/constants';
import { GenericObject, Option } from '@shared/models';
import { UtilService } from '@shared/services';
import { SuperHero, SuperHeroService } from '@modules/super-hero/shared';
import { percentage } from '@angular/fire/storage';
import { getDownloadURL, StorageReference } from 'firebase/storage';
@Component({
  selector: 'app-super-hero-detail',
  templateUrl: './super-hero-detail.component.html',
  styleUrls: ['./super-hero-detail.component.scss'],
})
export class SuperHeroDetailComponent implements OnInit, OnDestroy {
  superHeroForm: UntypedFormGroup;
  genres: Option[] = [];
  superHero: SuperHero;
  view: boolean;
  isEditOrView: boolean;
  picture: string;
  toastTranslations: { add: string; update: string };
  noImageSrc = `${imgSrc}/no-image.png`;
  uploadProgress$: Observable<number>;
  previewPicture$: Observable<string | ArrayBuffer>;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: UntypedFormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private toastr: ToastrService,
    private utilService: UtilService,
    private superHeroService: SuperHeroService,
  ) {}

  ngOnInit(): void {
    this.genres = this.utilService.convertEnumToKeyValueArray(genresEnum);
    this.view = /true/i.test(this.route.snapshot.queryParams?.view);
    this.initForm();
    this.getData();
    this.getTranslations();
  }

  get superHeroControls(): GenericObject<AbstractControl> {
    return this.superHeroForm.controls;
  }

  initForm(): void {
    this.superHeroForm = this.fb.group({
      name: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ]),
      ],
      genre: [null, Validators.required],
      specialty: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(250),
        ]),
      ],
      age: [null, Validators.min(1)],
      height: [null, Validators.min(1)],
      weight: [null, Validators.min(1)],
      picture: [null],
    });
  }

  getData(): void {
    this.route.params
      .pipe(takeUntil(this.unsubscribe$), withLatestFrom(this.route.data))
      .subscribe(([params, data]) => {
        if (params.id) {
          this.isEditOrView = true;
          this.superHero = data.superHero;
          this.view && this.superHeroForm.disable();
          this.picture = this.superHero.picture;
          this.setForm();
        }
      });
  }

  getTranslations(): void {
    this.translateService
      .get('superHeroes.toasts')
      .pipe(take(1))
      .subscribe(
        ({ add: { success: add }, update: { success: update } }) =>
          (this.toastTranslations = { add, update }),
      );
  }

  setForm(): void {
    this.superHeroForm.patchValue({
      name: this.superHero.name,
      genre: this.superHero.genre,
      specialty: this.superHero.specialty,
      age: this.superHero.age,
      height: this.superHero.height,
      weight: this.superHero.weight,
      picture: this.superHero.picture,
    });
  }

  initSuperHero(): void {
    this.superHero = {
      name: '',
      genre: null,
      specialty: '',
    };
  }

  setSuperHero(): void {
    this.superHero = { ...this.superHero, ...this.superHeroForm.value };
  }

  onSubmit(): void {
    if (this.superHeroForm.invalid) {
      this.superHeroForm.markAllAsTouched();
      return;
    }
    const { value: file } = this.superHeroControls.picture;
    if (file && file !== this.picture) {
      this.upload(file);
    } else {
      this.saveOrUpdate();
    }
  }

  async upload(file: File): Promise<void> {
    const fileName = this.utilService.fileName();
    const task = this.utilService.uploadFile(file, fileName);
    this.uploadProgress$ = percentage(task).pipe(
      map(({ progress }) => progress),
    );
    await task;
    this.handleFileUpload(task.snapshot.ref);
  }

  async handleFileUpload(ref: StorageReference): Promise<void> {
    const url = await getDownloadURL(ref);
    this.superHeroControls.picture.setValue(url);
    this.saveOrUpdate();
  }

  goBack(): void {
    this.location.back();
  }

  reset(): void {
    this.superHeroForm.reset();
  }

  onChangePicture(): void {
    const { value: file } = this.superHeroControls.picture;
    this.previewPicture$ = this.utilService.fileToBase64String(file);
    this.picture = null;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private saveOrUpdate(): void {
    const isNew = !this.superHero?.id;
    isNew && this.initSuperHero();
    this.setSuperHero();
    this.superHeroService[isNew ? httpMethodKeys.post : httpMethodKeys.put](
      this.superHero,
    ).subscribe({
      next: () => {
        this.toastr.success(
          isNew ? this.toastTranslations.add : this.toastTranslations.update,
        );
        this.goBack();
      },
      error: () => this.goBack(),
    });
  }
}
