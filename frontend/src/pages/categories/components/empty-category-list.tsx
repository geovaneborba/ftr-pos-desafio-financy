export function EmptyCategoryList() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center space-y-2 p-8 text-center">
      <p className="text-sm text-gray-500 sm:text-lg">
        Nenhuma categoria encontrada
      </p>
      <p className="text-xs text-gray-400 sm:text-sm">
        Crie categorias para organizar melhor suas transações
      </p>
    </div>
  );
}
