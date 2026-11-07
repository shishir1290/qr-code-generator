# QR Studio — Free QR Code Generator

QR Studio is a Next.js application for creating and customizing QR codes for common sharing needs. It also includes a business card designer and a collection of website SEO utilities.

## QR code types

- **Website URL** — create a QR code for a web address.
- **App Store / Play Store** — create a smart app-download QR flow.
- **Text** — encode plain text.
- **Map** — share a Google Maps location or coordinates.
- **Wi-Fi** — share network connection details.
- **Audio** — link to hosted audio or upload an audio file for the supported flow.
- **PDF** — create a QR code for a hosted PDF.
- **WhatsApp** — open a chat with an optional pre-filled message.

Additional tools include a customizable QR designer, business card designer and SEO utilities.

## Privacy and QR durability

Standard QR data is encoded directly into the generated QR code and is not stored in an application database. Smart app-download QR codes use this site's redirect route, so those links depend on the deployment remaining available.

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- qrcode

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run lint
npm run build
npm start
```

## SEO deployment configuration

Set `NEXT_PUBLIC_SITE_URL` to the canonical public origin before deployment, for example:

```env
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
```

The global metadata uses this value for canonical and social metadata. Update `public/robots.txt` and `public/sitemap.xml` if the production domain differs from the current default. Submit the sitemap in Google Search Console and verify the domain there.

## Deploy

Deploy on Vercel or another platform that supports Next.js. Configure the production domain and environment variable before launch.
