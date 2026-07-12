'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextType {
  totalCount: number;
  loadedSources: string[];
  isSearching: boolean;
  reportSourceDone: (source: string, count: number) => void;
}

const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children, totalExpected }: { children: ReactNode, totalExpected: number }) {
  const [totalCount, setTotalCount] = useState(0);
  const [loadedSources, setLoadedSources] = useState<string[]>([]);
  const reportSourceDone = (source: string, count: number) => {
    setLoadedSources((prev) => {
      if (prev.includes(source)) return prev;
      return [...prev, source];
    });
    setTotalCount((prev) => prev + count);
  };
  const isSearching = loadedSources.length < totalExpected;
  return (
    <SearchContext.Provider value={{ totalCount, loadedSources, isSearching, reportSourceDone }}>
      {children}
    </SearchContext.Provider>
  );
}
export function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context) throw new Error('useSearchContext must be used within SearchProvider');
  return context;
}