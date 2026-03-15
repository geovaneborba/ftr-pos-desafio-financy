import { Header } from './components/header';
import { CategorySummaryCard } from './components/category-summary-card';
import { CategoryCard } from './components/category-card';
import { CategoryCardsSkeleton } from '@/components/skeleton';
import { useQuery } from '@apollo/client/react';
import { LIST_CATEGORIES } from '@/lib/graphql/queries/category';
import { Category } from '@/types/category';

export function Categories() {
  const { data, loading } = useQuery<{ listCategories: Category[] }>(
    LIST_CATEGORIES
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Header />
          <CategorySummaryCard />
          <CategoryCardsSkeleton />
        </main>
      </div>
    );
  }

  const categories = data?.listCategories || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-7xl px-4 py-8 pb-24 sm:px-6 lg:px-8">
        <Header />
        <CategorySummaryCard />

        {/* Categories List */}
        <div className="category-list mt-8 flex flex-col gap-4 sm:col-span-2 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </main>
    </div>
  );
}
