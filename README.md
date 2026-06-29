# Barber MVP — reusable demo website

A polished, **fully responsive one-page barbershop website** built with **Next.js 14 (App Router)** and **TailwindCSS**, designed as a **template you re-skin per shop**. Generate a demo for any barber lead, send it to the owner, and pitch the paid build.

Sections: sticky nav · cinematic hero · services & pricing · about + stats · meet-the-barbers (with live "available today" badges) · **interactive booking** (pick service → barber → date → time slot) · gallery · reviews · location + hours + live map · contact form · footer. Plus a mobile sticky call/book bar and a dismissible "we built this for you" pitch banner.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

`npm run build && npm start` for a production build.

## Re-skin for a new shop — only 2 files

This is the whole point: **one content file + one colour block.**

### 1. Content — [`config/shop.ts`](config/shop.ts)
Everything on the page reads from this single object: name, phone, address, services, barbers, gallery photos, reviews, hours. Swap the values (the lead CSV from `barber finds` gives you name/phone/address/rating) and replace the stock Unsplash photo URLs with the shop's real photos.

The pitch banner (your agency CTA) is the `pitch` export at the bottom — set `show: false` before delivering a paid, live site.

### 2. Colours — the `:root` block in [`app/globals.css`](app/globals.css)
All colours are CSS variables (R G B channels) mapped into Tailwind as semantic names (`bg`, `surface`, `ink`, `accent`, …). **No component hard-codes a colour.** Drop the shop's brand colours here — pulled from their logo — and the entire site re-skins instantly.

```css
:root {
  --accent: 198 161 82;   /* the shop's brand colour */
  --accent-ink: 18 16 12; /* text that sits on the accent */
  /* ...bg / surface / ink / muted ... */
}
```

A few ready-made alternate palettes (crimson, navy, light) are commented in that file. Send me a shop's logo and I'll dial in their exact palette.

## What's mocked (demo vs. real)

This is a **pitch demo**, so a few things are front-end only until the owner says yes:

- **Booking** shows realistic live availability and a confirmation, but doesn't persist — wire it to a real scheduler (Cal.com, Square, a DB) for the paid build.
- **Contact form** shows a success state — connect it to an email service (Resend / Formspree) or the shop's inbox to receive real messages.
- **Photos** are stock Unsplash placeholders — swap for the shop's real photography.

## Deploy

Push to GitHub and import into **Vercel** (zero config for Next.js), or `npm run build`. Give each prospect their own URL, e.g. a per-shop deploy or subdomain.

## Tech

Next.js 14 · React 18 · TailwindCSS 3 · TypeScript. No UI or icon libraries — icons are inline SVGs in [`components/icons.tsx`](components/icons.tsx), so there's nothing extra to install.
