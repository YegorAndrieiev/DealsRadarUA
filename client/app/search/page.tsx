import Link from 'next/link';
import { Suspense } from 'react';
import SearchInput from '../components/SearchInput';
import { ProductSourceSection } from '../components/ProductSourceSection';
import { SearchProvider } from '../components/SearchContext';
import { SearchResultsCounter, EmptyStateGuard } from '../components/SearchWidgets';
import { LoadingSkeletonGrid } from '../components/LoadingCard';
export const dynamic = 'force-dynamic';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || '';
  return (
    <SearchProvider key={query} totalExpected={3}>
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4 justify-between">
          <Link
            href="/"
            className="text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 hover:opacity-80 transition"
          >
            DealsRadar<span className="text-blue-600">UA</span>
          </Link>
          <Suspense fallback={<div className="w-full sm:max-w-md h-9 bg-zinc-100 dark:bg-zinc-850 rounded-xl animate-pulse" />}>
            <SearchInput />
          </Suspense>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-5">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            Результати пошуку за запитом:{' '}
            <span className="text-blue-600">«{query}»</span>
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            <SearchResultsCounter />
          </p>
        </div>
        <EmptyStateGuard>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <Suspense fallback={<LoadingSkeletonGrid count={3}/>}>
                <ProductSourceSection query={query} source="rozetka" />
              </Suspense>
              
              <Suspense fallback={<LoadingSkeletonGrid count={3}/>}>
                <ProductSourceSection query={query} source="prom" />
              </Suspense>
              
              <Suspense fallback={<LoadingSkeletonGrid count={3}/>}>
                <ProductSourceSection query={query} source="olx" />
              </Suspense>
            </div>
        </EmptyStateGuard>
      </main>
    </div>
    </SearchProvider>
  );
}