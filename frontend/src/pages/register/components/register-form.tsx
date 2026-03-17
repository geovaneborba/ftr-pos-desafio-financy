import { ComponentProps, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, LogIn, Eye, EyeClosed } from 'lucide-react';
import { cn } from '@/utils/utils';
import { toast } from 'sonner';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from '@/components/ui/input-group';

import { Button } from '@/components/ui/button';

import {
  registerUserFormSchema,
  RegisterUserFormData
} from '@/schemas/auth-schema';
import { useAuthStore } from '@/stores/auth-store';

type RegisterFormProps = ComponentProps<'div'>;

export function RegisterForm({ className, ...props }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuthStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<RegisterUserFormData>({
    resolver: zodResolver(registerUserFormSchema)
  });

  const nameValue = watch('name');
  const emailValue = watch('email');
  const passwordValue = watch('password');

  const onSubmit = async (data: RegisterUserFormData) => {
    try {
      const success = await signUp({
        name: data.name,
        email: data.email,
        password: data.password
      });

      if (!success) {
        toast.error(
          'Falha ao criar conta. Verifique os dados e tente novamente.'
        );
        return;
      }

      toast.success('Conta criada com sucesso!');
      await navigate('/dashboard', {
        replace: true
      });
    } catch (error) {
      toast.error('Falha ao criar conta. Tente novamente mais tarde.');
    }
  };

  return (
    <Card className={cn(className)} {...props}>
      <CardHeader className="mb-8 text-center">
        <CardTitle className="text-xl font-bold text-gray-800">
          Criar conta
        </CardTitle>
        <CardDescription className="text-base text-gray-600">
          Comece a controlar suas finanças ainda hoje
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Name Field */}
            <Field className="group">
              <FieldLabel
                htmlFor="name"
                data-filled={!!nameValue && !errors.name}
                data-disabled={isSubmitting}
                aria-invalid={!!errors.name}
              >
                Nome completo
              </FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <User
                    className={cn(
                      'text-gray-400',
                      'group-focus-within:text-brand-base',
                      'aria-[invalid=true]:text-danger',
                      'data-[filled=true]:text-gray-800'
                    )}
                    data-filled={!!nameValue && !errors.name}
                    aria-invalid={!!errors.name}
                  />
                </InputGroupAddon>
                <InputGroupInput
                  className="placeholder:text-base placeholder:text-gray-400 data-filled:text-gray-800"
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  data-filled={!!nameValue}
                  {...register('name')}
                />
              </InputGroup>

              {errors.name && (
                <FieldError className="text-danger text-xs">
                  {errors.name.message}
                </FieldError>
              )}
            </Field>

            {/* Email Field */}
            <Field className="group">
              <FieldLabel
                htmlFor="email"
                data-filled={!!emailValue && !errors.email}
                data-disabled={isSubmitting}
                aria-invalid={!!errors.email}
              >
                E-mail
              </FieldLabel>
              <InputGroup data-invalid>
                <InputGroupAddon>
                  <Mail
                    className={cn(
                      'text-gray-400',
                      'group-focus-within:text-brand-base',
                      'aria-[invalid=true]:text-danger',
                      'data-[filled=true]:text-gray-800'
                    )}
                    data-filled={!!emailValue && !errors.email}
                    aria-invalid={!!errors.email}
                  />
                </InputGroupAddon>
                <InputGroupInput
                  className="placeholder:text-base placeholder:text-gray-400 data-filled:text-gray-800"
                  id="email"
                  type="email"
                  placeholder="mail@example.com"
                  data-filled={!!emailValue}
                  {...register('email')}
                />
              </InputGroup>

              {errors.email && (
                <FieldError className="text-danger text-xs">
                  {errors.email.message}
                </FieldError>
              )}
            </Field>

            {/* Password Field */}
            <Field className="group">
              <FieldLabel
                htmlFor="password"
                data-filled={!!passwordValue && !errors.password}
                data-disabled={isSubmitting}
                aria-invalid={!!errors.password}
              >
                Senha
              </FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <Lock
                    className={cn(
                      'text-gray-400',
                      'group-focus-within:text-brand-base',
                      'aria-[invalid=true]:text-danger',
                      'data-[filled=true]:text-gray-800'
                    )}
                    aria-invalid={!!errors.password}
                    data-filled={!!passwordValue && !errors.password}
                  />
                </InputGroupAddon>
                <InputGroupInput
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  data-filled={!!passwordValue}
                  {...register('password')}
                />
                <InputGroupAddon align="inline-end">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-700 transition-colors hover:text-gray-600"
                    aria-label={
                      showPassword ? 'Ocultar senha' : 'Mostrar senha'
                    }
                  >
                    {showPassword ? (
                      <EyeClosed className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </InputGroupAddon>
              </InputGroup>
              {errors.password && (
                <FieldError className="text-danger text-xs">
                  {errors.password.message}
                </FieldError>
              )}
            </Field>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
          </FieldGroup>
        </form>

        <CardFooter className="mt-6 flex flex-col px-0">
          <div className="flex w-full items-center gap-2">
            <hr className="flex-1 text-gray-300" />
            <p className="text-sm text-gray-500">ou</p>
            <hr className="flex-1 text-gray-300" />
          </div>

          <p className="mt-6 mb-4 text-center text-sm text-gray-600">
            Já tem uma conta?
          </p>

          <Button className="w-full" variant={'outline'} asChild>
            <a href="/">
              <LogIn className="text-gray-700" />
              Fazer login
            </a>
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
