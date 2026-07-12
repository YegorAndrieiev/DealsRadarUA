'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition, useEffect } from 'react';
import { useSearchContext } from './SearchContext';

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [isPending, startTransition] = useTransition();
  const { isSearching } = useSearchContext();
  const isBusy = isPending || isSearching;
  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    startTransition(() => {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full sm:max-w-md relative">
      <style>{`
        @keyframes waveShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-wave {
          background: linear-gradient(90deg, transparent 30%, rgba(37, 99, 235, 0.15) 50%, transparent 70%);
          background-size: 200% 100%;
          animation: waveShimmer 2.5s infinite linear;
        }
      `}</style>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Шукати інший товар..."
        autoComplete="off"
        disabled={isBusy}
        className={`w-full bg-zinc-100 dark:bg-zinc-850 pl-10 pr-20 py-2 rounded-xl text-sm border border-transparent text-zinc-900 dark:text-zinc-100 focus:outline-none transition-all ${
          isBusy 
            ? 'opacity-70 dark:bg-zinc-800' 
            : 'focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-900'
        }`}
      />
      {isBusy && (
        <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden animate-wave" />
      )}
      <span className="absolute left-3 top-2.5 text-zinc-400 text-sm select-none">
        {isBusy ? (
          <span className="inline-block animate-[spin_2.5s_linear_infinite]">⏳</span>
        ) : (
          '🔎'
        )}
      </span>
    </form>
  );
}