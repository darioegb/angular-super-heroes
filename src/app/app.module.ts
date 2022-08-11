import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ToastrModule } from 'ngx-toastr';

import { APP_I18N_CONFIG } from '@root/app/shared/globals';
import { MatPaginatorI18nService } from './shared/services';
import { CoreModule } from './core/core.module';
import { SharedModule } from '@shared/shared.module';
import { environment } from '@environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    MatProgressSpinnerModule,
    TranslateModule.forRoot(APP_I18N_CONFIG),
    ToastrModule.forRoot(),
    CoreModule,
    SharedModule,
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorI18nService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
