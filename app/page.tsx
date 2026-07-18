'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const UrlTab = dynamic(() => import('@/components/tabs/UrlTab'), { ssr: false });
const AppStoreTab = dynamic(() => import('@/components/tabs/AppStoreTab'), { ssr: false });
const TextTab = dynamic(() => import('@/components/tabs/TextTab'), { ssr: false });
const MapTab = dynamic(() => import('@/components/tabs/MapTab'), { ssr: false });
const WifiTab = dynamic(() => import('@/components/tabs/WifiTab'), { ssr: false });
const AudioTab = dynamic(() => import('@/components/tabs/AudioTab'), { ssr: false });
const PdfTab = dynamic(() => import('@/components/tabs/PdfTab'), { ssr: false });
const WhatsAppTab = dynamic(() => import('@/components/tabs/WhatsAppTab'), { ssr: false });

const TABS = [
  { id: 'url', label: 'URL / Link', icon: '🔗' },
  { id: 'appstore', label: 'Play Market / App Store', icon: '📱' },
  { id: 'text', label: 'Text', icon: '≡' },
  { id: 'map', label: 'Map', icon: '📍' },
  { id: 'wifi', label: 'Wi-Fi', icon: '📶' },
  { id: 'audio', label: 'Audio', icon: '🎵' },
  { id: 'pdf', label: 'PDF', icon: '📄' },
  { id: 'whatsapp', label: 'WhatsApp', icon: '💬' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('url');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">QR</div>
            <span className="font-bold text-gray-800 text-lg">QR Generator</span>
            <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">100% Free</span>
          </div>
          <p className="text-xs text-gray-500 hidden sm:block">All QR codes work forever · No account needed</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Free QR Code Generator</h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Create QR codes that work forever — URLs, apps, Wi-Fi, maps, and more. No sign-up, no limits, completely free.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex overflow-x-auto border-b border-gray-100">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-4 text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 border-b-2 ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600 bg-purple-50/50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
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
            { icon: '♾️', title: 'Works Forever', desc: 'QR codes never expire. Static data encoded directly — no server dependency.' },
            { icon: '🔒', title: 'No Account Needed', desc: 'Generate and download instantly. We never store your data.' },
            { icon: '📱', title: 'Smart App QR', desc: 'One QR → iPhone opens App Store, Android opens Google Play automatically.' },
          ].map(f => (
            <div key={f.title} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="text-center py-8 text-sm text-gray-400 mt-8">
        <p>Free QR Generator · All codes are permanent · No ads · No tracking</p>
      </footer>
    </div>
  );
}
