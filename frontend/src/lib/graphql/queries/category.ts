import { Category } from '@/types';
import { gql } from '@apollo/client';

export const LIST_CATEGORIES = gql`
  query ListCategories($filters: ListCategoriesInput) {
    listCategories(filters: $filters) {
      id
      name
      description
      color
      icon
      userId
      createdAt
      updatedAt
      transactionCount
      totalAmountInCents
    }
  }
`;

export type ListCategoriesResponse = {
  listCategories: Category[];
};
