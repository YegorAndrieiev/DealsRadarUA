function LoadingCard() {
  return (
    <div className="flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl overflow-hidden shadow-sm animate-pulse">
      
      <div className="relative p-4 bg-zinc-100 dark:bg-zinc-800/50 flex items-center justify-center h-44 border-b border-zinc-100 dark:border-zinc-800/40">
        <div className="absolute top-2 right-2 w-14 h-4 bg-zinc-200 dark:bg-zinc-700 rounded shadow-sm"></div>
        <div className="text-zinc-200 dark:text-zinc-700 opacity-50">
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="w-16 h-4 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
          <div className="space-y-2">
            <div className="h-3.5 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
            <div className="h-3.5 bg-zinc-200 dark:bg-zinc-800 rounded w-11/12"></div>
            <div className="h-3.5 bg-zinc-200 dark:bg-zinc-800 rounded w-4/5"></div>
          </div>
        </div>
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-baseline">
            <div className="w-8 h-3 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
            <div className="w-24 h-6 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
          </div>
          <div className="w-full h-9 bg-zinc-200 dark:bg-zinc-800 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
export function LoadingSkeletonGrid({ count = 3 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <LoadingCard key={index} />
      ))}
    </>
  );
}