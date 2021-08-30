import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'superheroes', pathMatch: 'full' },
  {
    path: 'superheroes',
    loadChildren: (): Promise<unknown> =>
      import('./modules/super-hero/super-hero.module').then(
        (m) => m.SuperHeroModule,
      ),
  },
  { path: '**', redirectTo: 'superheroes' }, // NOT FOUND
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
