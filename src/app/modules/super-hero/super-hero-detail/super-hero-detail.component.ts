import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { take, takeUntil, withLatestFrom } from 'rxjs/operators';
import { genresEnum } from '@app/constants';
import { Option, ToastTranslation } from '@shared/models';
import { UtilService } from '@shared/services';
import { SuperHero, SuperHeroService } from '@modules/super-hero/shared';

@Component({
  selector: 'app-super-hero-detail',
  templateUrl: './super-hero-detail.component.html',
  styleUrls: ['./super-hero-detail.component.scss'],
})
export class SuperHeroDetailComponent implements OnInit, OnDestroy {
  superHeroForm: FormGroup;
  genres: Option[] = [];
  superHero: SuperHero;
  view: boolean;
  toastTranslations: { [key: string]: ToastTranslation };
  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private toastr: ToastrService,
    private utilService: UtilService,
    private superHeroService: SuperHeroService
  ) {}

  ngOnInit(): void {
    this.genres = this.utilService.convertEnumToKeyValueArray(genresEnum);
    this.view = /true/i.test(this.route.snapshot.queryParams?.view);
    this.initForm();
    this.getData();
    this.getTranslations();
  }

  get superHeroControls() {
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
        if (params.superHeroId) {
          this.superHero = data.superHero;
          this.view && this.superHeroForm.disable();
          this.setForm();
        }
      });
  }

  getTranslations(): void {
    this.translateService
      .get('superHeroes.toasts')
      .pipe(take(1))
      .subscribe((translations) => (this.toastTranslations = translations));
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
    this.setSuperHero();
    this.superHero.id ? this.updateSuperHero() : this.saveSuperHero();
  }

  saveSuperHero(): void {
    this.initSuperHero();
    this.setSuperHero();
    this.superHeroService.add(this.superHero).subscribe({
      next: () => {
        this.toastr.success(this.toastTranslations.add.success);
        this.goBack();
      },
      error: () => this.goBack(),
    });
  }

  updateSuperHero(): void {
    this.setSuperHero();
    this.superHeroService.update(this.superHero).subscribe({
      next: () => {
        this.toastr.success(this.toastTranslations.update.success);
        this.goBack();
      },
      error: () => this.goBack(),
    });
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
