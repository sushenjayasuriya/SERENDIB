# 🇱🇰 SERENDIB — Sri Lanka Luxury Travel & Bespoke Expedition Guide

[![Production Live](https://img.shields.io/badge/Live-sl.sushenjayasuriya.org.lk-gold?style=for-the-badge&logo=google-chrome&logoColor=white)](https://sl.sushenjayasuriya.org.lk/)
[![React 19](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Hosting-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

> **"One island. A thousand journeys."**  
> An ultra-premium, editorial-grade luxury travel showcase and interactive expedition portal for Sri Lanka — featuring calibrated GIS vector cartography, an intelligent Island AI Concierge, clean HTML5 semantic routing, and a client-side cryptographic Curatorial Studio.

---

## 🌐 Live Production URL
* **Primary Domain:** [https://sl.sushenjayasuriya.org.lk/](https://sl.sushenjayasuriya.org.lk/)
* **Firebase Edge Origin:** [https://serendib-570fa.web.app/](https://serendib-570fa.web.app/)

---

## ✨ Key Features & Architecture

### 🗺️ 1. Geographically Accurate GIS Vector Cartography
* Custom vector cartography calibrated with real GPS coordinates across Sri Lanka's 9 provinces.
* **Topographic Relief Layer:** Central Highlands elevation contours and mountain ranges.
* **Ancient Wewas (Reservoirs):** Historic dry-zone hydraulic tanks (Parakrama Samudra, Tissa Wewa, Minneriya).
* **Main Line Scenic Railway:** Toggleable Colombo → Kandy → Nanu Oya → Ella mountain rail route overlay.
* **Interactive Destination Dossiers:** Quick-look cards for 10 iconic regions with climate and elevation metrics.

### 🤖 2. Serendib Island AI Concierge & Expedition Quiz
* **Realistic Thinking Delay:** Simulated 2.2–2.8s typing delay for a natural AI conversational feel with zero server latency.
* **Multi-Turn "Bespoke Expedition Quiz" Mode:** 3-step interactive dialogue tailored to travel focus, duration, and pace, synthesizing a custom route proposal.
* **Rich Visual Destination Cards:** In-chat horizontal carousels with high-definition photography, region badges, and deep links.
* **Automated Session-Aware Popup:** Slides up after a thoughtful 6.5s delay on initial visitor arrival (`sessionStorage` guarded).
* **1-Click WhatsApp Hand-Off:** Pre-fills the traveler's custom itinerary details directly to the private concierge hotline (`+94 71 391 2972`).

### 🔗 3. Clean Semantic HTML5 Routing & Dynamic ScrollSpy
* Complete elimination of hashtag fragments (`#` or `/#`) in favor of clean semantic routes:
  * `/` · `/about` · `/destinations` · `/map` · `/beaches` · `/highlands` · `/wildlife` · `/heritage` · `/cuisine` · `/experiences` · `/guide` · `/planner`
* **Direct Deep-Linking:** Any section URL can be bookmarked or shared directly, automatically scrolling to the target view on load.
* **Dynamic ScrollSpy & Title Sync:** Seamlessly updates the browser address bar and tab title as the visitor scrolls.
* **Full Browser History Navigation:** Native support for browser Back (`←`) and Forward (`→`) buttons.

### 🔒 4. Hardened Client-Side Curatorial Studio & CMS
* **Web Crypto Security:** Passcodes verified strictly against salted SHA-256 digests (`crypto.subtle`) with zero plaintext secrets in client bundles.
* **Anti-Brute-Force Rate Limiter:** Maximum 5 failed attempts triggers an automatic 15-minute security lockout with a live countdown timer.
* **Inactivity Auto-Lock:** 30-minute cryptographic session expiration.
* **Live Visual Editor:** In-browser asset customization, editorial copywriting overrides, link health scanner, and JSON backup/restore.

### 🛡️ 5. Strict Content Security Policy (CSP) & HTTP Hardening
* **Narrow, Zero-Wildcard CSP:** Explicitly permits only verified first-party scripts, Google Fonts, Unsplash imagery, and same-origin connections.
* **Security Headers:** HSTS (1-year), `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`.
* **Sub-100ms Edge TTFB:** Served globally via Anycast CDN edge nodes.

---

## 🏛️ Comprehensive Discovery Sections

1. **Cinematic Parallax Hero** — Live Sri Lanka Time (SLST UTC+5:30), weather status, and GPS coordinates.
2. **Editorial Introduction** — Island metrics (2,500+ yrs history, 8 UNESCO sites, 26 national parks, 1,340 km coastline).
3. **Trust & Conservation Banner** — Local field research across 9 provinces and Sinharaja Rainforest pledge.
4. **Split-Screen Destination Selector** — 10 iconic regions (Colombo, Galle, Ella, Kandy, Sigiriya, Nuwara Eliya, Mirissa, Arugam Bay, Jaffna, Trincomalee).
5. **GIS Expedition Map** — GPS-calibrated cartography with railway and topography relief overlays.
6. **Indian Ocean Beaches & Surf** — Swell guides and seasonal coast breakdowns.
7. **Highlands & Tea Country** — Vertical parallax storytelling covering Ceylon tea, Horton Plains, and Nine Arch Bridge.
8. **Big 5 Wildlife Sanctuaries** — Leopards, Asian Elephants, Blue Whales, Sloth Bears, and Sperm Whales.
9. **2,500 Years of Heritage** — Chronological timeline of ancient royal kingdoms.
10. **Ceylon Culinary Explorer** — Gastronomy, spice profiles, and street food rhapsodies.
11. **10 Bucket-List Experiences** — Quintessential island expeditions.
12. **"Build Your Sri Lanka" Trip Architect** — Interactive itinerary generator with printable receipts.
13. **Practical Compendium** — ETA visas, monsoon charts, currency guide, and emergency directories (1912, 1990, 119).
14. **Bespoke Concierge Booking** — Instant reference generation (`SRN-2026-XXXX`).

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Core Framework** | [React 19](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/) |
| **Build Tool & Bundler** | [Vite 8](https://vite.dev/) (Rolldown engine) |
| **Styling Architecture** | [Tailwind CSS](https://tailwindcss.com/) + Custom Glassmorphism System |
| **Icons & Visual Language** | [Lucide React](https://lucide.dev/) |
| **Typography** | Cinzel, Playfair Display, Cormorant Garamond, Outfit, JetBrains Mono |
| **Security & Crypto** | Web Crypto API (`crypto.subtle`, SHA-256 salted hashing, CSP Level 3) |
| **Hosting & CDN** | Google Firebase Hosting + Cloudflare Edge Anycast CDN (TLS 1.3 / HTTP/3) |

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18.0.0 or higher)
* `npm` or `yarn` / `pnpm`

### Installation & Local Development

```bash
# 1. Clone the repository
git clone https://github.com/sushenjayasuriya/SERENDIB.git

# 2. Navigate to project directory
cd SERENDIB

# 3. Install dependencies
npm install

# 4. Start the local development server
npm run dev
```

### Production Build

```bash
# Typecheck & build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

### Deployment to Firebase Hosting

```bash
# Deploy to Google Firebase Hosting
npx firebase-tools deploy --only hosting
```

---

## 📞 Commercial Concierge & Support

* **Official Portal:** [https://sl.sushenjayasuriya.org.lk/](https://sl.sushenjayasuriya.org.lk/)
* **WhatsApp Hotline:** `+94 71 391 2972` (`https://wa.me/94713912972`)
* **Email:** `concierge@sushenjayasuriya.org.lk`
* **Headquarters:** Colombo 03, Western Province, Sri Lanka

---

## 📜 Operations Manual

For complete architectural specifications, SEO configurations, and deployment guidelines, refer to the [Master Operations Manual](OPERATIONS_MANUAL.md).

---

© 2026 SERENDIB Expeditions Ltd. All Rights Reserved.
