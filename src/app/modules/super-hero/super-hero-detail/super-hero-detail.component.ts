import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil, withLatestFrom } from 'rxjs/operators';
import { genresEnum } from 'src/app/shared/constants/constants';
import { Option } from 'src/app/shared/models/option.model';
import { UtilService } from 'src/app/shared/services/util.service';
import { SuperHero } from '../shared/super-hero.model';
import { SuperHeroService } from '../shared/super-hero.service';

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
    this.view = /true/i.test(this.route.snapshot.queryParams['view']);
    this.initForm();
    this.getData();
  }

  get superHeroControls() {
    return this.superHeroForm.controls;
  }

  initForm() {
    this.superHeroForm = this.fb.group({
      name: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
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

  getData() {
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

  setForm() {
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

  initSuperHero() {
    this.superHero = {
      name: '',
      genre: null,
      specialty: '',
    };
  }

  setSuperHero() {
    this.superHero = { ...this.superHero, ...this.superHeroForm.value };
  }

  onSubmit() {
    if (this.superHeroForm.invalid) {
      this.superHeroForm.markAllAsTouched();
      return;
    }
    this.setSuperHero();
    this.superHero?.id ? this.updateSuperHero() : this.saveSuperHero();
  }

  saveSuperHero() {
    this.initSuperHero();
    this.setSuperHero();
    this.superHeroService.addSuperHero(this.superHero).subscribe(
      () => {
        this.toastr.success(
          this.translateService.instant('superHero.toasts.add.success')
        );
        this.goBack();
      },
      () => {
        this.toastr.error(
          this.translateService.instant('superHero.toasts.add.error')
        );
        this.goBack();
      }
    );
  }

  updateSuperHero() {
    this.setSuperHero();
    this.superHeroService.editSuperHero(this.superHero).subscribe(
      () => {
        this.toastr.success(
          this.translateService.instant('superHero.toasts.edit.success')
        );
        this.goBack();
      },
      () => {
        this.toastr.error(
          this.translateService.instant('superHero.toasts.edit.error')
        );
        this.goBack();
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
