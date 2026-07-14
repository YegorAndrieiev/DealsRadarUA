const BASE_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
import Image from 'next/image';
import { ProgressReporter } from './ProgressReporter';
interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  link: string;
  source: 'Rozetka' | 'OLX' | 'Prom';
  isUsed: boolean;
  conditionDetails?: string;
}
async function fetchSourceData(query: string, source: 'rozetka' | 'prom' | 'olx'): Promise<Product[]> {
  if (!query) return [];
  try {
    const res = await fetch(
      `${BASE_URL}api/search/${source}?query=${encodeURIComponent(query)}`,
      { cache: 'no-store' },
    );
    if (!res.ok) throw new Error(`Backend error for ${source}`);
    return await res.json();
  } catch (error) {
    console.error(`Connection error with ${source}:`, error);
    return [];
  }
}
export async function ProductSourceSection({ query, source }: { query: string; source: 'rozetka' | 'prom' | 'olx' }) {
  const products = await fetchSourceData(query, source); 
  if (products.length === 0) return null;
  return (
    <>
      {products.map((item) => (
            <div
            key={item.id}
            className="group flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-350"
            >
            <div className="relative p-4 bg-zinc-50 dark:bg-zinc-800/20 flex items-center justify-center h-44 border-b border-zinc-100 dark:border-zinc-800/40">
                <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-contain group-hover:scale-102 transition duration-300"
                unoptimized
                />
                <span
                className={`absolute top-2 right-2 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded shadow-sm text-white ${
                    item.source === 'Rozetka'
                    ? 'bg-green-600'
                    : item.source === 'OLX'
                        ? 'bg-sky-500'
                        : 'bg-indigo-600'
                }`}
                >
                {item.source}
                </span>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                    <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        item.isUsed
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400'
                    }`}
                    >
                    {item.isUsed ? 'Вживане' : 'НОВЕ'}
                    </span>
                </div>
                <h4 className="font-medium text-zinc-900 dark:text-zinc-50 text-sm line-clamp-3 leading-snug group-hover:text-blue-600 transition">
                    {item.title}
                </h4>
                </div>
                <div className="space-y-2 pt-1">
                <div className="flex justify-between items-baseline">
                    <span className="text-xs text-zinc-400">Ціна</span>
                    <span className="text-xl font-black text-zinc-900 dark:text-zinc-50">
                    {item.price.toLocaleString('uk-UA')}{' '}
                    <span className="text-sm font-bold text-blue-600">
                        ₴
                    </span>
                    </span>
                </div>
                <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-semibold py-2 rounded-xl transition text-xs shadow-sm active:scale-[0.98]"
                >
                    Дивитись товар
                </a>
                </div>
            </div>
            </div>
        ))}
        <ProgressReporter source={source} count={products.length} />
    </>
  );
}