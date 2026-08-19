'use client';
import { useState, useRef } from 'react';
import { generateQRCode } from '@/lib/qr';
import QRDisplay from '../QRDisplay';
import { Upload, Check } from 'lucide-react';

export default function AudioTab() {
  const [audioUrl, setAudioUrl] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [qrData, setQrData] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('audio/') && !file.name.match(/\.(mp3|wav|ogg|m4a|aac|wma|flac)$/i)) {
      setError('Please select a valid audio file (MP3, WAV, etc.)');
      return;
    }
    setError('');
    setFileName(file.name);
    setAudioFile(file);
    setAudioUrl(''); // Clear URL if file is selected
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleGenerate = async () => {
    if (!audioUrl.trim() && !audioFile) { 
      setError('Please provide an audio file or URL'); 
      return; 
    }
    setError('');
    setLoading(true);

    try {
      let finalTarget = '';

      if (audioFile) {
        // Upload the audio file to the local API
        const formData = new FormData();
        formData.append('file', audioFile);
        if (name.trim()) {
          formData.append('title', name.trim());
        } else {
          formData.append('title', audioFile.name);
        }

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!uploadRes.ok) {
          const errData = await uploadRes.json();
          throw new Error(errData.error || 'Failed to upload audio file');
        }

        const resData = await uploadRes.json();
        // Construct full URL including origin
        finalTarget = window.location.origin + resData.url;
      } else {
        // Use the pasted URL directly
        finalTarget = audioUrl.trim();
      }

      const data = await generateQRCode(finalTarget);
      setQrData(data);
      setGeneratedUrl(finalTarget);
    } catch (err: any) {
      console.error('Generation failed:', err);
      setError(err.message || 'Failed to generate QR code. The audio file may be too large or there was a server error.');
    } finally {
      setLoading(false);
    }
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
        <span className="text-purple-600 font-medium flex items-center justify-center gap-2">
          {fileName ? (
            <>
              <Check className="h-4 w-4 text-purple-700" />
              <span>{fileName}</span>
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 text-purple-700" />
              <span>Upload Audio File (drag & drop or click)</span>
            </>
          )}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-250" />
        <span className="text-gray-400 text-sm">or paste audio URL</span>
        <div className="flex-1 h-px bg-gray-250" />
      </div>

      <input
        type="text"
        value={audioUrl}
        onChange={e => { setAudioUrl(e.target.value); setFileName(''); setAudioFile(null); }}
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
        disabled={loading || (!audioUrl.trim() && !audioFile)}
        className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
      >
        {loading ? 'Generating...' : 'Generate & Download QR'}
      </button>
      {qrData && <QRDisplay qrText={generatedUrl} name={name || 'audio-qr'} />}
    </div>
  );
}
