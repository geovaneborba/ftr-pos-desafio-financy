import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function TransactionsSkeleton() {
  return (
    <Card className="gap-0 bg-white pt-0 pb-0 sm:col-span-2">
      <CardHeader className="flex h-[3.75rem] flex-row items-center justify-between border-b border-gray-200 py-0 sm:py-5 sm:pr-3 sm:pl-6">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-20" />
      </CardHeader>
      <CardContent className="p-0">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex h-20 w-full items-center border-b border-gray-200 px-4 py-6 sm:px-6"
          >
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div>
                <Skeleton className="mb-1 h-4 w-24 sm:w-32" />
                <Skeleton className="h-3 w-16 sm:w-20" />
              </div>
            </div>

            <div className="ml-auto hidden items-center justify-center text-center sm:flex sm:w-40 sm:px-6">
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>

            <div className="ml-auto flex shrink-0 items-center gap-2 sm:ml-0">
              <Skeleton className="h-4 w-20 sm:w-24" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>
          </div>
        ))}

        <div className="flex w-full items-center justify-center gap-2 rounded-none rounded-b-lg border-none p-5 px-6 outline-none">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}
