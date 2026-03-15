import { z } from 'zod';

import { iconNames } from '@/constants/icons';
import { colorVariants } from '@/constants/colors';

export const categorySchema = z.object({
  name: z.string().min(1, 'Nome da categoria é obrigatório'),
  description: z.string().optional(),
  icon: z.enum(iconNames, {
    error: 'Selecione um ícone para a categoria'
  }),
  color: z.enum(colorVariants, {
    error: 'Selecione uma cor para a categoria'
  })
});

export type CategoryFormData = z.infer<typeof categorySchema>;
