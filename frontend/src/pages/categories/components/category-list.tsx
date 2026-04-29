import { Category } from '@/types/category';
import { CategoryCard } from './category-card';

import { EmptyCategoryList } from './empty-category-list';

type CategoryList = {
  categories: Category[];
};

export function CategoryList({ categories }: CategoryList) {
  return (
    <div className="category-list mt-8 flex flex-col gap-4 sm:col-span-2 sm:grid sm:grid-cols-2 lg:grid-cols-4">
      {categories.length === 0 && <EmptyCategoryList />}

      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
