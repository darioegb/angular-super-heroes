import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil, withLatestFrom } from 'rxjs/operators';
import { DEFAULT_FORM_CONTROL_SIZES, HTTP_METHOD_KEYS } from '@shared/globals';
import { GenericObject, Option } from '@shared/models';
import { GenreEnum } from '@shared/enums';
import { UtilService } from '@shared/services';
import { SuperHero, SuperHeroService } from '@modules/super-hero/shared';
import { fileSizeValidator } from '@shared/directives';

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
  isUploading = false;
  picture: string;
  toastTranslations: { add: string; update: string };
  textareaMax: number;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: UntypedFormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private toastr: ToastrService,
    private utilService: UtilService,
    private superHeroService: SuperHeroService,
  ) {
    this.translateService.onLangChange
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.getTranslations());
  }

  ngOnInit(): void {
    ({
      textarea: { min: this.textareaMax },
    } = DEFAULT_FORM_CONTROL_SIZES);
    this.genres = this.utilService.convertEnumToKeyValueArray(GenreEnum);
    this.view = /true/i.test(this.route.snapshot.queryParams?.view);
    this.initForm();
    this.getData();
    this.getTranslations();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  get superHeroControls(): GenericObject<AbstractControl> {
    return this.superHeroForm.controls;
  }

  initForm(): void {
    const {
      text: { min: textMin, max: textMax },
      number: { min: numberMin },
      textarea: { min: textareaMin, max: textareaMax },
    } = DEFAULT_FORM_CONTROL_SIZES;
    this.superHeroForm = this.fb.group({
      name: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(textMin),
          Validators.maxLength(textMax),
        ]),
      ],
      genre: [null, Validators.required],
      specialty: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(textareaMin),
          Validators.maxLength(textareaMax),
        ]),
      ],
      age: [null, Validators.min(numberMin)],
      height: [null, Validators.min(numberMin)],
      weight: [null, Validators.min(numberMin)],
      picture: [null, fileSizeValidator],
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
      .get('globals.toasts')
      .subscribe(({ add: { success: add }, update: { success: update } }) => {
        const param = this.translateService.instant('superheroes.detail.title');
        this.toastTranslations = {
          add: this.utilService.replaceStringVariable(add, param),
          update: this.utilService.replaceStringVariable(update, param),
        };
      });
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
      this.isUploading = true;
    } else {
      this.saveOrUpdate();
    }
  }

  goBack(): void {
    this.location.back();
  }

  onFileUploaded(): void {
    this.isUploading = false;
    this.saveOrUpdate();
  }

  private saveOrUpdate(): void {
    const isNew = !this.superHero?.id;
    isNew && this.initSuperHero();
    this.setSuperHero();
    this.superHeroService[isNew ? HTTP_METHOD_KEYS.post : HTTP_METHOD_KEYS.put](
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
