import { ComponentProps, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Lock,
  Eye,
  EyeClosed,
  CheckCircle,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/utils/utils';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

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
  ResetPasswordFormData,
  resetPasswordFormSchema
} from '@/schemas/reset-password-schema';
import { useMutation } from '@apollo/client/react';
import { RESET_PASSWORD_MUTATION } from '@/lib/graphql/mutations/auth/reset-password';

type ResetPasswordFormProps = ComponentProps<'div'>;

export function ResetPasswordForm({
  className,
  ...props
}: ResetPasswordFormProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD_MUTATION, {
    onCompleted: () => {
      setIsSuccess(true);
    },
    onError: (error: any) => {
      setError(error.message || 'Erro ao redefinir senha');
    }
  });

  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordFormSchema)
  });

  const passwordValue = watch('newPassword');
  const confirmPasswordValue = watch('confirmPassword');

  useEffect(() => {
    if (!token) {
      setError('Token de redefinição não fornecido');
    }
  }, [token]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      setError('Token de redefinição não fornecido');
      return;
    }

    try {
      setError(null);
      await resetPassword({
        variables: {
          data: {
            token,
            newPassword: data.newPassword
          }
        }
      });
    } catch (error: any) {
      setError(error.message || 'Erro ao redefinir senha');
    }
  };

  if (error) {
    return (
      <Card className={cn(className)} {...props}>
        <CardHeader className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="size-8 text-red-600" />
          </div>
          <CardTitle className="text-xl font-bold text-gray-800">
            Erro
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            {error}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 size-4" />
            Voltar para o login
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isSuccess) {
    return (
      <Card className={cn(className)} {...props}>
        <CardHeader className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="size-8 text-green-600" />
          </div>
          <CardTitle className="text-xl font-bold text-gray-800">
            Senha redefinida
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            Sua senha foi redefinida com sucesso. Você já pode fazer login com a
            nova senha.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={() => navigate('/')}>
            Fazer login
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(className)} {...props}>
      <CardHeader className="mb-8 text-center">
        <CardTitle className="text-xl font-bold text-gray-800">
          Redefinir senha
        </CardTitle>
        <CardDescription className="text-base text-gray-600">
          Digite sua nova senha abaixo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* New Password Field */}
            <Field className="group">
              <FieldLabel
                htmlFor="newPassword"
                data-filled={!!passwordValue && !errors.newPassword}
                data-disabled={isSubmitting}
                aria-invalid={!!errors.newPassword}
              >
                Nova senha
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
                    data-filled={!!passwordValue && !errors.newPassword}
                    aria-invalid={!!errors.newPassword}
                  />
                </InputGroupAddon>
                <InputGroupInput
                  className="placeholder:text-base placeholder:text-gray-400 data-filled:text-gray-800"
                  id="newPassword"
                  type="password"
                  placeholder="Digite sua nova senha"
                  data-filled={!!passwordValue}
                  {...register('newPassword')}
                />
              </InputGroup>

              {errors.newPassword && (
                <FieldError className="text-xs text-gray-500">
                  {errors.newPassword.message}
                </FieldError>
              )}
            </Field>

            {/* Confirm Password Field */}
            <Field className="group">
              <FieldLabel
                htmlFor="confirmPassword"
                data-filled={!!confirmPasswordValue && !errors.confirmPassword}
                data-disabled={isSubmitting}
                aria-invalid={!!errors.confirmPassword}
              >
                Confirmar nova senha
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
                    data-filled={
                      !!confirmPasswordValue && !errors.confirmPassword
                    }
                    aria-invalid={!!errors.confirmPassword}
                  />
                </InputGroupAddon>
                <InputGroupInput
                  className="placeholder:text-base placeholder:text-gray-400 data-filled:text-gray-800"
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirme sua nova senha"
                  data-filled={!!confirmPasswordValue}
                  {...register('confirmPassword')}
                />
              </InputGroup>

              {errors.confirmPassword && (
                <FieldError className="text-xs text-gray-500">
                  {errors.confirmPassword.message}
                </FieldError>
              )}
            </Field>

            <Button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full"
            >
              {isSubmitting || loading ? 'Redefinindo...' : 'Redefinir senha'}
            </Button>
          </FieldGroup>
        </form>

        <CardFooter className="mt-6 px-0">
          <Button
            variant="ghost"
            className="w-full text-gray-600 hover:text-gray-800"
            asChild
          >
            <Link to="/">
              <ArrowLeft className="mr-2 size-4" />
              Voltar para o login
            </Link>
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
