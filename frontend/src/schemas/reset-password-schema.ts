import { z } from 'zod';

export const resetPasswordFormSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .min(1, 'A senha é obrigatória'),
    confirmPassword: z.string().min(1, 'A confirmação de senha é obrigatória')
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword']
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordFormSchema>;
