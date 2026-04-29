import { Category } from '@/types/category';

export function useCategoryStatistics(categories: Category[]) {
  const totalCategories = categories.length;
  const totalTransactions = categories.reduce(
    (prev, current) => prev + current.transactionCount,
    0
  );

  const getCategoryWithMostTransactions = (categories: Category[]) => {
    if (categories.length === 0) {
      return 'Nenhuma categoria';
    }
    return categories.reduce((prev, current) =>
      current.transactionCount > prev.transactionCount ? current : prev
    ).name;
  };

  const categoryWithMostTransactions =
    getCategoryWithMostTransactions(categories);

  return { totalCategories, totalTransactions, categoryWithMostTransactions };
}
