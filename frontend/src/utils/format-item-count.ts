export const formatItemCount = (count: number) => {
  if (count === 0) {
    return 'nenhum item';
  }

  return `${count} ${count === 1 ? 'item' : 'itens'}`;
};
