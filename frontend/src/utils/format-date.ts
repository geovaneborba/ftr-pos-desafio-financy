export function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('pt-br', {
    timeZone: 'UTC'
  });
}

export function formatDateISO(date: Date) {
  return new Date(date).toISOString();
}
