import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';

import { CategoryItem } from './category-item';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CategoriesSkeleton } from '@/components/skeleton';

import { LIST_CATEGORIES } from '@/lib/graphql/queries/category';
import { Category } from '@/types/category';

export function CategoriesCard() {
  const { data, loading } = useQuery<{
    listCategories: Category[];
  }>(LIST_CATEGORIES, {
    variables: {
      filters: {
        limit: 5
      }
    }
  });

  if (loading) {
    return <CategoriesSkeleton />;
  }

  const categories = data?.listCategories || [];

  return (
    <Card className="gap-0 self-start bg-white pt-0">
      <CardHeader className="flex h-[3.75rem] flex-row items-center justify-between border-b border-gray-200 py-0 sm:py-5 sm:pr-3 sm:pl-6">
        <CardTitle className="text-xs font-medium text-gray-500 uppercase">Categorias</CardTitle>

        <Link
          className="text-brand-base hover:text-brand-dark flex items-center gap-1 text-sm hover:underline"
          to="/dashboard/categories"
        >
          <span className="text-sm font-medium">Gerenciar</span>
          <ChevronRight className="size-4" />
        </Link>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4">
          {categories?.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
