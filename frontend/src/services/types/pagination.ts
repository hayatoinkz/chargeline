export type PaginationType<T> = {
  hasNextPage: boolean;
  data: T[];
};
