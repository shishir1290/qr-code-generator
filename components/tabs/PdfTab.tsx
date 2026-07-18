'use client';
import { useState } from 'react';
import { generateQRCode } from '@/lib/qr';
import QRDisplay from '../QRDisplay';

export default function PdfTab() {
  const [pdfUrl, setPdfUrl] = useState('');
  const [name, setName] = useState('');
  const [qrData, setQrData] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!pdfUrl.trim()) { setError('Please enter a PDF URL'); return; }
    setError('');
    setLoading(true);
    try {
      const data = await generateQRCode(pdfUrl.trim());
      setQrData(data);
      setGeneratedUrl(pdfUrl.trim());
    } catch {
      setError('Failed to generate QR code');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-700">
        Host your PDF on Google Drive, Dropbox, or any file hosting service and paste the link below.
      </div>
      <input
        type="text"
        value={pdfUrl}
        onChange={e => setPdfUrl(e.target.value)}
        placeholder="https://example.com/document.pdf"
        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 text-gray-700 placeholder-gray-400 bg-white"
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
        disabled={loading || !pdfUrl.trim()}
        className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
      >
        {loading ? 'Generating...' : 'Generate & Download QR'}
      </button>
      {qrData && <QRDisplay qrText={generatedUrl} name={name || 'pdf-qr'} />}
    </div>
  );
}
