export function CategorySummarySkeleton() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex gap-4 rounded-[12px] border border-gray-200 bg-white p-6"
        >
          <div className="size-8 animate-pulse rounded bg-gray-200" />
          <div className="flex-1">
            <div className="h-8 w-16 animate-pulse rounded bg-gray-200" />
            <div className="mt-2 h-4 w-32 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
