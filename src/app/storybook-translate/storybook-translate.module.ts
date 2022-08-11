import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

import { APP_I18N_CONFIG } from '@root/app/shared/globals';

@NgModule({
  imports: [HttpClientModule, TranslateModule.forRoot(APP_I18N_CONFIG)],
  exports: [TranslateModule],
})
export class StorybookTranslateModule {}
