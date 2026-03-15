import { useQuery } from '@apollo/client/react';
import {
  LIST_TRANSACTIONS,
  ListTransactionsResponse
} from '@/lib/graphql/queries/transaction';

import { useSearchParams } from 'react-router-dom';
import { PaginationInfo } from '@/types/filters';

export function useTransactions() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    description: searchParams.get('description') || undefined,
    type: searchParams.get('type') || undefined,
    categoryId: searchParams.get('categoryId') || undefined,
    period: searchParams.get('period') || undefined,
    page: Number(searchParams.get('page') || '1'),
    limit: Number(searchParams.get('limit') || '10')
  };

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => {
      prev.set('page', String(page));
      return prev;
    });
  };

  const { data, loading } = useQuery<ListTransactionsResponse>(
    LIST_TRANSACTIONS,
    {
      variables: { filters }
    }
  );

  const transactions = data?.listTransactions?.transactions || [];

  const pagination: PaginationInfo = {
    totalCount: data?.listTransactions?.totalCount || 0,
    currentPage: data?.listTransactions?.currentPage || 1,
    totalPages: data?.listTransactions?.totalPages || 0,
    limit: data?.listTransactions?.limit || 10
  };

  return {
    transactions,
    pagination,
    handlePageChange,
    loading
  };
}
