import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [AppLayoutComponent],
  imports: [CommonModule, RouterModule, MatProgressSpinnerModule, SharedModule],
})
export class LayoutsModule {}
