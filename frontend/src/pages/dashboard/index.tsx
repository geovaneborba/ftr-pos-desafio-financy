import { SummaryCards } from './componentes/summary-cards';
import { RecentTransactions } from './componentes/recent-transactions';
import { CategoriesCard } from './componentes/categories-card';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-7xl px-4 pt-8 pb-24 sm:px-6 sm:pb-16 lg:px-8">
        <SummaryCards />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <RecentTransactions />
          <CategoriesCard />
        </div>
      </main>
    </div>
  );
}
