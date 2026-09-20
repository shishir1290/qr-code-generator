'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { 
  Link2, Smartphone, FileText, MapPin, Wifi, Music, File, MessageCircle, 
  ShieldCheck, Lock 
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
  { id: 'url', label: 'URL / Link', icon: Link2 },
  { id: 'appstore', label: 'Play Market / App Store', icon: Smartphone },
  { id: 'text', label: 'Text', icon: FileText },
  { id: 'map', label: 'Map', icon: MapPin },
  { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
  { id: 'audio', label: 'Audio', icon: Music },
  { id: 'pdf', label: 'PDF', icon: File },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('url');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-600 dark:selection:text-indigo-200 relative overflow-hidden transition-colors duration-300">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-purple-500/5 dark:bg-purple-50/5 blur-[100px] pointer-events-none" />

      <main className="max-w-5xl mx-auto px-4 py-10 relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-100 dark:to-slate-400 bg-clip-text text-transparent mb-3">
            Free QR Code Generator
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto">
            Create QR codes that work forever — URLs, apps, Wi-Fi, maps, and more. No sign-up, no limits, completely free.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden backdrop-blur-md shadow-xl dark:shadow-2xl shadow-slate-200/50 dark:shadow-indigo-950/10 transition-all duration-300">
          <div className="flex overflow-x-auto border-b border-slate-200 dark:border-slate-800">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-4 text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 border-b-2 cursor-pointer ${
                    isActive
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-500/5'
                      : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-900/50'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-indigo-500 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-6 sm:p-8">
            {activeTab === 'url' && <UrlTab />}
            {activeTab === 'appstore' && <AppStoreTab />}
            {activeTab === 'text' && <TextTab />}
            {activeTab === 'map' && <MapTab />}
            {activeTab === 'wifi' && <WifiTab />}
            {activeTab === 'audio' && <AudioTab />}
            {activeTab === 'pdf' && <PdfTab />}
            {activeTab === 'whatsapp' && <WhatsAppTab />}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: ShieldCheck, title: 'Works Forever', desc: 'QR codes never expire. Static data encoded directly — no server dependency.' },
            { icon: Lock, title: 'No Account Needed', desc: 'Generate and download instantly. We never store your data.' },
            { icon: Smartphone, title: 'Smart App QR', desc: 'One QR → iPhone opens App Store, Android opens Google Play automatically.' },
          ].map(f => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-md shadow-slate-100 dark:shadow-none flex items-start gap-4 backdrop-blur-sm transition-all duration-300">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 rounded-xl flex-shrink-0">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">{f.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-normal">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
