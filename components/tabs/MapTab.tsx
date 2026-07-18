'use client';
import { useState } from 'react';
import { generateQRCode } from '@/lib/qr';
import QRDisplay from '../QRDisplay';

export default function MapTab() {
  const [mapsUrl, setMapsUrl] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [name, setName] = useState('');
  const [qrData, setQrData] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    let finalUrl = '';

    if (mapsUrl.trim()) {
      finalUrl = mapsUrl.trim();
    } else if (lat.trim() && lng.trim()) {
      const latNum = parseFloat(lat);
      const lngNum = parseFloat(lng);
      if (isNaN(latNum) || isNaN(lngNum)) {
        setError('Invalid coordinates'); return;
      }
      // Works on both iOS (Apple Maps) and Android (Google Maps)
      finalUrl = `https://maps.google.com/?q=${latNum},${lngNum}`;
    } else {
      setError('Enter a Google Maps link OR latitude & longitude');
      return;
    }

    setError('');
    setLoading(true);
    try {
      const data = await generateQRCode(finalUrl);
      setQrData(data);
      setGeneratedUrl(finalUrl);
    } catch {
      setError('Failed to generate QR code');
    }
    setLoading(false);
  };

  // Auto-fill lat/lng from Google Maps URL
  const handleMapsUrlChange = (value: string) => {
    setMapsUrl(value);
    const match = value.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/);
    if (match) {
      setLat(match[1]);
      setLng(match[2]);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={mapsUrl}
        onChange={e => handleMapsUrlChange(e.target.value)}
        placeholder="Paste a Google Maps link here..."
        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 text-gray-700 placeholder-gray-400 bg-white"
      />
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-gray-400 text-sm">or enter coordinates</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input
          type="number"
          value={lat}
          onChange={e => setLat(e.target.value)}
          placeholder="Latitude"
          step="any"
          className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 text-gray-700 placeholder-gray-400 bg-white"
        />
        <input
          type="number"
          value={lng}
          onChange={e => setLng(e.target.value)}
          placeholder="Longitude"
          step="any"
          className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 text-gray-700 placeholder-gray-400 bg-white"
        />
      </div>
      {lat && lng && (
        <div className="rounded-xl overflow-hidden border border-gray-200 h-48">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(lng)-0.01},${parseFloat(lat)-0.01},${parseFloat(lng)+0.01},${parseFloat(lat)+0.01}&layer=mapnik&marker=${lat},${lng}`}
            title="Map preview"
          />
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
        disabled={loading || (!mapsUrl.trim() && (!lat.trim() || !lng.trim()))}
        className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
      >
        {loading ? 'Generating...' : 'Generate & Download QR'}
      </button>
      {qrData && <QRDisplay qrText={generatedUrl} name={name || 'map-qr'} />}
    </div>
  );
}
