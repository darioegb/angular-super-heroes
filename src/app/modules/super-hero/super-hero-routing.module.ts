import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperHeroGridComponent } from './super-hero-grid/super-hero-grid.component';
import { SuperHeroDetailComponent } from './super-hero-detail/super-hero-detail.component';
import { SuperHeroResolver } from './shared/super-hero.resolver';
import { ID_KEY } from '@root/app/constants';

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
    path: `detail/:${ID_KEY}`,
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
