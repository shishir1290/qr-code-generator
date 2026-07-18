import { NextRequest, NextResponse } from 'next/server';
import { decryptUrl } from '@/lib/qr';

function parseAndroidUrl(urlStr: string): { custom: string; fallback: string } {
  if (!urlStr) return { custom: '', fallback: '' };
  try {
    const url = new URL(urlStr);
    if (url.hostname.includes('play.google.com')) {
      const id = url.searchParams.get('id');
      if (id) {
        return {
          custom: `market://details?id=${id}`,
          fallback: urlStr
        };
      }
    }
  } catch {}
  return { custom: urlStr, fallback: urlStr };
}

function parseIosUrl(urlStr: string): { custom: string; fallback: string } {
  if (!urlStr) return { custom: '', fallback: '' };
  try {
    const url = new URL(urlStr);
    if (url.hostname.includes('apps.apple.com') || url.hostname.includes('itunes.apple.com')) {
      const match = url.pathname.match(/\/id(\d+)/);
      if (match && match[1]) {
        return {
          custom: `itms-apps://itunes.apple.com/app/id${match[1]}`,
          fallback: urlStr
        };
      }
    }
  } catch {}
  return { custom: urlStr, fallback: urlStr };
}

function parseHuaweiUrl(urlStr: string): { custom: string; fallback: string } {
  if (!urlStr) return { custom: '', fallback: '' };
  try {
    const url = new URL(urlStr);
    if (url.hostname.includes('appgallery.huawei.com')) {
      const match = url.pathname.match(/\/app\/(C\d+)/);
      if (match && match[1]) {
        return {
          custom: `appmarket://app/${match[1]}`,
          fallback: urlStr
        };
      }
    }
  } catch {}
  return { custom: urlStr, fallback: urlStr };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ios = decryptUrl(searchParams.get('ios') || '');
  const android = decryptUrl(searchParams.get('android') || '');
  const huawei = decryptUrl(searchParams.get('huawei') || '');
  const other = decryptUrl(searchParams.get('other') || '');

  const userAgent = request.headers.get('user-agent') || '';

  const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !/Windows Phone/i.test(userAgent);
  const isAndroid = /android/i.test(userAgent);
  const isHuawei = /huawei|honor/i.test(userAgent);

  // If it's a desktop user, perform an immediate server-side HTTP 307 redirect
  if (!isIOS && !isAndroid && !isHuawei) {
    const desktopFallback = other || android || ios || '/';
    return NextResponse.redirect(desktopFallback, 307);
  }

  // Determine custom app scheme and standard web fallbacks
  let customUrl = '';
  let fallbackUrl = '';
  let storeName = 'App Store';
  let storeIcon = '📱';

  if (isIOS && ios) {
    const parsed = parseIosUrl(ios);
    customUrl = parsed.custom;
    fallbackUrl = parsed.fallback;
    storeName = 'App Store';
    storeIcon = '🍎';
  } else if (isHuawei && huawei) {
    const parsed = parseHuaweiUrl(huawei);
    customUrl = parsed.custom;
    fallbackUrl = parsed.fallback;
    storeName = 'AppGallery';
    storeIcon = '📱';
  } else if (isAndroid && android) {
    const parsed = parseAndroidUrl(android);
    customUrl = parsed.custom;
    fallbackUrl = parsed.fallback;
    storeName = 'Google Play';
    storeIcon = '🤖';
  } else {
    // If no platform-specific URL is configured, use standard fallback
    const defaultUrl = other || android || ios || '/';
    return NextResponse.redirect(defaultUrl, 307);
  }

  // If we couldn't parse/find a valid URL, fallback
  if (!customUrl && !fallbackUrl) {
    return NextResponse.redirect(other || android || ios || '/', 307);
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Redirecting to ${storeName}...</title>
  <style>
    :root {
      --primary: #9333ea;
      --primary-hover: #7e22ce;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #f3e8ff 0%, #fce7f3 50%, #e0f2fe 100%);
      padding: 20px;
      color: #1f2937;
    }
    .card {
      background: rgba(255, 255, 255, 0.75);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.4);
      padding: 40px 30px;
      border-radius: 24px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
      text-align: center;
      max-width: 400px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
      animation: fadeIn 0.6s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .spinner-container {
      position: relative;
      width: 80px;
      height: 80px;
    }
    .spinner {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 64px;
      height: 64px;
      margin: 8px;
      border: 6px solid var(--primary);
      border-radius: 50%;
      animation: spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: var(--primary) transparent transparent transparent;
    }
    .spinner:nth-child(1) { animation-delay: -0.45s; }
    .spinner:nth-child(2) { animation-delay: -0.3s; }
    .spinner:nth-child(3) { animation-delay: -0.15s; }
    @keyframes spinner {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .logo-badge {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 28px;
      line-height: 1;
    }
    h1 {
      font-size: 22px;
      font-weight: 700;
      color: #111827;
    }
    p {
      font-size: 15px;
      color: #4b5563;
      line-height: 1.5;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 14px 28px;
      background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
      color: white;
      text-decoration: none;
      font-weight: 600;
      font-size: 15px;
      border-radius: 14px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(168, 85, 247, 0.25);
    }
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(168, 85, 247, 0.35);
    }
    .btn:active {
      transform: translateY(0);
    }
    .footer {
      font-size: 12px;
      color: #9ca3af;
    }
  </style>
  <script>
    var customUrl = ${JSON.stringify(customUrl)};
    var fallbackUrl = ${JSON.stringify(fallbackUrl)};

    // Immediately attempt to open native app via custom URI scheme
    if (customUrl) {
      window.location.replace(customUrl);
    }

    // Set a fallback timeout to open standard web store link in case custom scheme doesn't work
    var fallbackTimeout = setTimeout(function() {
      window.location.replace(fallbackUrl);
    }, 1500);

    // Cancel fallback redirection if page visibility changes (i.e. user left browser to open store app)
    document.addEventListener("visibilitychange", function() {
      if (document.hidden) {
        clearTimeout(fallbackTimeout);
      }
    });
  </script>
</head>
<body>
  <div class="card">
    <div class="spinner-container">
      <div class="spinner"></div>
      <div class="spinner"></div>
      <div class="spinner"></div>
      <div class="logo-badge">${storeIcon}</div>
    </div>
    <div>
      <h1>Opening ${storeName}...</h1>
      <p>We are opening the application store. If it doesn't open automatically, please click the button below.</p>
    </div>
    <a href="${customUrl}" class="btn" id="open-btn">Open Store App</a>
    <div class="footer">
      Powered by QR Generator
    </div>
  </div>
  <script>
    // If user manually clicks the button, also make sure we fallback to web if the app isn't installed
    document.getElementById('open-btn').addEventListener('click', function() {
      setTimeout(function() {
        window.location.href = fallbackUrl;
      }, 500);
    });
  </script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    },
  });
}
