# Free QR Code Generator

A Next.js QR code generator with 8 types of QR codes — all free, no database, QR codes work forever.

## Features

- **URL / Link** — Any website URL
- **Play Market / App Store (Smart QR)** — One QR, detects device:
  - iPhone → opens App Store
  - Android → opens Google Play
  - Huawei → opens AppGallery
  - Other → fallback URL
- **Text** — Plain or rich text (up to 100,000 chars)
- **Map** — Google Maps link or lat/lng coordinates
- **Wi-Fi** — Scan to connect (WPA/WPA2, WEP, Open)
- **Audio** — Upload file or paste hosted URL
- **PDF** — Paste hosted PDF link
- **WhatsApp** — Direct chat with pre-filled message

## How QR codes work forever (no database)

All data is encoded **directly into the QR code**. For the App Store Smart QR, it encodes a redirect URL pointing to `/redirect` on YOUR deployed domain. The redirect page reads the device's user-agent and sends users to the right store.

> ⚠️ **Important for App Store QR**: After deploying, the redirect URL will use your real domain, so those QR codes will work permanently as long as your site is live.

## Setup & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
npm start
```

## Deploy

Deploy to Vercel (recommended):
```bash
npx vercel
```

Or any platform that supports Next.js.
