import { useQuery } from '@apollo/client/react';
import { CircleArrowDown, CircleArrowUp, Wallet } from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { SummaryCardsSkeleton } from '@/components/skeleton';
import { formatCurrency } from '@/utils/format-currency';

import {
  GET_TOTAL_BALANCE,
  GET_TOTAL_EXPENSE,
  GET_TOTAL_INCOME,
  GetTotalBalanceResponse,
  GetTotalExpenseResponse,
  GetTotalIncomeResponse
} from '@/lib/graphql/queries/transaction';

export function SummaryCards() {
  const { data: dataBalance, loading: loadingBalance } =
    useQuery<GetTotalBalanceResponse>(GET_TOTAL_BALANCE);
  const { data: dataIncome, loading: loadingIncome } =
    useQuery<GetTotalIncomeResponse>(GET_TOTAL_INCOME);
  const { data: dataExpense, loading: loadingExpense } =
    useQuery<GetTotalExpenseResponse>(GET_TOTAL_EXPENSE);

  const isLoading = loadingBalance || loadingIncome || loadingExpense;

  if (isLoading) {
    return <SummaryCardsSkeleton />;
  }

  const totalBalance = dataBalance?.getTotalBalance || 0;
  const totalIncome = dataIncome?.getTotalIncome || 0;
  const totalExpense = dataExpense?.getTotalExpense || 0;

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
      <Card className="bg-white p-6">
        <CardHeader className="p-0">
          <div className="flex items-center gap-2">
            <Wallet className="text-purple-base" />
            <p className="text-xs font-medium text-gray-500 uppercase">
              saldo total
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <span className="text-xl font-bold text-gray-800 sm:text-[1.75rem]">
            {formatCurrency(totalBalance)}
          </span>
        </CardContent>
      </Card>

      <Card className="bg-white p-6">
        <CardHeader className="p-0">
          <div className="flex items-center gap-2">
            <CircleArrowUp className="text-green-base" />
            <p className="text-xs font-medium text-gray-500 uppercase">
              receita do mês
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <span className="text-xl font-bold text-gray-800 sm:text-[1.75rem]">
            {formatCurrency(totalIncome)}
          </span>
        </CardContent>
      </Card>

      <Card className="bg-white p-6">
        <CardHeader className="p-0">
          <div className="flex items-center gap-2">
            <CircleArrowDown className="text-danger" />
            <p className="text-xs font-medium text-gray-500 uppercase">
              despesas do mês
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <span className="text-xl font-bold text-gray-800 sm:text-[1.75rem]">
            {formatCurrency(totalExpense)}
          </span>
        </CardContent>
      </Card>
    </div>
  );
}
