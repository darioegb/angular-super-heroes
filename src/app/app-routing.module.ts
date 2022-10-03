import { AppLayoutComponent } from '@app/layouts/app-layout/app-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'superheroes',
        loadChildren: () =>
          import('./modules/super-hero/super-hero.module').then(
            (m) => m.SuperHeroModule,
          ),
      },
      { path: '', redirectTo: 'superheroes', pathMatch: 'full' },
    ],
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('./pages/page-not-found/page-not-found.module').then(
        (m) => m.PageNotFoundModule,
      ),
  },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
