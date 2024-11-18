export interface IFilter {
  mine?: boolean;
  important?: boolean;
  completed?: boolean;
  deleted?: boolean;
  results?: boolean;
  searchValue?: string;
  tagIds?: number[];
}
