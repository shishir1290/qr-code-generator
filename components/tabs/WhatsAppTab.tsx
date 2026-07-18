'use client';
import { useState } from 'react';
import { generateQRCode, buildWhatsAppUrl } from '@/lib/qr';
import QRDisplay from '../QRDisplay';

export default function WhatsAppTab() {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [qrData, setQrData] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!phone.trim()) { setError('Please enter a phone number'); return; }
    setError('');
    setLoading(true);
    try {
      const waUrl = buildWhatsAppUrl(phone.trim(), message.trim());
      const data = await generateQRCode(waUrl);
      setQrData(data);
      setGeneratedUrl(waUrl);
    } catch {
      setError('Failed to generate QR code');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs text-gray-500 mb-1 ml-1">Phone number (with country code)</label>
        <input
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="+8801XXXXXXXXX"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 text-gray-700 placeholder-gray-400 bg-white"
        />
      </div>
      <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Pre-filled message (optional)"
        rows={3}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 text-gray-700 placeholder-gray-400 bg-white resize-none"
      />
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
        disabled={loading || !phone.trim()}
        className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
      >
        {loading ? 'Generating...' : 'Generate & Download QR'}
      </button>
      {qrData && <QRDisplay qrText={generatedUrl} name={name || 'whatsapp-qr'} />}
    </div>
  );
}
