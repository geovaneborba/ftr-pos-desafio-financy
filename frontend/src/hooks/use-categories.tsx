import { useQuery } from '@apollo/client/react';

import {
  LIST_CATEGORIES,
  ListCategoriesResponse
} from '@/lib/graphql/queries/category';

export function useCategories() {
  const { data } = useQuery<ListCategoriesResponse>(LIST_CATEGORIES);

  return {
    categories: data?.listCategories || []
  };
}
