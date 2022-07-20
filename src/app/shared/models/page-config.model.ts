import { SortDirection } from '@angular/material/sort';

export class PageConfig {
  constructor(
    public page?: number,
    public limit?: number,
    public sort?: string,
    public order?: SortDirection,
    public filter?: string,
  ) {
    this.page = page || 1;
    this.limit = limit || 5;
    this.sort = sort || null;
    this.order = !!order ? order : 'asc';
    this.filter = filter || '';
  }
}
