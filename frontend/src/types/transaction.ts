import { Category } from '@/types/category';

export type TransactionType = 'income' | 'outcome';

export type Transaction = {
  id: string;
  type: TransactionType;
  description: string;
  date: Date;
  amountInCents: number;
  userId: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
  category: Category;
};

export type TransactionList = {
  transactions: Transaction[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  limit: number;
};
