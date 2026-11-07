'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  Link2, Smartphone, FileText, MapPin, Wifi, Music, File, MessageCircle,
  ShieldCheck, Lock, Zap, ArrowRight, Sparkles, CheckCircle2
} from 'lucide-react';
import Footer from '@/components/Footer';

const UrlTab = dynamic(() => import('@/components/tabs/UrlTab'), { ssr: false });
const AppStoreTab = dynamic(() => import('@/components/tabs/AppStoreTab'), { ssr: false });
const TextTab = dynamic(() => import('@/components/tabs/TextTab'), { ssr: false });
const MapTab = dynamic(() => import('@/components/tabs/MapTab'), { ssr: false });
const WifiTab = dynamic(() => import('@/components/tabs/WifiTab'), { ssr: false });
const AudioTab = dynamic(() => import('@/components/tabs/AudioTab'), { ssr: false });
const PdfTab = dynamic(() => import('@/components/tabs/PdfTab'), { ssr: false });
const WhatsAppTab = dynamic(() => import('@/components/tabs/WhatsAppTab'), { ssr: false });

const TABS = [
  { id: 'url', label: 'Website URL', short: 'URL', icon: Link2 },
  { id: 'appstore', label: 'App Store', short: 'Apps', icon: Smartphone },
  { id: 'text', label: 'Plain Text', short: 'Text', icon: FileText },
  { id: 'map', label: 'Location', short: 'Map', icon: MapPin },
  { id: 'wifi', label: 'Wi-Fi', short: 'Wi-Fi', icon: Wifi },
  { id: 'audio', label: 'Audio', short: 'Audio', icon: Music },
  { id: 'pdf', label: 'PDF', short: 'PDF', icon: File },
  { id: 'whatsapp', label: 'WhatsApp', short: 'Chat', icon: MessageCircle },
];

const benefits = [
  { icon: ShieldCheck, title: 'Private by design', desc: 'Your QR content is processed in your browser. No account or upload is needed for standard QR creation.' },
  { icon: Zap, title: 'Ready in seconds', desc: 'Create, customize and download your QR code with a simple workflow.' },
  { icon: Smartphone, title: 'Made for every screen', desc: 'Use the QR maker comfortably on desktop, tablet or mobile.' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('url');

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <div aria-hidden="true" className="pointer-events-none absolute -top-48 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px] dark:bg-indigo-500/15" />
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-[700px] h-80 w-80 rounded-full bg-violet-500/5 blur-[100px]" />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16">
        <section className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm dark:border-indigo-400/20 dark:bg-slate-900/80 dark:text-indigo-300">
            <Sparkles className="h-3.5 w-3.5" />
            Free online QR code maker
          </div>
          <h1 className="mb-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
            Create a QR code
            <span className="mt-1 block bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent dark:from-indigo-400 dark:via-violet-400 dark:to-fuchsia-400">
              for anything.
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-400">
            Generate free, custom QR codes for websites, Wi-Fi networks, text, maps, WhatsApp, apps, audio and PDFs. Customize your design and download in just a few clicks.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> No signup required</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Free to use</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Instant generation</span>
          </div>
        </section>

        <section id="qr-generator" aria-label="QR code generator" className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white/90 shadow-[0_24px_80px_-35px_rgba(30,41,59,0.28)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-[0_24px_90px_-35px_rgba(79,70,229,0.25)]">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4 dark:border-slate-800 sm:px-7">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">QR code creator</h2>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Choose what you want to share</p>
            </div>
            <span className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300 sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Ready to create
            </span>
          </div>
          <div role="tablist" aria-label="QR code type" className="scrollbar-hide flex overflow-x-auto border-b border-slate-200 bg-slate-50/80 px-2 dark:border-slate-800 dark:bg-slate-950/40 sm:px-4">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="qr-tab-panel"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex shrink-0 items-center gap-2 border-b-2 px-3.5 py-4 text-sm font-semibold transition-colors sm:px-4 ${isActive
                    ? 'border-indigo-600 bg-white text-indigo-700 dark:border-indigo-400 dark:bg-slate-900 dark:text-indigo-300'
                    : 'border-transparent text-slate-500 hover:bg-white/70 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900/60 dark:hover:text-white'}`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.short}</span>
                </button>
              );
            })}
          </div>
          <div id="qr-tab-panel" role="tabpanel" aria-labelledby={`tab-${activeTab}`} className="p-5 sm:p-8 lg:p-9">
            {activeTab === 'url' && <UrlTab />}
            {activeTab === 'appstore' && <AppStoreTab />}
            {activeTab === 'text' && <TextTab />}
            {activeTab === 'map' && <MapTab />}
            {activeTab === 'wifi' && <WifiTab />}
            {activeTab === 'audio' && <AudioTab />}
            {activeTab === 'pdf' && <PdfTab />}
            {activeTab === 'whatsapp' && <WhatsAppTab />}
          </div>
        </section>

        <section className="mt-12 grid gap-4 sm:grid-cols-3" aria-label="QR Studio benefits">
          {benefits.map(({ icon: Icon, title, desc }) => (
            <article key={title} className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm transition-transform hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900/60">
              <div className="mb-4 inline-flex rounded-xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-300"><Icon className="h-5 w-5" /></div>
              <h3 className="mb-2 font-bold text-slate-900 dark:text-white">{title}</h3>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">{desc}</p>
            </article>
          ))}
        </section>

        <section className="mx-auto mt-16 max-w-3xl" aria-labelledby="how-it-works">
          <div className="mb-8 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">Simple workflow</p>
            <h2 id="how-it-works" className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-white">How to create a QR code</h2>
          </div>
          <ol className="grid gap-5 sm:grid-cols-3">
            {[
              ['01', 'Choose a QR type', 'Select a website, Wi-Fi, text, map, WhatsApp or another format.'],
              ['02', 'Add your information', 'Enter the content you want people to open or read when they scan.'],
              ['03', 'Customize and download', 'Style your QR code, preview it and save it to your device.'],
            ].map(([number, title, desc]) => (
              <li key={number} className="flex gap-3 sm:block sm:text-center">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-xs font-bold text-white sm:mx-auto sm:mb-3">{number}</span>
                <div><h3 className="mb-1 font-bold text-slate-900 dark:text-white">{title}</h3><p className="text-sm leading-6 text-slate-600 dark:text-slate-400">{desc}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mx-auto mt-14 max-w-3xl rounded-2xl border border-slate-200 bg-white/70 p-6 dark:border-slate-800 dark:bg-slate-900/50">
          <h2 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">What can you create with this free QR code generator?</h2>
          <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
            QR Studio helps you share digital information with a quick scan. Make a website QR code for marketing materials, a Wi-Fi QR code for guests, a WhatsApp QR code for customer support, a map QR code for directions, or a text QR code for notes and instructions. You can also create QR codes for app downloads, hosted audio and PDF documents—all from one easy online QR code maker.
          </p>
          <a href="#qr-generator" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
            Start creating a QR code <ArrowRight className="h-4 w-4" />
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
