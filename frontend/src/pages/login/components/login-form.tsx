import { ComponentProps, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, UserRoundPlus, Eye, EyeClosed } from 'lucide-react';
import { cn } from '@/utils/utils';
import { Link } from 'react-router-dom';
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

import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

import { LoginFormData, loginFormSchema } from '@/schemas/auth-schema';
import { useAuthStore } from '@/stores/auth-store';
import { useNavigate } from 'react-router-dom';

type LoginFormProps = ComponentProps<'div'>;

export function LoginForm({ className, ...props }: LoginFormProps) {
  const navigate = useNavigate();
  const { signIn } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema)
  });

  const emailValue = watch('email');
  const passwordValue = watch('password');

  const onSubmit = async (data: LoginFormData) => {
    try {
      await signIn(data);
      await navigate('/dashboard', { replace: true });
    } catch {
      toast.error(
        'Falha ao fazer login. Verifique suas credenciais ou tente novamente mais tarde.'
      );
    }
  };

  return (
    <Card className={cn(className)} {...props}>
      <CardHeader className="mb-8 text-center">
        <CardTitle className="text-xl font-bold text-gray-800">
          Fazer login
        </CardTitle>
        <CardDescription className="text-base text-gray-600">
          Entre na sua conta para continuar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
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
              <InputGroup>
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
                <FieldError className="text-xs text-gray-500">
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
                  className="placeholder:text-base placeholder:text-gray-400 data-filled:text-gray-800"
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
                <FieldError className="text-xs text-gray-500">
                  {errors.password.message}
                </FieldError>
              )}
            </Field>

            {/* Remember Me Field */}
            <Controller
              control={control}
              name="rememberMe"
              render={({ field }) => {
                return (
                  <Field orientation="horizontal">
                    <Checkbox
                      id="remember-me"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FieldLabel
                      htmlFor="remember-me"
                      className="text-sm text-gray-700 max-[321px]:text-xs"
                    >
                      Lembrar-me
                    </FieldLabel>

                    <Link
                      to="/forgot-password"
                      className="text-brand-base text-sm font-medium transition-all hover:underline max-[325px]:text-xs"
                    >
                      Recuperar senha
                    </Link>
                  </Field>
                );
              }}
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Entrando...' : 'Entrar'}
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
            Ainda não tem uma conta?
          </p>

          <Button className="w-full" variant={'outline'} asChild>
            <a href="/register">
              <UserRoundPlus className="text-gray-700" />
              Criar conta
            </a>
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
