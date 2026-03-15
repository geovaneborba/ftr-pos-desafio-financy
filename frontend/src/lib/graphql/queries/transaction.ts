import { Transaction } from '@/types';
import { gql } from '@apollo/client';

export const LIST_TRANSACTIONS = gql`
  query ListTransactions($filters: ListTransactionsInput) {
    listTransactions(filters: $filters) {
      transactions {
        id
        type
        description
        date
        amountInCents
        userId
        categoryId
        createdAt
        updatedAt
        category {
          id
          name
          description
          color
          icon
          userId
          createdAt
          updatedAt
        }
      }
      totalCount
      currentPage
      totalPages
      limit
    }
  }
`;

export const GET_TOTAL_BALANCE = gql`
  query GetTotalBalance {
    getTotalBalance
  }
`;

export const GET_TOTAL_INCOME = gql`
  query GetTotalIncome {
    getTotalIncome
  }
`;

export const GET_TOTAL_EXPENSE = gql`
  query GetTotalExpense {
    getTotalExpense
  }
`;

export type GetTotalIncomeResponse = {
  getTotalIncome: number;
};

export type GetTotalExpenseResponse = {
  getTotalExpense: number;
};

export type GetTotalBalanceResponse = {
  getTotalBalance: number;
};

export type ListTransactionsResponse = {
  listTransactions: {
    transactions: Transaction[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
    limit: number;
  };
};
