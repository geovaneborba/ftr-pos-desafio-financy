import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from '@/components/ui/dialog';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { categorySchema, CategoryFormData } from '@/schemas/category-schema';

import { cn } from '@/utils/utils';
import { iconMap, iconNames } from '@/constants/icons';
import { colorMap, colorVariants } from '@/constants/colors';
import { useMutation } from '@apollo/client/react';
import { CREATE_CATEGORY_MUTATION } from '@/lib/graphql/mutations/category/create-category';
import { LIST_CATEGORIES } from '@/lib/graphql/queries/category';

export function CreateCategoryDialog() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      description: '',
      icon: iconNames[0],
      color: colorVariants[0]
    }
  });

  const [createCategory, { loading }] = useMutation(CREATE_CATEGORY_MUTATION, {
    refetchQueries: [LIST_CATEGORIES],
    onCompleted: () => {
      setDialogOpen(false);
      reset();
      toast.success('Categoria criada com sucesso!');
    },
    onError: (error) => {
      toast.error('Erro ao criar categoria. Tente novamente.');
    }
  });

  const onSubmit = async (data: CategoryFormData) => {
    await createCategory({
      variables: {
        data: {
          name: data.name,
          description: data.description,
          icon: data.icon,
          color: data.color
        }
      }
    });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button size={'sm'}>
          <Plus className="text-white" />
          <span className="text-sm font-medium text-white">Nova categoria</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] w-[95vw] gap-0 overflow-y-auto sm:max-w-[448px]">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-base font-semibold text-gray-800">
            Nova categoria
          </DialogTitle>
          <DialogDescription className="text-xs text-gray-600 sm:text-sm">
            Organize suas transações com categorias
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          {/* Name */}
          <Field>
            <FieldLabel
              htmlFor="name"
              className="text-sm text-gray-700 sm:text-base"
            >
              Título
            </FieldLabel>
            <Input
              id="name"
              placeholder="Ex: Alimentação"
              className="text-sm sm:text-base"
              {...register('name')}
            />
            {errors.name && (
              <FieldError className="text-danger mt-1 text-xs">
                {errors.name.message}
              </FieldError>
            )}
          </Field>

          {/* Description */}
          <Field>
            <FieldLabel htmlFor="description" className="text-sm sm:text-base">
              Descrição
            </FieldLabel>
            <Input
              id="description"
              placeholder="Descrição da categoria"
              className="text-sm sm:text-base"
              {...register('description')}
            />

            <FieldDescription className="text-xs text-gray-500 capitalize">
              opcional
            </FieldDescription>
            {errors.description && (
              <FieldError className="text-danger mt-1 text-xs">
                {errors.description.message}
              </FieldError>
            )}
          </Field>

          {/* Icon  */}
          <Field>
            <FieldLabel htmlFor="icon" className="text-sm sm:text-base">
              Ícone
            </FieldLabel>

            <Controller
              name="icon"
              control={control}
              render={({ field }) => (
                <div id="icon" className="flex flex-wrap gap-1 sm:gap-2">
                  {iconNames.map((iconName) => {
                    const Icon = iconMap[iconName];

                    return (
                      <Button
                        key={iconName}
                        type="button"
                        variant={'outline'}
                        onClick={() => field.onChange(iconName)}
                        className={cn(
                          'size-10.5',
                          field.value === iconName
                            ? 'border-brand-base'
                            : 'border-gray-300'
                        )}
                      >
                        <Icon />
                      </Button>
                    );
                  })}
                </div>
              )}
            />

            {errors.icon && (
              <FieldError className="text-danger mt-1 text-xs">
                {errors.icon.message as string}
              </FieldError>
            )}
          </Field>

          {/* Color */}
          <Field>
            <FieldLabel htmlFor="color" className="text-sm sm:text-base">
              Cor
            </FieldLabel>

            <Controller
              name="color"
              control={control}
              render={({ field }) => (
                <div id="color" className="mt-2 flex flex-wrap gap-2">
                  {colorVariants.map((colorVariant) => {
                    const colorClass = colorMap[colorVariant];

                    return (
                      <Button
                        type="button"
                        key={colorVariant}
                        variant={'outline'}
                        onClick={() => field.onChange(colorVariant)}
                        className={cn(
                          'h-[30px] w-[50px] rounded-[8px] p-2',
                          field.value === colorVariant
                            ? 'border-brand-base'
                            : 'border-gray-300'
                        )}
                      >
                        <span
                          className={cn(colorClass, 'h-5 w-10 rounded-[4px]')}
                        ></span>
                      </Button>
                    );
                  })}
                </div>
              )}
            />

            {errors.color && (
              <FieldError className="text-danger mt-1 text-xs">
                {errors.color.message as string}
              </FieldError>
            )}
          </Field>

          <Button
            className="w-full text-sm text-white sm:text-base"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
