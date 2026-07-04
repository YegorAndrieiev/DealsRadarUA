export const dynamic = "force-dynamic";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  link: string;
  source: "Rozetka" | "OLX" | "Prom";
  isUsed: boolean;
  conditionDetails?: string;
}
async function getBackendData(query: string): Promise<Product[]> {
  if (!query) return [];
  try {
    const res = await fetch(`http://localhost:5000/api/search?query=${encodeURIComponent(query)}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Backend error");
    return await res.json();
  } catch (error) {
    console.error("Connection error with the Node.js server:", error);
    return [];
  }
}
interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";
  const products = await getBackendData(query);
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4 justify-between">
          <a href="/" className="text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 hover:opacity-80 transition">
            DealsRadar<span className="text-blue-600">UA</span>
          </a>
          <form action="/search" method="GET" className="w-full sm:max-w-md relative">
            <input
              type="text"
              name="q"
              defaultValue={query}
              required
              placeholder="Шукати інший товар..."
              className="w-full bg-zinc-100 dark:bg-zinc-850 pl-10 pr-4 py-2 rounded-xl text-sm border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none transition-all"
            />
            <span className="absolute left-3 top-2.5 text-zinc-400 text-sm">🔎</span>
          </form>
        </div>
      </header>
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-5">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            Результати пошуку за запитом: <span className="text-blue-600">«{query}»</span>
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Знайдено результатів: {products.length}
          </p>
        </div>
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
            <span className="text-4xl">🛰️</span>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Нічого не знайдено</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((item) => (
              <div 
                key={item.id} 
                className="group flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-350"
              >
                <div className="relative p-4 bg-zinc-50 dark:bg-zinc-800/20 flex items-center justify-center h-44 border-b border-zinc-100 dark:border-zinc-800/40">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="max-h-full max-w-full object-contain group-hover:scale-102 transition duration-300" 
                  />
                  <span className={`absolute top-2 right-2 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded shadow-sm text-white ${
                    item.source === "Rozetka" ? "bg-green-600" :
                    item.source === "OLX" ? "bg-sky-500" : "bg-indigo-600"
                  }`}>
                    {item.source}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        item.isUsed 
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400" 
                          : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400"
                      }`}>
                        {item.isUsed ? "Б/У" : "НОВЕ"}
                      </span>
                      {item.conditionDetails && (
                        <span className="text-[11px] text-zinc-400 truncate max-w-[140px]" title={item.conditionDetails}>
                          {item.conditionDetails}
                        </span>
                      )}
                    </div>
                    <h4 className="font-medium text-zinc-900 dark:text-zinc-50 text-sm line-clamp-2 leading-snug group-hover:text-blue-600 transition">
                      {item.title}
                    </h4>
                  </div>
                  <div className="space-y-2 pt-1">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-zinc-400">Ціна</span>
                      <span className="text-xl font-black text-zinc-900 dark:text-zinc-50">
                        {item.price.toLocaleString("uk-UA")} <span className="text-sm font-bold text-blue-600">₴</span>
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
          </div>
        )}
      </main>
    </div>
  );
}