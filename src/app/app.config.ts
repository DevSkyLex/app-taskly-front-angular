import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from './core/loaders/transloco.loader';
import { environment } from '../environments/environment';
import {
  provideNgxWebstorage,
  withLocalStorage,
  withNgxWebstorageConfig,
  withSessionStorage,
} from 'ngx-webstorage';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimations } from '@angular/platform-browser/animations';
import { projectReducer } from './core/stores/project/project.reducer';
import { ProjectEffects } from './core/stores/project/project.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([])),
    provideNgxWebstorage(
      withLocalStorage(),
      withSessionStorage(),
      withNgxWebstorageConfig({
        prefix: environment.storage.prefix,
        caseSensitive: environment.storage.caseSensitive,
        separator: environment.storage.separator,
      })
    ),
    provideTransloco({
      config: {
        availableLangs: environment.translations.languages,
        defaultLang: environment.translations.defaultLanguage,
        reRenderOnLangChange: environment.translations.reRenderOnLangChange,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    provideStore({
      project: projectReducer
    }),
    provideEffects([
      ProjectEffects
    ]),
    provideStoreDevtools({ 
      maxAge: 25, 
      logOnly: !isDevMode() 
    }),
  ],
};
