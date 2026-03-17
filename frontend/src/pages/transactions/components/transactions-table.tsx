import {
  Trash2,
  ArrowDownCircle,
  ArrowUpCircle,
  ChevronLeft,
  ChevronRight,
  SquarePen
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import { Transaction } from '@/types/transaction';
import { PaginationInfo } from '@/types/filters';

import { iconMap } from '@/constants/icons';
import { cn } from '@/utils/utils';
import { formatCurrency } from '@/utils/format-currency';
import { formatDate } from '@/utils/format-date';

import { DeleteTransactionDialog } from './delete-transaction-dialog';
import { TransactionMobileCard } from './transaction-mobile-card';
import { UpdateTransactionDialog } from './update-transaction-dialog';

type TransactionsTableProps = {
  transactions: Transaction[];
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
};

export function TransactionsTable({
  transactions,
  pagination,
  onPageChange
}: TransactionsTableProps) {
  const { currentPage, totalPages, totalCount, limit } = pagination;

  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalCount);

  return (
    <div className="border-border bg-card rounded-xl border">
      {transactions.length > 0 ? (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs font-medium tracking-[.0375rem] text-gray-500 uppercase">
                    Descrição
                  </TableHead>
                  <TableHead className="text-center text-xs font-medium tracking-[.0375rem] text-gray-500 uppercase">
                    Data
                  </TableHead>
                  <TableHead className="text-center text-xs font-medium tracking-[.0375rem] text-gray-500 uppercase">
                    Categoria
                  </TableHead>
                  <TableHead className="text-center text-xs font-medium tracking-[.0375rem] text-gray-500 uppercase">
                    Tipo
                  </TableHead>
                  <TableHead className="text-right text-xs font-medium tracking-[.0375rem] text-gray-500 uppercase">
                    Valor
                  </TableHead>
                  <TableHead className="text-right text-xs font-medium tracking-[.0375rem] text-gray-500 uppercase">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {transactions.map((transaction) => {
                  const Icon = iconMap[transaction.category.icon];

                  return (
                    <TableRow
                      key={transaction.id}
                      className="hover:bg-muted/30"
                    >
                      {/* Description */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Badge
                            className="rounded-lg"
                            size={'icon'}
                            variant={transaction.category.color}
                          >
                            <Icon className={`size-4`} />
                          </Badge>
                          <span className="text-base font-medium text-gray-800 capitalize">
                            {transaction.description}
                          </span>
                        </div>
                      </TableCell>
                      {/* Date */}
                      <TableCell className="text-center text-sm text-gray-600">
                        {formatDate(transaction.date)}
                      </TableCell>
                      {/* Category */}
                      <TableCell className="text-center">
                        <Badge
                          className={'px-3 text-sm font-medium capitalize'}
                          variant={transaction.category.color}
                        >
                          {transaction.category.name}
                        </Badge>
                      </TableCell>
                      {/* Type */}
                      <TableCell>
                        <div className="flex items-center justify-center gap-2 text-sm font-medium">
                          {transaction.type === 'outcome' ? (
                            <span className="text-danger flex items-center gap-2 capitalize">
                              <ArrowDownCircle className="size-4" />
                              saída
                            </span>
                          ) : (
                            <span className="text-brand-base flex items-center gap-2 capitalize">
                              <ArrowUpCircle className="size-4" />
                              entrada
                            </span>
                          )}
                        </div>
                      </TableCell>
                      {/* Amount */}
                      <TableCell
                        className={cn(
                          'text-right text-sm font-semibold text-gray-800'
                        )}
                      >
                        {formatCurrency(
                          transaction.amountInCents,
                          transaction.type
                        )}
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="pr-6">
                        <div className="flex items-center justify-end gap-1">
                          <DeleteTransactionDialog transaction={transaction}>
                            <Button variant={'outline'} className="size-8">
                              <Trash2 className="text-danger size-4" />
                              <span className="sr-only">Excluir</span>
                            </Button>
                          </DeleteTransactionDialog>
                          <UpdateTransactionDialog transaction={transaction}>
                            <Button variant={'outline'} className="size-8">
                              <SquarePen className="size-4 text-gray-700" />
                              <span className="sr-only">Editar</span>
                            </Button>
                          </UpdateTransactionDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden">
            {transactions.map((transaction) => (
              <TransactionMobileCard
                key={transaction.id}
                transaction={transaction}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 rounded-full bg-gray-100 p-3">
            <ArrowDownCircle className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="mb-2 text-lg font-medium text-gray-900">
            Nenhuma transação encontrada
          </h3>
          <p className="mb-8 max-w-md text-sm text-gray-500">
            Comece registrando suas transações para organizar suas finanças
          </p>
        </div>
      )}

      {/* Pagination - only show when there are transactions */}
      {transactions.length > 0 && (
        <div className="border-border flex flex-col items-center justify-between gap-3 border-t px-4 py-3 sm:flex-row sm:px-6">
          <span className="text-sm text-gray-700">
            {totalCount > 0
              ? `${startItem} a ${endItem} | ${totalCount} resultados`
              : 'Nenhum resultado'}
          </span>
          <div className="flex items-center gap-1">
            <Button
              size={'icon'}
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              <ChevronLeft className="size-4" />
              <span className="sr-only">Página anterior</span>
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              if (
                page === 1 ||
                page === totalPages ||
                page === currentPage ||
                page === currentPage - 1 ||
                page === currentPage + 1
              ) {
                return (
                  <Button
                    key={page}
                    size={'icon'}
                    variant={page === currentPage ? 'default' : 'outline'}
                    onClick={() => onPageChange(page)}
                  >
                    {page}
                  </Button>
                );
              }

              if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <span key={page} className="px-2 text-sm text-gray-500">
                    ...
                  </span>
                );
              }

              return null;
            })}

            <Button
              size={'icon'}
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
            >
              <ChevronRight className="size-4" />
              <span className="sr-only">Próxima página</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
