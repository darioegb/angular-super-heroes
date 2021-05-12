import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperHeroGridComponent } from './super-hero-grid/super-hero-grid.component';
import { SuperHeroDetailComponent } from './super-hero-detail/super-hero-detail.component';


const routes: Routes = [
  {
    path: '',
    component: SuperHeroGridComponent
  },
  {
    path: 'detail',
    component: SuperHeroDetailComponent,
  },
  {
    path: 'detail/:superHeroId',
    component: SuperHeroDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperHeroRoutingModule { }
