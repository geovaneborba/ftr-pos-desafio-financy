import { z } from 'zod';

export const transactionFiltersSchema = z.object({
  description: z.string().optional(),
  type: z.enum(['income', 'outcome']).optional(),
  categoryId: z.string().optional(),
  period: z.string().optional()
});

export type TransactionFiltersFormData = z.infer<
  typeof transactionFiltersSchema
>;
