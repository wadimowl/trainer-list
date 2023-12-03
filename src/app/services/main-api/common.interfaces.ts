export interface Pagination {
  total: number;
  pages: number;
  perPage: number;
  page: number; // start from 1
}

export type PaginationRequest = Pick<Pagination, 'perPage' | 'page'>;
