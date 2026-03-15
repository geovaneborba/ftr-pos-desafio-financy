import { ReactNode, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation } from '@apollo/client/react';
import { DialogDescription } from '@radix-ui/react-dialog';
import { CircleArrowDown, CircleArrowUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from '@/components/ui/input-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import {
  TransactionFormData,
  transactionSchema
} from '@/schemas/transaction-schema';
import { Category } from '@/types/category';
import { cn } from '@/utils/utils';

import { CREATE_TRANSACTION_MUTATION } from '@/lib/graphql/mutations/transaction/create-transaction';
import { LIST_CATEGORIES } from '@/lib/graphql/queries/category';
import { LIST_TRANSACTIONS } from '@/lib/graphql/queries/transaction';
import {
  amountToCents,
  convertToBRL,
  formatCurrencyBRL
} from '@/utils/format-currency';
import { formatDateISO } from '@/utils/format-date';
import { capitalize } from '@/utils/format-string';

type CreateTransactionDialogProps = {
  children: ReactNode;
};

export function CreateTransactionDialog({
  children
}: CreateTransactionDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
    reset
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: 'outcome',
      amount: 0,
      categoryId: ''
    }
  });
  const selectedType = watch('type');

  const { data } = useQuery<{ listCategories: Category[] }>(LIST_CATEGORIES);

  const categories = data?.listCategories || [];

  const [createTransaction, { loading }] = useMutation(
    CREATE_TRANSACTION_MUTATION,
    {
      refetchQueries: [LIST_CATEGORIES, LIST_TRANSACTIONS],
      onCompleted: () => {
        setDialogOpen(false);
        reset();
      },
      onError: (error) => {
        console.error('Error creating transaction:', error);
      }
    }
  );

  const handleCreateTransaction = async (data: TransactionFormData) => {
    const date = formatDateISO(new Date(data.date));
    const amountInCents = amountToCents(data.amount);

    await createTransaction({
      variables: {
        data: {
          type: data.type,
          description: data.description,
          date,
          amountInCents,
          categoryId: data.categoryId
        }
      }
    });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] w-[95vw] max-w-[400px] gap-0 overflow-y-auto sm:max-w-[448px]">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold text-gray-800">
            Nova Transação
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Registre sua despesa ou receita
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleCreateTransaction)}
          className="flex flex-col space-y-4"
        >
          {/* Type selection */}
          <Field
            orientation={'horizontal'}
            className="my-6 h-[3.875rem] rounded-[.75rem] border border-gray-200 p-2"
          >
            <Button
              type="button"
              variant="outline"
              className={cn(
                'flex-1 hover:bg-transparent',
                selectedType === 'outcome' && 'border-red-base text-gray-800'
              )}
              onClick={() => setValue('type', 'outcome')}
            >
              <CircleArrowDown
                className={cn(
                  'text-gray-400',
                  selectedType === 'outcome' && 'text-danger'
                )}
              />
              Despesa
            </Button>
            <Button
              type="button"
              variant={'outline'}
              className={cn(
                'flex-1 hover:bg-transparent',
                selectedType === 'income' && 'border-brand-base text-gray-800'
              )}
              onClick={() => setValue('type', 'income')}
            >
              <CircleArrowUp
                className={cn(
                  'text-gray-400',
                  selectedType === 'income' && 'text-brand-base'
                )}
              />
              Receita
            </Button>
          </Field>

          {/* Description */}
          <Field>
            <FieldLabel htmlFor="description" className="text-sm sm:text-base">
              Descrição
            </FieldLabel>
            <Input
              id="description"
              placeholder="Ex: Compras no supermercado"
              className="text-sm sm:text-base"
              {...register('description')}
            />
            {errors.description && (
              <FieldError className="text-danger mt-1 text-xs">
                {errors.description.message}
              </FieldError>
            )}
          </Field>

          {/* Date and Amount */}
          <FieldGroup className="grid grid-cols-2">
            <Field>
              <FieldLabel htmlFor="date" className="text-sm sm:text-base">
                Data
              </FieldLabel>
              <Input
                id="date"
                type="date"
                className="text-sm sm:text-base"
                {...register('date')}
              />
              {errors.date && (
                <FieldError className="text-danger mt-1 text-xs">
                  {errors.date.message}
                </FieldError>
              )}
            </Field>

            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="amount" className="text-sm sm:text-base">
                    Valor
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>R$</InputGroupAddon>
                    <InputGroupInput
                      id="amount"
                      type="text"
                      placeholder="0,00"
                      className="text-sm sm:text-base"
                      value={field.value ? formatCurrencyBRL(field.value) : ''}
                      onChange={(e) =>
                        field.onChange(convertToBRL(e.target.value))
                      }
                    />
                  </InputGroup>
                  {errors.amount && (
                    <FieldError className="text-danger mt-1 text-xs">
                      {errors.amount.message}
                    </FieldError>
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          {/* Category */}
          <Field>
            <FieldLabel htmlFor="category" className="text-sm sm:text-base">
              Categoria
            </FieldLabel>
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="text-sm sm:text-base">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        className="capitalize"
                        key={category.id}
                        value={category.id}
                      >
                        {capitalize(category.name)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.categoryId && (
              <FieldError className="text-danger mt-1 text-xs">
                {errors.categoryId.message}
              </FieldError>
            )}
          </Field>

          {/* Submit Button */}
          <Button
            type="submit"
            className="mt-2 w-full text-sm text-white"
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
