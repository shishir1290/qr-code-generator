'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { 
  Link2, Smartphone, FileText, MapPin, Wifi, Music, File, MessageCircle, 
  ShieldCheck, Lock 
} from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30">
      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Free QR Code Generator</h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Create QR codes that work forever — URLs, apps, Wi-Fi, maps, and more. No sign-up, no limits, completely free.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex overflow-x-auto border-b border-gray-100">
            {TABS.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-4 text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 border-b-2 ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600 bg-purple-50/50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4 text-purple-500" />
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
              <div key={f.title} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-start gap-4">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl flex-shrink-0">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-normal">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <footer className="text-center py-8 text-sm text-gray-400 mt-8">
        <p>Free QR Generator · All codes are permanent · No ads · No tracking</p>
      </footer>
    </div>
  );
}
