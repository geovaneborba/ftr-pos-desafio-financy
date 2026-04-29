import { Tag, ArrowUpDown, Utensils } from 'lucide-react';
import { useQuery } from '@apollo/client/react';
import { LIST_CATEGORIES } from '@/lib/graphql/queries/category';
import { Category } from '@/types/category';
import { CategorySummarySkeleton } from '@/components/skeleton';
import { useCategoryStatistics } from '@/hooks/use-category-statistics';
import { CategoryStatisticCard } from './statistic-card';

export function CategorySummaryCard() {
  const { data, loading } = useQuery<{ listCategories: Category[] }>(
    LIST_CATEGORIES
  );
  const categories = data?.listCategories || [];

  const { totalCategories, totalTransactions, categoryWithMostTransactions } =
    useCategoryStatistics(categories);

  const categoryStatistics = [
    {
      id: 1,
      label: 'total de categorias',
      value: totalCategories,
      icon: Tag,
      iconColor: 'text-gray-700'
    },
    {
      id: 2,
      label: 'total de transações',
      value: totalTransactions,
      icon: ArrowUpDown,
      iconColor: 'text-purple-base'
    },
    {
      id: 3,
      label: 'categoria mais utilizada',
      value: categoryWithMostTransactions,
      icon: Utensils,
      iconColor: 'text-blue-base'
    }
  ];

  if (loading) {
    return <CategorySummarySkeleton />;
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-3">
      {categoryStatistics.map((statistic) => (
        <CategoryStatisticCard
          key={statistic.id}
          categoryStatistic={statistic}
        />
      ))}
    </div>
  );
}
