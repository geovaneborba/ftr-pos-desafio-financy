import { Badge } from '@/components/ui/badge';

import { formatCurrency } from '@/utils/format-currency';
import { Category } from '@/types/category';
import { formatItemCount } from '@/utils/format-item-count';

type CategoryItemProps = {
  category: Category;
};

export function CategoryItem({ category }: CategoryItemProps) {
  return (
    <div className="flex items-center rounded-lg">
      <Badge
        className={'text-xs capitalize min-[321px]:text-sm'}
        variant={category.color}
      >
        {category.name}
      </Badge>

      <span className="ml-auto min-w-16 text-left text-xs text-gray-600 min-[321px]:min-w-24 min-[321px]:text-center min-[321px]:text-sm">
        {formatItemCount(category.transactionCount)}
      </span>

      <span className="min-w-16 text-right text-xs font-semibold text-gray-800 min-[321px]:min-w-20 min-[321px]:text-sm">
        {formatCurrency(category.totalAmountInCents)}
      </span>
    </div>
  );
}
