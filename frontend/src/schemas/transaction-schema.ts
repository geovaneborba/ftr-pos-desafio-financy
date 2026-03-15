import { z } from 'zod';

export const transactionSchema = z.object({
  type: z.enum(['outcome', 'income']),
  description: z.string().min(1, 'Descrição é obrigatória'),
  date: z.string().min(1, 'Data é obrigatória'),
  amount: z.number().min(0, 'Valor não pode ser negativo'),
  categoryId: z.string().min(1, 'Categoria é obrigatória')
});

export type TransactionFormData = z.infer<typeof transactionSchema>;
