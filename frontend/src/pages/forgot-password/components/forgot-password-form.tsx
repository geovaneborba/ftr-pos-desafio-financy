import { ComponentProps, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { cn } from '@/utils/utils';
import { Link, useNavigate } from 'react-router-dom';

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
  ForgotPasswordFormData,
  forgotPasswordFormSchema
} from '@/schemas/forgot-password-schema';
import { useMutation } from '@apollo/client/react';
import { FORGOT_PASSWORD_MUTATION } from '@/lib/graphql/mutations/auth/forgot-password';

type ForgotPasswordFormProps = ComponentProps<'div'>;

export function ForgotPasswordForm({
  className,
  ...props
}: ForgotPasswordFormProps) {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD_MUTATION, {
    onCompleted: () => {
      setIsSuccess(true);
    },
    onError: (error) => {
      console.error('Forgot password failed:', error);
    }
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordFormSchema)
  });

  const emailValue = watch('email');

  const onSubmit = async (data: ForgotPasswordFormData) => {
    await forgotPassword({
      variables: {
        data: data
      }
    });
  };

  if (isSuccess) {
    return (
      <Card className={cn(className)} {...props}>
        <CardHeader className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="size-8 text-green-600" />
          </div>
          <CardTitle className="text-xl font-bold text-gray-800">
            E-mail enviado
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            Se o e-mail existir em nossa base de dados, você receberá um link
            para redefinir sua senha.
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

  return (
    <Card className={cn(className)} {...props}>
      <CardHeader className="mb-8 text-center">
        <CardTitle className="text-xl font-bold text-gray-800">
          Recuperar senha
        </CardTitle>
        <CardDescription className="text-base text-gray-600">
          Digite seu e-mail para receber um link de redefinição de senha
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

            <Button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full"
            >
              {isSubmitting || loading
                ? 'Enviando...'
                : 'Enviar link de recuperação'}
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
