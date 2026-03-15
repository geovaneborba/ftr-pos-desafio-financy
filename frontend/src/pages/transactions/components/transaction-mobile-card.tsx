import { useState } from 'react';
import {
  MoreHorizontal,
  ArrowDownCircle,
  ArrowUpCircle,
  Trash2,
  SquarePen
} from 'lucide-react';

import { iconMap } from '@/constants/icons';
import { Transaction } from '@/types';

import { formatCurrency } from '@/utils/format-currency';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UpdateTransactionDialog } from './update-transaction-dialog';
import { DeleteTransactionDialog } from './delete-transaction-dialog';
import { DropdownMenu } from 'radix-ui';
import { formatDate } from '@/utils/format-date';

type TransactionMobileCardProps = {
  transaction: Transaction;
};

export function TransactionMobileCard({
  transaction
}: TransactionMobileCardProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const Icon = iconMap[transaction.category.icon];

  return (
    <div className="border-border relative flex items-start gap-3 border-b p-4 last:border-b-0">
      <Badge
        variant={transaction.category.color}
        className={`flex size-10 shrink-0 rounded-lg`}
      >
        <Icon className={`size-4`} />
      </Badge>

      <div className="flex flex-1 flex-col gap-1.5">
        <div className="flex flex-wrap items-center justify-between">
          {/* Description, Date and Amount */}
          <div className="flex flex-col">
            {/* Description */}
            <p
              className="truncate text-xs font-medium text-gray-800 capitalize min-[321px]:text-sm"
              title={transaction.description}
            >
              {transaction.description}
            </p>

            {/* Date */}
            <span className="w-full text-xs text-gray-600">
              {formatDate(transaction.date)}
            </span>

            {/* Amount and Icon */}
            <span
              className={
                'flex items-center gap-1 text-xs font-semibold whitespace-nowrap text-gray-800 min-[321px]:text-sm'
              }
              title={formatCurrency(
                transaction.amountInCents,
                transaction.type
              )}
            >
              {formatCurrency(transaction.amountInCents, transaction.type)}

              {transaction.type === 'outcome' ? (
                <ArrowDownCircle className="text-danger size-3.5" />
              ) : (
                <ArrowUpCircle className="text-brand-base size-3.5" />
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Actions Dropdown */}
      <div className="absolute top-2 right-2 flex shrink-0 items-center gap-1">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button
              variant={'outline'}
              className="size-8"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <MoreHorizontal className="size-4" />
              <span className="sr-only">Mais ações</span>
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="flex flex-col gap-1 rounded-lg bg-gray-100 p-3">
              <UpdateTransactionDialog transaction={transaction}>
                <Button
                  size={'icon'}
                  className="w-full border-none"
                  variant={'outline'}
                >
                  <SquarePen className="size-4 text-gray-700" />
                  Editar
                </Button>
              </UpdateTransactionDialog>
              <DeleteTransactionDialog transaction={transaction}>
                <Button
                  size={'icon'}
                  className="w-full border-none"
                  variant={'outline'}
                >
                  <Trash2 className="text-danger size-4" />
                  Excluir
                </Button>
              </DeleteTransactionDialog>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </div>
  );
}
