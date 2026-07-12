import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DealsRadarUA — Пошук вигідних цін: Rozetka, OLX, Prom',
  description:
    'Моніторинг цін товарів в Україні. Знайдіть найкращі пропозиції на Розетці, OLX та Пром без рекламного шуму.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-zinc-50 text-zinc-900 font-sans antialiased dark:bg-zinc-950 dark:text-zinc-50 flex flex-col">
        {children}
      </body>
    </html>
  );
}
