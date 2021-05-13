export interface Column {
  headerDef: string;
  cellDef: string;
}

export interface ColumnDef {
  columns: Column[];
  displayedColumns: string[];
}

export interface Page<T> {
  items: T[];
  count: number;
}
