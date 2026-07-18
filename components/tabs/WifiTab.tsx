'use client';
import { useState } from 'react';
import { generateQRCode, buildWifiString } from '@/lib/qr';
import QRDisplay from '../QRDisplay';

const SECURITY_TYPES = ['WPA/WPA2', 'WEP', 'None'];

export default function WifiTab() {
  const [ssid, setSsid] = useState('');
  const [security, setSecurity] = useState('WPA/WPA2');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [qrData, setQrData] = useState('');
  const [generatedStr, setGeneratedStr] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleGenerate = async () => {
    if (!ssid.trim()) { setError('Please enter Wi-Fi name (SSID)'); return; }
    setError('');
    setLoading(true);
    try {
      const secMap: Record<string, string> = { 'WPA/WPA2': 'WPA', 'WEP': 'WEP', 'None': 'nopass' };
      const wifiStr = buildWifiString(ssid.trim(), secMap[security] || 'WPA', password);
      const data = await generateQRCode(wifiStr);
      setQrData(data);
      setGeneratedStr(wifiStr);
    } catch {
      setError('Failed to generate QR code');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={ssid}
        onChange={e => setSsid(e.target.value)}
        placeholder="Wi-Fi SSID (name)"
        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 text-gray-700 placeholder-gray-400 bg-white"
      />
      <select
        value={security}
        onChange={e => setSecurity(e.target.value)}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 text-gray-700 bg-white appearance-none cursor-pointer"
      >
        {SECURITY_TYPES.map(t => <option key={t}>{t}</option>)}
      </select>
      {security !== 'None' && (
        <div className="relative">
          <input
            type={showPass ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 text-gray-700 placeholder-gray-400 bg-white"
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
          >
            {showPass ? 'Hide' : 'Show'}
          </button>
        </div>
      )}
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
        disabled={loading || !ssid.trim()}
        className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
      >
        {loading ? 'Generating...' : 'Generate & Download QR'}
      </button>
      {qrData && <QRDisplay qrText={generatedStr} name={name || 'wifi-qr'} />}
    </div>
  );
}
