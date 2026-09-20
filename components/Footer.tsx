'use client';

import Link from 'next/link';
import { 
  QrCode, 
  CreditCard, 
  Search, 
  ShieldCheck, 
  Zap, 
  Lock, 
  Heart,
  Sparkles,
  Smartphone,
  Wifi,
  FileText
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t border-slate-200 dark:border-slate-850/80 bg-slate-100/60 dark:bg-slate-950/70 backdrop-blur-xl transition-colors duration-300">
      {/* Decorative gradient glow on top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          
          {/* Brand & Mission (Spans 2 cols on lg) */}
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
                <QrCode className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                  QR Generator
                </span>
                <span className="mt-1 text-[10px] font-medium text-indigo-600 dark:text-indigo-400 leading-none">
                  Ultimate Tool Suite
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Create permanent, custom-styled QR codes, generate 300 DPI business cards, and analyze SEO performance. 100% free, private, and client-side.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                Zero Tracking
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                <Zap className="h-3.5 w-3.5" />
                Works Forever
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-1 text-xs font-medium text-purple-600 dark:text-purple-400">
                <Sparkles className="h-3.5 w-3.5" />
                100% Free
              </span>
            </div>
          </div>

          {/* Column 1: QR Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              QR Generators
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Smartphone className="h-3.5 w-3.5 opacity-60" />
                  App Store & Play QR
                </Link>
              </li>
              <li>
                <Link href="/" className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Wifi className="h-3.5 w-3.5 opacity-60" />
                  Wi-Fi Network QR
                </Link>
              </li>
              <li>
                <Link href="/" className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 opacity-60" />
                  Text & Plain URLs
                </Link>
              </li>
              <li>
                <Link href="/" className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 opacity-60" />
                  Custom Color & Frame
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Design & SEO */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Creative & SEO
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/card-designer" className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <CreditCard className="h-3.5 w-3.5 opacity-60" />
                  Business Card Studio
                </Link>
              </li>
              <li>
                <Link href="/card-designer" className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors">
                  Print-Ready 300 DPI
                </Link>
              </li>
              <li>
                <Link href="/seo-tools" className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Search className="h-3.5 w-3.5 opacity-60" />
                  SEO Radar & Audits
                </Link>
              </li>
              <li>
                <Link href="/seo-tools" className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors">
                  Meta Tag Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust & Privacy */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Privacy First
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-emerald-500 opacity-80" />
                <span>No Server Storage</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 opacity-80" />
                <span>No Third-Party Ads</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-indigo-500 opacity-80" />
                <span>Client-Side Render</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-purple-500 opacity-80" />
                <span>Static & Permanent</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 dark:border-slate-800/80 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
            © {new Date().getFullYear()} QR Code Generator Suite · Free forever with no limits.
          </p>

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-medium text-slate-700 dark:text-slate-300">All Systems Operational</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span>Client-Side Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
