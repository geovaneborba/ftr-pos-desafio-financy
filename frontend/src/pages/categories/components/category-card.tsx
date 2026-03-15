import { SquarePen, Trash } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { Category } from '@/types/category';
import { iconMap } from '@/constants/icons';
import { cn } from '@/utils/utils';
import { formatItemCount } from '@/utils/format-item-count';

import { DeleteCategoryDialog } from './delete-category-dialog';
import { UpdateCategoryDialog } from './update-category-dialog';

type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = iconMap[category.icon];

  return (
    <div className="flex flex-col gap-5 rounded-[12px] border border-gray-200 bg-white p-6">
      {/* Card Header */}
      <div className="flex w-full items-center justify-between">
        <Badge
          variant={category.color}
          className={cn('h-10 w-10 rounded-[0.5rem]')}
        >
          <Icon />
        </Badge>
        {/* Actions */}
        <div className="flex items-center gap-2">
          <DeleteCategoryDialog category={category}>
            <Button variant={'outline'} className="size-8">
              <Trash className="text-danger" />
            </Button>
          </DeleteCategoryDialog>
          <UpdateCategoryDialog category={category}>
            <Button variant={'outline'} className="size-8">
              <SquarePen className="text-gray-700" />
            </Button>
          </UpdateCategoryDialog>
        </div>
      </div>
      {/* Card Content */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 capitalize">
          {category.name}
        </h3>
        <p className="text-sm text-gray-600">{category.description}</p>
      </div>
      {/* Card Footer */}
      <div className="flex items-center justify-between">
        <Badge
          variant={category.color}
          className="text-sm font-medium capitalize"
        >
          {category.name}
        </Badge>

        <span className="text-sm text-gray-600">
          {formatItemCount(category.transactionCount)}
        </span>
      </div>
    </div>
  );
}
