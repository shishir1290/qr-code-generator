'use client';
import { useState, useRef } from 'react';
import { generateQRCode } from '@/lib/qr';
import QRDisplay from '../QRDisplay';

export default function AudioTab() {
  const [audioUrl, setAudioUrl] = useState('');
  const [name, setName] = useState('');
  const [qrData, setQrData] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('audio/')) {
      setError('Please select an audio file'); return;
    }
    setFileName(file.name);
    // Convert to data URL so the QR works offline/lifetime
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setAudioUrl(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleGenerate = async () => {
    if (!audioUrl.trim()) { setError('Please provide an audio file or URL'); return; }
    setError('');
    setLoading(true);
    try {
      // If it's a URL (not data URL), use it directly
      const target = audioUrl.startsWith('data:') 
        ? `data:text/html,<audio controls src="${encodeURIComponent(audioUrl)}"></audio>`
        : audioUrl;
      const finalTarget = target.length > 2000 ? audioUrl : target;
      const data = await generateQRCode(finalTarget);
      setQrData(data);
      setGeneratedUrl(finalTarget);
    } catch {
      setError('Audio file may be too large for a QR code. Try using a hosted URL instead.');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        onClick={() => fileRef.current?.click()}
        className="w-full px-4 py-6 border-2 border-dashed border-purple-300 rounded-xl cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-colors text-center bg-purple-50"
      >
        <input
          ref={fileRef}
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
        <span className="text-purple-600 font-medium">
          {fileName ? `✓ ${fileName}` : '⬆ Upload Audio File (drag & drop or click)'}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-gray-400 text-sm">or paste audio URL</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <input
        type="text"
        value={audioUrl.startsWith('data:') ? '' : audioUrl}
        onChange={e => { setAudioUrl(e.target.value); setFileName(''); }}
        placeholder="https://example.com/audio.mp3"
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
        disabled={loading || !audioUrl.trim()}
        className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
      >
        {loading ? 'Generating...' : 'Generate & Download QR'}
      </button>
      {qrData && <QRDisplay qrText={generatedUrl} name={name || 'audio-qr'} />}
    </div>
  );
}
