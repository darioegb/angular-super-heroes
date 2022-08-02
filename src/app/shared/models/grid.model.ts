export interface Column {
  headerDef: string;
  cellDef: string;
  isImg?: boolean;
  format?: (value: number) => string;
}

export interface ColumnDef {
  columns: Column[];
  displayedColumns: string[];
}

export interface Page<T> {
  items: T[];
  count: number;
}

export interface FilterInput {
  label: string;
  placeholder: string;
}
