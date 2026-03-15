import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function SummaryCardsSkeleton() {
  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
      <Card className="bg-white p-6">
        <CardHeader className="p-0">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-3 w-24" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Skeleton className="h-8 w-32 sm:h-9 sm:w-40" />
        </CardContent>
      </Card>

      <Card className="bg-white p-6">
        <CardHeader className="p-0">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-3 w-28" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Skeleton className="h-8 w-32 sm:h-9 sm:w-40" />
        </CardContent>
      </Card>

      <Card className="bg-white p-6">
        <CardHeader className="p-0">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-3 w-24" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Skeleton className="h-8 w-32 sm:h-9 sm:w-40" />
        </CardContent>
      </Card>
    </div>
  );
}
