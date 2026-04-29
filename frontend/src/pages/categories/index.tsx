import { Header } from './components/header';
import { CategorySummaryCard } from './components/category-summary-card';
import { CategoryCardsSkeleton } from '@/components/skeleton';
import { useQuery } from '@apollo/client/react';
import { LIST_CATEGORIES } from '@/lib/graphql/queries/category';
import { Category } from '@/types/category';
import { CategoryList } from './components/category-list';

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
        <CategoryList categories={categories} />
      </main>
    </div>
  );
}
