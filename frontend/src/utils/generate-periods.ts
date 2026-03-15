import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';

export interface PeriodOption {
  label: string;
  value: string;
}

export function generateMonthPeriods(): PeriodOption[] {
  const currentYear = new Date().getFullYear();

  const lastYearMonths = Array.from({ length: 12 }).map((_, i) => {
    const date = new Date(currentYear - 1, i, 1);
    const month = `${format(date, 'LLLL', { locale: ptBR })}`;
    const year = `${format(date, 'yyyy')}`;

    return {
      label: `${month} / ${year}`,
      value: format(date, 'MM/yyyy')
    };
  });

  const currentYearMonths = Array.from({ length: 12 }).map((_, i) => {
    const date = new Date(currentYear, i, 1);
    const month = `${format(date, 'LLLL', { locale: ptBR })}`;
    const year = `${format(date, 'yyyy')}`;

    return {
      label: `${month} / ${year}`,
      value: format(date, 'MM/yyyy')
    };
  });

  return [...lastYearMonths, ...currentYearMonths];
}
