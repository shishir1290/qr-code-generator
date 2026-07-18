'use client';
import { useState } from 'react';
import { generateQRCode, buildAppStoreRedirectUrl } from '@/lib/qr';
import QRDisplay from '../QRDisplay';

export default function AppStoreTab() {
  const [iosUrl, setIosUrl] = useState('');
  const [androidUrl, setAndroidUrl] = useState('');
  const [huaweiUrl, setHuaweiUrl] = useState('');
  const [otherUrl, setOtherUrl] = useState('');
  const [name, setName] = useState('');
  const [qrData, setQrData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');

  const handleGenerate = async () => {
    if (!iosUrl.trim() && !androidUrl.trim()) {
      setError('Please enter at least an App Store or Google Play link');
      return;
    }
    setError('');
    setLoading(true);
    try {
      // Use the current origin for the redirect URL
      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://yoursite.com';
      const url = buildAppStoreRedirectUrl(origin, {
        ios: iosUrl.trim() || undefined,
        android: androidUrl.trim() || undefined,
        huawei: huaweiUrl.trim() || undefined,
        other: otherUrl.trim() || undefined,
      });
      setRedirectUrl(url);
      const data = await generateQRCode(url);
      setQrData(data);
    } catch {
      setError('Failed to generate QR code');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-sm text-blue-700">
        <strong>Smart QR:</strong> One QR code — iPhone users go to App Store, Android users go to Google Play automatically!
      </div>

      {[
        { label: 'Link for the App Store (iOS)', value: iosUrl, setter: setIosUrl, placeholder: 'https://apps.apple.com/app/...' },
        { label: 'Link for Google Play (Android)', value: androidUrl, setter: setAndroidUrl, placeholder: 'https://play.google.com/store/apps/...' },
        { label: 'Link for Huawei AppGallery', value: huaweiUrl, setter: setHuaweiUrl, placeholder: 'https://appgallery.huawei.com/...' },
        { label: 'Links for other devices', value: otherUrl, setter: setOtherUrl, placeholder: 'https://...' },
      ].map(({ label, value, setter, placeholder }) => (
        <div key={label}>
          <label className="block text-xs text-gray-500 mb-1 ml-1">{label}</label>
          <input
            type="text"
            value={value}
            onChange={e => setter(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 text-gray-700 placeholder-gray-400 bg-white"
          />
        </div>
      ))}

      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name your QR (optional)"
        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 text-gray-700 placeholder-gray-400 bg-white"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleGenerate}
        disabled={loading || (!iosUrl.trim() && !androidUrl.trim())}
        className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
      >
        {loading ? 'Generating...' : 'Generate Smart QR'}
      </button>

      {qrData && (
        <>
          <QRDisplay qrText={redirectUrl} name={name || 'app-store-qr'} />
          <div className="bg-gray-50 rounded-xl p-3 mt-2">
            <p className="text-xs text-gray-500 mb-1 font-medium">Smart redirect URL (encoded in QR):</p>
            <p className="text-xs text-gray-600 break-all font-mono">{redirectUrl}</p>
          </div>
        </>
      )}
    </div>
  );
}
