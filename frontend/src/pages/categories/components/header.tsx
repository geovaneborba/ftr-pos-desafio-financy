import { CreateCategoryDialog } from './create-category-dialog';

export function Header() {
  return (
    <header className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Categorias</h2>
        <p className="text-sm text-gray-600">
          Organize suas transações por categoria
        </p>
      </div>

      <CreateCategoryDialog />
    </header>
  );
}
