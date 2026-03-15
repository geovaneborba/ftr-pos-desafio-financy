import { z } from 'zod';

export const forgotPasswordFormSchema = z.object({
  email: z.email('Digite um e-mail válido').min(1, 'O e-mail é obrigatório')
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>;
