import { GenreEnum } from '@shared/enums';
export interface SuperHero {
  id?: string;
  name: string;
  genre: GenreEnum;
  specialty: string;
  age?: number;
  height?: number;
  picture?: string;
  weight?: number;
}
