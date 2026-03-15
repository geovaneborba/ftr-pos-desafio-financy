import { Link } from 'react-router-dom';
import { ChevronRight, Plus } from 'lucide-react';
import { useQuery } from '@apollo/client/react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TransactionItem } from './transaction-item';

import { LIST_TRANSACTIONS } from '@/lib/graphql/queries/transaction';
import { TransactionList } from '@/types';
import { CreateTransactionDialog } from '@/components/create-transaction-dialog';
import { Button } from '@/components/ui/button';
import { TransactionsSkeleton } from '@/components/skeleton';

export function RecentTransactions() {
  const { data, loading } = useQuery<{ listTransactions: TransactionList }>(
    LIST_TRANSACTIONS,
    {
      variables: {
        filters: {
          limit: 5
        }
      }
    }
  );

  if (loading) {
    return <TransactionsSkeleton />;
  }

  const transactions = data?.listTransactions.transactions || [];

  return (
    <Card className="gap-0 bg-white pt-0 pb-0 sm:col-span-2">
      <CardHeader className="flex h-[3.75rem] flex-row items-center justify-between border-b border-gray-200 py-0 sm:py-5 sm:pr-3 sm:pl-6">
        <CardTitle className="text-xs font-medium text-gray-500 uppercase">
          Transações Recentes
        </CardTitle>

        <Link
          className="text-brand-base hover:text-brand-dark flex items-center gap-1 text-sm hover:underline"
          to="/dashboard/transactions"
        >
          <span className="text-sm font-medium">Ver todas</span>
          <ChevronRight className="size-4" />
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}

        <CreateTransactionDialog>
          <Button
            className="flex w-full items-center justify-center gap-2 rounded-none rounded-b-lg border-none p-5 px-6 outline-none"
            variant={'outline'}
          >
            <Plus className="text-brand-base h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-brand-base text-sm font-medium">
              Nova transação
            </span>
          </Button>
        </CreateTransactionDialog>
      </CardContent>
    </Card>
  );
}
