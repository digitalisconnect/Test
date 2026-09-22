# Monmenu.fr

Monmenu.fr is a B2B SaaS that lets independent restaurant owners build a beautiful, mobile-first digital menu in minutes and share it with a QR code on every table. Owners manage categories, dishes, prices, allergens and availability from a simple dashboard, then publish a branded public menu page that updates instantly. A single plan at €9.99 per month covers one venue with unlimited dishes and menu updates.

## Running it

```bash
npm install
npm run dev
```

## Pages

- `/` — Marketing landing page that explains the digital menu product and drives restaurant owners to sign up.
- `/pricing` — Presents the single €9.99/month plan, what it includes, and answers common purchase questions.
- `/contact` — Lets a restaurant owner send a question or request a guided setup call.
- `/signup` — Creates a demo workspace for a restaurant and sends the owner to the dashboard.
- `/login` — Signs an existing owner back into their menu dashboard.
- `/dashboard` — Overview of the venue with menu health, scan activity and quick actions.
- `/dashboard/menu` — Create, edit, reorder and hide categories and dishes that make up the published menu.
- `/dashboard/appearance` — Choose colours, cover photo, fonts and layout for the public menu and preview it live.
- `/dashboard/qr` — Generate, preview and download the table QR code and copy the public menu link.
- `/dashboard/settings` — Edit restaurant name, address, contact details, languages and opening hours.
- `/dashboard/billing` — Show the current €9.99/month subscription, invoices and payment method placeholder.
- `/m/[slug]` — The guest-facing digital menu opened by scanning the table QR code.
- `/legal/terms` — Plain-language terms covering the subscription and acceptable use.
- `/legal/privacy` — Explains what data the service stores about venues and guests.

## Configuration

Copy `.env.example` to `.env.local` and fill in the values. No secret is
committed to this repository.
