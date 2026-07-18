'use client';
import { useState } from 'react';
import QRCustomizer from './QRCustomizer';

interface Props {
  dataUrl?: string;
  qrText?: string;
  name: string;
}

export default function QRDisplay({ dataUrl, qrText, name }: Props) {
  const [copied, setCopied] = useState(false);

  // If we have the raw QR text, display the advanced customizer workspace
  if (qrText) {
    return <QRCustomizer qrText={qrText} name={name} />;
  }

  const handleDownload = (format: 'png' | 'svg') => {
    if (format === 'png' && dataUrl) {
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `${name || 'qr-code'}.png`;
      a.click();
    }
  };

  const handleCopy = async () => {
    if (!dataUrl) return;
    try {
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.open(dataUrl, '_blank');
    }
  };

  return (
    <div className="mt-6 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-shrink-0 p-3 bg-gray-50 rounded-xl border border-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={dataUrl} alt="QR Code" className="w-48 h-48" />
        </div>
        <div className="flex flex-col gap-3 w-full sm:w-auto">
          <h3 className="font-semibold text-gray-800 text-lg">Your QR Code is Ready! 🎉</h3>
          <p className="text-sm text-gray-500">This QR code works <strong>forever</strong> — no expiry, no database needed.</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleDownload('png')}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all shadow-sm text-sm"
            >
              ⬇ Download PNG
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all text-sm"
            >
              {copied ? '✓ Copied!' : '📋 Copy Image'}
            </button>
          </div>
          <p className="text-xs text-gray-400">
            💡 Tip: Print at 300 DPI or larger for best scan results
          </p>
        </div>
      </div>
    </div>
  );
}
