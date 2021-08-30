import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperHeroGridComponent } from './super-hero-grid/super-hero-grid.component';
import { SuperHeroDetailComponent } from './super-hero-detail/super-hero-detail.component';
import { SuperHeroResolver } from './shared/super-hero.resolver';
import { idKey } from '@root/app/constants';

const routes: Routes = [
  {
    path: '',
    component: SuperHeroGridComponent,
  },
  {
    path: 'detail',
    component: SuperHeroDetailComponent,
  },
  {
    path: `detail/:${idKey}`,
    component: SuperHeroDetailComponent,
    resolve: {
      superHero: SuperHeroResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperHeroRoutingModule {}
