import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import { ReactNode, useState } from 'react';
import { useMutation, useApolloClient } from '@apollo/client/react';
import { toast } from 'sonner';

import { Category } from '@/types';
import { DELETE_CATEGORY_MUTATION } from '@/lib/graphql/mutations/category/delete-category';
import { iconMap } from '@/constants/icons';
import { cn } from '@/utils/utils';
import { colorMap } from '@/constants/colors';

type DeleteCategoryDialogProps = {
  category: Category;
  children: ReactNode;
};

export function DeleteCategoryDialog({
  category,
  children
}: DeleteCategoryDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const client = useApolloClient();

  const [deleteCategory, { loading }] = useMutation(DELETE_CATEGORY_MUTATION, {
    onCompleted: () => {
      // Atualizar o cache manualmente para remover a categoria
      client.cache.modify({
        fields: {
          listCategories(existingCategories = [], { readField }) {
            return existingCategories.filter(
              (categoryRef: any) => category.id !== readField('id', categoryRef)
            );
          }
        }
      });

      setDialogOpen(false);
      toast.success('Categoria excluída com sucesso!');
    },
    onError: (error) => {
      toast.error('Erro ao excluir categoria. Tente novamente.');
    }
  });

  const handleDelete = async () => {
    await deleteCategory({
      variables: {
        categoryId: category.id
      }
    });
  };

  const Icon = iconMap[category.icon];

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[95vw] sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-semibold text-gray-800">
            Confirmar Exclusão
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="mb-4 text-sm text-gray-600">
            Tem certeza que deseja excluir esta categoria?
          </p>

          <div className="space-y-2 rounded-lg bg-gray-100 p-3">
            {/* Título */}
            <div className="flex justify-between text-sm">
              <h3 className="text-gray-500">Título:</h3>
              <span className="font-medium text-gray-800 capitalize">
                {category.name}
              </span>
            </div>

            {/* Descrição */}
            <div className="flex justify-between text-sm">
              <h3 className="text-gray-500">Descrição:</h3>
              <p className="font-medium text-gray-800 capitalize">
                {category.description}
              </p>
            </div>

            {/* Icon */}
            <div className="flex justify-between text-sm">
              <h3 className="text-gray-500">Icone:</h3>
              <span className="font-medium text-gray-800">
                <Icon />
              </span>
            </div>

            {/* Color */}
            <div className="flex justify-between text-sm">
              <h3 className="text-gray-500">Cor:</h3>

              <span
                className={cn('size-4 rounded-full', colorMap[category.color])}
              ></span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setDialogOpen(false)}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            className="bg-danger hover:bg-danger/90 flex-1 text-white"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Excluindo...' : 'Excluir'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
