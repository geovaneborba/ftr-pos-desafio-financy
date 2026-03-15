import { TransactionType } from './transaction';

export type TransactionFiltersType = {
  description?: string;
  type?: TransactionType;
  categoryId?: string;
  period?: string;
  page?: number;
  limit?: number;
};

export type PaginationInfo = {
  totalCount: number;
  currentPage: number;
  totalPages: number;
  limit: number;
};
