'use client';
import { useEffect, useRef } from 'react';
import { useSearchContext } from './SearchContext';

export function ProgressReporter({ source, count }: { source: string; count: number }) {
  const { reportSourceDone } = useSearchContext();
  const reported = useRef(false);
  useEffect(() => {
    if (!reported.current) {
      reportSourceDone(source, count);
      reported.current = true;
    }
  }, [source, count, reportSourceDone]);
  return null;
}