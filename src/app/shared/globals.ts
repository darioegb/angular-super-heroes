import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export const ASSET_ROOT = 'assets';
export const IMG_SRC = `${ASSET_ROOT}/imgs`;
export const ID_KEY = 'id';
export const HTTP_METHOD_KEYS = {
  get: 'get',
  delete: 'delete',
  post: 'add',
  put: 'update',
};
export const DEFAULT_FORM_CONTROL_SIZES = {
  text: {
    min: 3,
    max: 60,
  },
  email: {
    min: 10,
    max: 100,
  },
  number: {
    min: 1,
    max: 999_999_999,
  },
  textarea: {
    min: 10,
    max: 250,
  },
};
export const LOCALES = ['en', 'es'];

export const APP_I18N_CONFIG = {
  defaultLanguage: 'en',
  loader: {
    provide: TranslateLoader,
    useFactory: (http: HttpClient): TranslateHttpLoader =>
      new TranslateHttpLoader(http),
    deps: [HttpClient],
  },
};
