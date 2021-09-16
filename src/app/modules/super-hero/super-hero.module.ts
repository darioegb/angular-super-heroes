import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SuperHeroGridComponent } from './super-hero-grid/super-hero-grid.component';
import { SuperHeroDetailComponent } from './super-hero-detail/super-hero-detail.component';
import { SuperHeroRoutingModule } from './super-hero-routing.module';
import { SharedModule } from '@shared/shared.module';
import { NgxErrorMessageModule } from 'ngx-error-message';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { SuperHeroResolver, SuperHeroService } from './shared';

@NgModule({
  declarations: [SuperHeroDetailComponent, SuperHeroGridComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatProgressBarModule,
    NgxMatFileInputModule,
    NgxErrorMessageModule,
    SuperHeroRoutingModule,
    SharedModule,
  ],
  providers: [SuperHeroService, SuperHeroResolver],
})
export class SuperHeroModule {}
