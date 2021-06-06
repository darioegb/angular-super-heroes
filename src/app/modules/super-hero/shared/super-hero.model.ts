import { genresEnum } from '@app/shared/constants/constants';
export interface SuperHero {
  id?: string;
  name: string;
  genre: genresEnum;
  specialty: string;
  age?: number;
  height?: number;
  picture?: string;
  weight?: number;
}
