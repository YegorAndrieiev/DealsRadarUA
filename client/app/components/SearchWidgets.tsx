'use client';
import { useSearchContext } from './SearchContext';

export function SearchResultsCounter() {
  const { totalCount } = useSearchContext();
  return <span>Знайдено результатів: {totalCount}</span>;
}

export function EmptyStateGuard({ children }: { children: React.ReactNode }) {
  const { totalCount, isSearching } = useSearchContext();
  if (!isSearching && totalCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
        <span className="text-4xl">🛰️</span>
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
          Нічого не знайдено
        </h3>
      </div>
    );
  }
  return <>{children}</>;
}