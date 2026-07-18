import QRCode from 'qrcode';

export async function generateQRCode(text: string, options?: QRCode.QRCodeToDataURLOptions): Promise<string> {
  return QRCode.toDataURL(text, {
    errorCorrectionLevel: 'H',
    margin: 2,
    width: 300,
    color: {
      dark: '#1a1a2e',
      light: '#ffffff',
    },
    ...options,
  });
}

const KEY = 'qrcustomizersecret';

export function encryptUrl(url: string): string {
  if (!url) return '';
  let hex = '';
  for (let i = 0; i < url.length; i++) {
    const code = url.charCodeAt(i) ^ KEY.charCodeAt(i % KEY.length);
    hex += code.toString(16).padStart(2, '0');
  }
  return hex;
}

export function decryptUrl(hex: string): string {
  if (!hex) return '';
  if (hex.startsWith('http://') || hex.startsWith('https://')) {
    return hex;
  }
  try {
    let url = '';
    for (let i = 0; i < hex.length; i += 2) {
      const part = hex.substring(i, i + 2);
      const code = parseInt(part, 16) ^ KEY.charCodeAt((i / 2) % KEY.length);
      url += String.fromCharCode(code);
    }
    return url;
  } catch (e) {
    console.error('Failed to decrypt URL:', e);
    return hex;
  }
}

export function buildAppStoreRedirectUrl(baseUrl: string, params: {
  ios?: string;
  android?: string;
  huawei?: string;
  other?: string;
}): string {
  const url = new URL('/redirect', baseUrl);
  if (params.ios) url.searchParams.set('ios', encryptUrl(params.ios));
  if (params.android) url.searchParams.set('android', encryptUrl(params.android));
  if (params.huawei) url.searchParams.set('huawei', encryptUrl(params.huawei));
  if (params.other) url.searchParams.set('other', encryptUrl(params.other));
  return url.toString();
}

export function buildWifiString(ssid: string, security: string, password: string): string {
  return `WIFI:T:${security};S:${ssid};P:${password};;`;
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const msg = encodeURIComponent(message);
  return `https://wa.me/${cleaned}${msg ? `?text=${msg}` : ''}`;
}

export function buildMapUrl(lat: string, lng: string): string {
  return `geo:${lat},${lng}?q=${lat},${lng}`;
}
