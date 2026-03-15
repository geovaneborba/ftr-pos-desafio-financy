import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';

import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { generateMonthPeriods } from '@/utils/generate-periods';

import { Category } from '@/types';

type TransactionFiltersProps = {
  categories: Category[];
};

export function TransactionFilters({ categories }: TransactionFiltersProps) {
  const [searchParam, setSearchParam] = useSearchParams();
  const [description, setDescription] = useState(
    searchParam.get('description') || undefined
  );
  const periods = generateMonthPeriods();

  const handleUpdateSearchParams = useCallback(
    (key: string, value: string) => {
      setSearchParam((prevSearchParams) => {
        const newParams = new URLSearchParams(prevSearchParams);

        if (value === 'all') {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }

        return newParams.toString();
      });
    },
    [setSearchParam]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (description) {
        handleUpdateSearchParams('description', description);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [description, handleUpdateSearchParams]);

  return (
    <form className="grid grid-cols-1 gap-4 rounded-xl border border-gray-200 bg-white px-6 py-5 sm:grid-cols-3 lg:grid-cols-4">
      {/* Search */}
      <Field>
        <FieldLabel className="text-sm font-medium text-gray-700">
          Buscar
        </FieldLabel>
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            placeholder="Buscar por descrição"
            className="bg-card border-border h-10 pl-9"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </Field>

      {/* Type */}
      <Field>
        <FieldLabel className="text-sm font-medium text-gray-700">
          Tipo
        </FieldLabel>
        <Select
          name={'type'}
          value={searchParam.get('type') || 'all'}
          onValueChange={(value) => handleUpdateSearchParams('type', value)}
        >
          <SelectTrigger className="bg-card border-border h-10">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="income">Entrada</SelectItem>
            <SelectItem value="outcome">Saída</SelectItem>
          </SelectContent>
        </Select>
      </Field>

      {/* Category */}
      <Field>
        <FieldLabel className="text-sm font-medium text-gray-700">
          Categoria
        </FieldLabel>

        <Select
          name={'categoryId'}
          onValueChange={(value) =>
            handleUpdateSearchParams('categoryId', value)
          }
        >
          <SelectTrigger className="bg-card border-border h-10">
            <SelectValue placeholder="Todas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>

            {categories.map((category) => (
              <SelectItem
                key={category.id}
                value={category.id}
                className="capitalize"
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      {/* Period */}
      <Field>
        <FieldLabel className="text-sm font-medium text-gray-700">
          Período
        </FieldLabel>
        <Select
          name={'period'}
          onValueChange={(value) => handleUpdateSearchParams('period', value)}
        >
          <SelectTrigger className="bg-card border-border h-10">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {periods.map((period) => (
              <SelectItem
                className="capitalize"
                key={period.value}
                value={period.value}
              >
                {period.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
    </form>
  );
}
