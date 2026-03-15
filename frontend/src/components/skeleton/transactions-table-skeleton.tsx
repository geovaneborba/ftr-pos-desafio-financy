import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

export function TransactionsTableSkeleton() {
  return (
    <div className="border-border bg-card rounded-xl border">
      {/* Desktop Table */}
      <div className="hidden lg:block">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-xs font-medium tracking-[.0375rem] text-gray-500 uppercase">
                Descrição
              </TableHead>
              <TableHead className="text-center text-xs font-medium tracking-[.0375rem] text-gray-500 uppercase">
                Data
              </TableHead>
              <TableHead className="text-center text-xs font-medium tracking-[.0375rem] text-gray-500 uppercase">
                Categoria
              </TableHead>
              <TableHead className="text-center text-xs font-medium tracking-[.0375rem] text-gray-500 uppercase">
                Tipo
              </TableHead>
              <TableHead className="text-right text-xs font-medium tracking-[.0375rem] text-gray-500 uppercase">
                Valor
              </TableHead>
              <TableHead className="text-right text-xs font-medium tracking-[.0375rem] text-gray-500 uppercase">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index} className="hover:bg-muted/30">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="mx-auto h-4 w-20" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="mx-auto h-6 w-24 rounded-full" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="ml-auto h-4 w-20" />
                </TableCell>
                <TableCell className="pr-6">
                  <div className="flex items-center justify-end gap-1">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="border-b border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="flex-1">
                <Skeleton className="mb-2 h-4 w-32" />
                <Skeleton className="mb-2 h-3 w-20" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="border-border flex flex-col items-center justify-between gap-3 border-t px-4 py-3 sm:flex-row sm:px-6">
        <Skeleton className="h-4 w-32" />
        <div className="flex items-center gap-1">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
}
