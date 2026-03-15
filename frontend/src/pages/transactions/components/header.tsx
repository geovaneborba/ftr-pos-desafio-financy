import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CreateTransactionDialog } from '@/components/create-transaction-dialog';

export function Header() {
  return (
    <header className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Transações</h2>
        <p className="text-sm text-gray-600">
          Gerencie todas as suas transações financeiras
        </p>
      </div>

      <CreateTransactionDialog>
        <Button size={'sm'}>
          <Plus className="size-4 text-white" />
          <span className="text-sm font-medium text-white">Nova transação</span>
        </Button>
      </CreateTransactionDialog>
    </header>
  );
}
