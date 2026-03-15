export const formatCurrency = (
  amountInCents: number,
  type?: 'income' | 'outcome'
) => {
  const prefix = type === 'income' ? '+' : '-';
  const amountInReal = amountInCents / 100;

  if (!type) {
    return `R$ ${amountInReal.toLocaleString('pt-BR', {
      minimumFractionDigits: 2
    })}`;
  }

  return `${prefix} R$ ${Math.abs(amountInReal).toLocaleString('pt-BR', {
    minimumFractionDigits: 2
  })}`;
};

export const formatCurrencyBRL = (amount: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Convert a string value to BRL (Real Brazilian)
 * @param value - The string value to convert
 * @returns The converted value
 */
export const convertToBRL = (value: string) => {
  const cleanValue = value.replace(/\D/g, '');
  const amountInBRL = Number(cleanValue) / 100;
  return amountInBRL;
};

export const amountToCents = (amount: number) => {
  return Math.round(amount * 100);
};

export const centsToAmount = (cents: number): number => {
  return cents / 100;
};
