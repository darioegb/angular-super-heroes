import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TranslateModule } from '@ngx-translate/core';
import { SuperHeroGridComponent } from './super-hero-grid/super-hero-grid.component';
import { SuperHeroDetailComponent } from './super-hero-detail/super-hero-detail.component';
import { SuperHeroRoutingModule } from './super-hero-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxErrorMessageModule } from 'ngx-error-message';

@NgModule({
  declarations: [SuperHeroDetailComponent, SuperHeroGridComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    TranslateModule.forChild(),
    NgxErrorMessageModule,
    SuperHeroRoutingModule,
    SharedModule,
  ],
})
export class SuperHeroModule {}
