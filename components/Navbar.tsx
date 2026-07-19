'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, QrCode, Search, Award } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const isSeo = pathname.startsWith('/seo-tools');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/70 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/70 transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo / Brand */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md shadow-indigo-500/10 group-hover:scale-105 transition-transform duration-200">
              {isSeo ? <Search className="h-5 w-5" /> : <QrCode className="h-5 w-5" />}
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                {isSeo ? 'SEO Radar' : 'QR Generator'}
              </span>
              <span className="mt-1 text-[10px] font-medium text-indigo-600 dark:text-indigo-400 leading-none">
                Ultimate Tool Suite
              </span>
            </div>
          </Link>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                !isSeo
                  ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white'
              }`}
            >
              <QrCode className="h-4 w-4" />
              QR Code Generator
            </Link>
            <Link
              href="/seo-tools"
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                isSeo
                  ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white'
              }`}
            >
              <Search className="h-4 w-4" />
              SEO & Google Ranking
            </Link>
          </nav>
        </div>

        {/* Action Button / Badges */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-400 animate-pulse">
            <Sparkles className="h-3 w-3" />
            100% Free & Unlimited
          </div>
          
          {/* Simple toggle for mobile view, always showing icons */}
          <div className="flex md:hidden items-center gap-1 bg-slate-100 dark:bg-slate-900 rounded-lg p-0.5">
            <Link
              href="/"
              title="QR Code Generator"
              className={`p-2 rounded-md ${
                !isSeo
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <QrCode className="h-4 w-4" />
            </Link>
            <Link
              href="/seo-tools"
              title="SEO & Google Ranking Tools"
              className={`p-2 rounded-md ${
                isSeo
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <Search className="h-4 w-4" />
            </Link>
          </div>

          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-500/20 transition-all hover:shadow-lg active:scale-95"
          >
            <Award className="h-3.5 w-3.5" />
            Rank No.1
          </a>
        </div>
      </div>
    </header>
  );
}
