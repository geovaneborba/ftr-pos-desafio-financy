import { Tag, ArrowUpDown, Utensils } from 'lucide-react';
import { useQuery } from '@apollo/client/react';
import { LIST_CATEGORIES } from '@/lib/graphql/queries/category';
import { Category } from '@/types/category';
import { CategorySummarySkeleton } from '@/components/skeleton';

export function CategorySummaryCard() {
  const { data, loading } = useQuery<{ listCategories: Category[] }>(
    LIST_CATEGORIES
  );
  const categories = data?.listCategories || [];

  if (loading) {
    return <CategorySummarySkeleton />;
  }

  const totalCategories = categories.length;
  const totalTransactions = categories.reduce(
    (sum, category) => sum + category.transactionCount,
    0
  );

  const categoryWithMostTransactions =
    categories.length > 0
      ? categories.reduce((prevCategory, currentCategory) =>
          currentCategory.transactionCount > prevCategory.transactionCount
            ? currentCategory
            : prevCategory
        )
      : { name: 'Nenhuma categoria', transactionCount: 0 };

  const statistics = [
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
      value: categoryWithMostTransactions.name,
      icon: Utensils,
      iconColor: 'text-blue-base'
    }
  ];

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-3">
      {statistics.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.id}
            className="flex gap-4 rounded-[12px] border border-gray-200 bg-white p-6"
          >
            <div className="flex gap-2">
              <div className="last:capitalize">
                <span className="flex items-center gap-4 font-bold text-gray-800 lg:text-[28px]">
                  <Icon className={stat.iconColor} /> {stat.value}
                </span>
                <p className="mt-2 text-xs font-medium text-gray-500 uppercase">
                  {stat.label}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
