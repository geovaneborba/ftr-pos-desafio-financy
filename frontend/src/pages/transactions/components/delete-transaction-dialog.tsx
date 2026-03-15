import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import { ReactNode, useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { DELETE_TRANSACTION_MUTATION } from '@/lib/graphql/mutations/transaction/delete-transaction';
import { Transaction } from '@/types/transaction';
import { LIST_TRANSACTIONS } from '@/lib/graphql/queries/transaction';
import { formatCurrency } from '@/utils/format-currency';
import { LIST_CATEGORIES } from '@/lib/graphql/queries/category';

type DeleteTransactionDialogProps = {
  transaction: Transaction;
  children: ReactNode;
};

export function DeleteTransactionDialog({
  transaction,
  children
}: DeleteTransactionDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [deleteTransaction, { loading }] = useMutation(
    DELETE_TRANSACTION_MUTATION,
    {
      refetchQueries: [LIST_TRANSACTIONS, LIST_CATEGORIES],
      onCompleted: () => {
        setDialogOpen(false);
      },
      onError: (error) => {
        console.error('Error deleting transaction:', error);
      }
    }
  );

  const handleDelete = async () => {
    try {
      await deleteTransaction({
        variables: {
          transactionId: transaction.id
        }
      });
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[95vw] sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-semibold text-gray-800">
            Confirmar Exclusão
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="mb-4 text-sm text-gray-600">
            Tem certeza que deseja excluir esta transação?
          </p>

          <div className="space-y-2 rounded-lg bg-gray-100 p-3">
            {/* Description */}
            <div className="flex justify-between text-sm">
              <h3 className="text-gray-500">Descrição:</h3>
              <span className="font-medium text-gray-800">
                {transaction.description}
              </span>
            </div>

            {/* Value */}
            <div className="flex justify-between text-sm">
              <h3 className="text-gray-500">Valor:</h3>
              <span
                className={`font-medium ${transaction.type === 'income' ? 'text-brand-base' : 'text-danger'}`}
              >
                {formatCurrency(transaction.amountInCents, transaction.type)}
              </span>
            </div>

            {/* Category */}
            <div className="flex justify-between text-sm">
              <h3 className="text-gray-500">Categoria:</h3>
              <span className="font-medium text-gray-800 capitalize">
                {transaction.category.name}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setDialogOpen(false)}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            className="bg-danger hover:bg-danger/90 flex-1 text-white"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Excluindo...' : 'Excluir'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
