import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { LogOut } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, type ProfileFormData } from '@/schemas/profile-schema';
import { useAuthStore } from '@/stores/auth-store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsernameInitials } from '@/utils/get-username-initials';
import { toast } from 'sonner';

export function Profile() {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email
    }
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile(data.name);
      toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    await navigate('/', { replace: true });
  };

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email
      });
    }
  }, [user, reset]);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Profile */}
        <div className="mx-auto rounded-[.75rem] border border-gray-200 bg-white p-8 sm:max-w-110">
          {/* User info */}
          <div className="flex flex-col items-center">
            <Avatar className="mb-6 size-16">
              <AvatarFallback className="bg-gray-300 text-2xl text-gray-800">
                {user?.name ? getUsernameInitials(user.name) : ''}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold text-gray-800 capitalize">
              {user?.name}
            </h3>
            <p className="text-base text-gray-500">{user?.email}</p>
          </div>

          {/* Separator */}
          <Separator className="my-8" />

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Field>
              <FieldLabel className="text-sm text-gray-700">
                Nome completo
              </FieldLabel>
              <Input type="text" {...register('name')} />
              {errors.name && (
                <FieldError className="text-danger text-sm">
                  {errors.name.message}
                </FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel className="text-sm text-gray-700">E-mail</FieldLabel>
              <Input
                type="email"
                disabled
                className="bg-gray-50"
                {...register('email')}
              />
              <FieldDescription className="text-xs text-gray-500">
                O e-mail não pode ser alterado
              </FieldDescription>
            </Field>

            <div className="mt-8 flex flex-col gap-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Salvando...' : 'Salvar alterações'}
              </Button>
              <Button type="button" variant="outline" onClick={handleLogout}>
                <LogOut className="text-danger size-4" />
                Sair da conta
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
