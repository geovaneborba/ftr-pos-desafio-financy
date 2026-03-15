import { Header } from './components/header';
import { TransactionFilters } from './components/transaction-filters';
import { TransactionsTable } from './components/transactions-table';
import { TransactionsTableSkeleton } from '@/components/skeleton';

import { useTransactions } from '@/hooks/use-transactions';
import { useCategories } from '@/hooks/use-categories';

export function Transactions() {
  const { categories } = useCategories();
  const { transactions, pagination, handlePageChange, loading } =
    useTransactions();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 pb-24 sm:px-6 lg:px-8">
        <Header />

        <TransactionFilters categories={categories} />

        {loading ? (
          <TransactionsTableSkeleton />
        ) : (
          <TransactionsTable
            transactions={transactions}
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
}
