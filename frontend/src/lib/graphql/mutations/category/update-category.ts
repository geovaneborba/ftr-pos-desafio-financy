import { Category } from '@/types/category';
import { gql } from '@apollo/client';

export const UPDATE_CATEGORY_MUTATION = gql`
  mutation UpdateCategory($categoryId: String!, $data: UpdateCategoryInput!) {
    updateCategory(categoryId: $categoryId, data: $data) {
      name
      description
      color
      icon
    }
  }
`;

export type UpdateCategoryMutationData = {
  updateCategory: Category;
};
