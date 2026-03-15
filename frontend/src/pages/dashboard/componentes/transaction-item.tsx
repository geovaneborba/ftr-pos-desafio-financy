import { ComponentProps } from 'react';
import { CircleArrowDown, CircleArrowUp } from 'lucide-react';

import { cn } from '@/utils/utils';
import { formatCurrency } from '@/utils/format-currency';

import { Badge } from '@/components/ui/badge';
import { iconMap } from '@/constants/icons';

import { Transaction } from '@/types';

type TransactionItemProps = ComponentProps<'div'> & {
  transaction: Transaction;
  onClick?: () => void;
};

export function TransactionItem({
  transaction,
  className,
  onClick
}: TransactionItemProps) {
  const { type, description, amountInCents, category } = transaction;

  const isIncome = type === 'income';
  const date = new Date(transaction.date).toLocaleDateString('pt-BR');
  const Icon = iconMap[category.icon];

  return (
    <div
      onClick={onClick}
      className={cn(
        'flex h-20 w-full items-center border-b border-gray-200 px-4 py-6 transition-colors sm:px-6',
        onClick ? 'cursor-pointer hover:bg-gray-100' : 'hover:bg-gray-50',
        className
      )}
    >
      {/* Left side - Transaction details */}
      <div className="flex items-center gap-4">
        <Badge
          variant={category.color}
          size="icon"
          className="rounded-[0.5rem]"
        >
          <Icon className="size-5" />
        </Badge>
        <div>
          <p
            title={description}
            className="max-w-[108px] truncate text-xs font-medium text-gray-800 capitalize min-[321px]:max-w-none sm:text-base"
          >
            {description}
          </p>
          <span className="text-xs text-gray-600 sm:text-sm">{date}</span>
        </div>
      </div>

      {/* Category badge - hidden on mobile, shown on sm */}
      <div className="ml-auto hidden items-center justify-center text-center capitalize sm:flex sm:w-40 sm:px-6">
        <Badge variant={category.color}>{category.name}</Badge>
      </div>

      {/* Amount and icon */}
      <span className="ml-auto flex shrink-0 items-center gap-2 text-xs font-semibold text-gray-800 sm:ml-0 sm:text-sm">
        {formatCurrency(amountInCents, type)}

        {isIncome ? (
          <CircleArrowUp className="text-brand-base w-4 shrink-0" />
        ) : (
          <CircleArrowDown className="text-danger w-4 shrink-0" />
        )}
      </span>
    </div>
  );
}
