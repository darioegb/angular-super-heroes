import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { PageNotFoundComponent } from './page-not-found.component';
import { NotFoundPageRoutingModule } from './page-not-found.routing';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule, NotFoundPageRoutingModule, SharedModule],
})
export class PageNotFoundModule {}
