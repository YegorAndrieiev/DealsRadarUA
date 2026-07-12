export default function Home() {
  return (
    <main className="flex flex-col flex-1 items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl text-center space-y-8">
        <div className="space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-50 dark:to-zinc-400 bg-clip-text text-transparent">
            DealsRadar<span className="text-blue-600">UA</span>
          </h1>
          <p className="max-w-md mx-auto text-base text-zinc-600 dark:text-zinc-400">
            Миттєвий пошук товарів на Rozetka, OLX та Prom. Порівнюйте ціни,
            знаходьте пропозиції без реклами та спаму.
          </p>
        </div>
        <form
          action="/search"
          method="GET"
          className="relative mt-8 max-w-xl mx-auto"
        >
          <div className="flex items-center gap-2 p-2 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200/80 dark:border-zinc-800">
            <span className="pl-3 text-zinc-400 text-xl">🔎</span>
            <input
              type="text"
              name="q"
              required
              placeholder="Знайди та купи свій товар вигідно..."
              autoComplete="off"
              className="w-full bg-transparent pl-2 pr-4 py-3 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none text-base sm:text-lg"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 text-sm sm:text-base whitespace-nowrap"
            >
              Знайти
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
