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
import {
  DEFAULT_FORM_CONTROL_SIZES,
  GenreEnum,
  HTTP_METHOD_KEYS,
} from '@app/constants';
import { GenericObject, Option } from '@shared/models';
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
  controlSize = DEFAULT_FORM_CONTROL_SIZES;
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
    this.translateService.onLangChange.subscribe(() => this.getTranslations());
  }

  ngOnInit(): void {
    this.genres = this.utilService.convertEnumToKeyValueArray(GenreEnum);
    this.view = /true/i.test(this.route.snapshot.queryParams?.view);
    this.initForm();
    this.getData();
    this.getTranslations();
  }

  get superHeroControls(): GenericObject<AbstractControl> {
    return this.superHeroForm.controls;
  }

  initForm(): void {
    const { text, number, textarea } = this.controlSize;
    this.superHeroForm = this.fb.group({
      name: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(text.min),
          Validators.maxLength(text.max),
        ]),
      ],
      genre: [null, Validators.required],
      specialty: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(textarea.min),
          Validators.maxLength(textarea.max),
        ]),
      ],
      age: [null, Validators.min(number.min)],
      height: [null, Validators.min(number.min)],
      weight: [null, Validators.min(number.min)],
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
        const param = this.translateService.instant('superHeroes.detail.title');
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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
