import { TestBed } from '@angular/core/testing';

import { SuperHeroResolver } from './super-hero.resolver';

describe('HeroResolver', () => {
  let resolver: SuperHeroResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SuperHeroResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
