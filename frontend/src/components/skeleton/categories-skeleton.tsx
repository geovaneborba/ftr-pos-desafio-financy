import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function CategoriesSkeleton() {
  return (
    <Card className="gap-0 self-start bg-white pt-0">
      <CardHeader className="flex h-[3.75rem] flex-row items-center justify-between border-b border-gray-200 py-0 sm:py-5 sm:pr-3 sm:pl-6">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center rounded-lg">
              <Skeleton className="h-6 w-20 rounded-full sm:w-24" />
              <Skeleton className="ml-auto h-4 w-16 min-w-16 sm:w-20 sm:min-w-24" />
              <Skeleton className="h-4 w-16 min-w-16 text-right font-semibold sm:w-20 sm:min-w-20" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
