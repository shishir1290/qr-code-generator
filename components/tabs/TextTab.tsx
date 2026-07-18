'use client';
import { useState } from 'react';
import { generateQRCode } from '@/lib/qr';
import QRDisplay from '../QRDisplay';

export default function TextTab() {
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [qrData, setQrData] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!text.trim()) { setError('Please enter some text'); return; }
    setError('');
    setLoading(true);
    try {
      const data = await generateQRCode(text.trim());
      setQrData(data);
      setGeneratedText(text.trim());
    } catch {
      setError('Failed to generate QR code');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter your text here..."
          maxLength={100000}
          rows={5}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 text-gray-700 placeholder-gray-400 bg-white resize-none"
        />
        <span className="absolute bottom-3 right-3 text-xs text-gray-400">{text.length}/100000</span>
      </div>
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
        disabled={loading || !text.trim()}
        className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
      >
        {loading ? 'Generating...' : 'Generate & Download QR'}
      </button>
      {qrData && <QRDisplay qrText={generatedText} name={name || 'text-qr'} />}
    </div>
  );
}
