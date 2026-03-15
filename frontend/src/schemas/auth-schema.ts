import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z
    .email({
      error: 'O e-mail informado é inválido'
    })
    .min(1, 'E-mail obrigatório'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  rememberMe: z.boolean().default(false).optional()
});

export const registerUserFormSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z
    .email({
      error: 'O e-mail informado é inválido'
    })
    .min(1, 'E-mail obrigatório'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres')
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
export type RegisterUserFormData = z.infer<typeof registerUserFormSchema>;
