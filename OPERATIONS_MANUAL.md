# 📜 SERENDIB — Master Operations Manual & Technical Dossier

**Platform:** SERENDIB (Sri Lanka Luxury Travel, Heritage & Bespoke Expedition Guide)  
**Production Domain:** [https://sl.sushenjayasuriya.org.lk/](https://sl.sushenjayasuriya.org.lk/)  
**Firebase Hosting Origin:** `https://serendib-570fa.web.app/`  
**GitHub Repository:** `https://github.com/sushenjayasuriya/SERENDIB` (`main` branch)  
**Status:** 🟢 Deployed & Verified Live

---

## 🧭 1. Executive Overview & Architecture

SERENDIB is a high-performance, responsive, luxury travel platform designed with an editorial aesthetic and commercial-grade infrastructure.

### Technology Stack
- **Frontend Framework:** React 19 + TypeScript + Vite 8
- **Styling Architecture:** Tailwind CSS + Vanilla CSS Tokens + Custom Glassmorphism System
- **Icons & Visual Language:** Lucide React + Cinzel / Playfair / Outfit / Space Grotesk Typography
- **Security Engine:** Web Crypto API (Salted SHA-256, Session Token Vault, Lockout Rate-Limiter)
- **Cartography Engine:** Custom SVG GIS Projection Engine with Real GPS Coordinate Mapping
- **Hosting & Edge Delivery:** Google Firebase Hosting + CDN Caching Rules

---

## 👥 2. Visitor & User Experience Guide

### 🌟 Core Discovery Sections

| # | Section | Purpose & Interactive Features |
|---|---|---|
| **1** | **Cinematic Parallax Hero** | Dynamic multi-slide showcase of Sigiriya, Ella, South Coast, and Yala. Features live Sri Lanka Time (SLST UTC+5:30), weather status, and GPS coordinates. |
| **2** | **Editorial Introduction** | High-level metrics: 2,500+ years of history, 8 UNESCO World Heritage sites, 26 national parks, and 1,340 km of coastline. |
| **3** | **Trust & Accreditations Banner** | Commercial credentials showcasing verified local field research across Sri Lanka's 9 provinces, 24/7 Island Concierge support, and Sinharaja Rainforest conservation pledge. |
| **4** | **Split-Screen Destination Selector** | Interactive high-resolution gallery of Sri Lanka's top destinations (Colombo, Galle, Ella, Kandy, Sigiriya, Nuwara Eliya, Mirissa, Arugam Bay, Jaffna, Trincomalee). |
| **5** | **True GIS Sri Lanka Vector Map** | Geographically accurate vector cartography calibrated with real GPS coordinates. Features: Central Highlands topographic relief, ancient wewas (reservoirs), Main Line scenic railway overlay toggle, and interactive destination dossiers. |
| **6** | **Indian Ocean Beaches & Surf** | South & East coast surf breaks, water temperatures, and seasonal swell guides. |
| **7** | **Highlands & Tea Country Story** | Vertical parallax storytelling covering Ceylon tea heritage, Horton Plains, World's End, and the Demodara Nine Arch Bridge. |
| **8** | **Big 5 Wildlife Sanctuaries** | Interactive guide to Sri Lankan Leopards, Asian Elephants, Blue Whales, Sloth Bears, and Sperm Whales. |
| **9** | **2,500 Years of Heritage** | Chronological timeline of ancient kingdoms (Anuradhapura, Polonnaruwa, Sigiriya, Kandy, Colonial Galle). |
| **10** | **Ceylon Culinary Explorer** | Signature gastronomy, spice profiles, flavor notes, and pairing suggestions. |
| **11** | **Bucket-List Experiences** | 10 quintessential moments (Whale watching, sunrise hot air balloons, scenic train rides, tea tastings). |
| **12** | **"Build Your Sri Lanka" Trip Architect** | Interactive journey planner: travelers choose duration (3, 7, 10, 14 days) and travel style to generate day-by-day itineraries with printable receipts. |
| **13** | **Practical Compendium** | Essential travel logistics: Visa (ETA) requirements, monsoon patterns, currency guide, and emergency contact directory. |
| **14** | **About & Credibility Section** | Transparency statement on authorship, editorial independence, and research methodology. |

### 🛎️ Commercial Booking & Concierge Actions
- **🤖 Serendib Island AI Concierge**: Built-in intelligent assistant with simulated 2–3s thinking delay, rich Sri Lankan expedition knowledge base, quick prompt chips, and 1-click interactive action buttons.
- **Bespoke Concierge Booking Modal**: Accessible across the site, enabling visitors to configure private chauffeur-guides, luxury vehicle preferences, and custom travel parameters with an instant reservation reference (`SRN-2026-XXXX`).
- **Direct WhatsApp Specialist**: Floating button at the bottom-right linking directly to **`+94 71 391 2972`** (`https://wa.me/94713912972`).
- **Floating Waypoints Dock**: Bottom-right floating dock with an animated circular scroll progress indicator for jumping between sections.

---

## 🔗 3. Clean Semantic URL Routing & Deep Linking

The platform utilizes a **Clean HTML5 Semantic Routing Engine** (`src/utils/navigation.ts`, `src/hooks/useScrollSpy.ts`) that eliminates hashtag fragments (`#` or `/#`) and dynamically synchronizes URL paths and document titles:

| Semantic Route | Target Section | Document Title |
|---|---|---|
| `/` | Home / Hero | `SERENDIB — Sri Lanka Luxury Travel & Bespoke Expedition Guide` |
| `/about` | Philosophy & Introduction | `The Serendib Philosophy \| Sri Lanka Bespoke Expeditions` |
| `/destinations` | Citadels & Coasts | `Destinations & Royal Citadels \| SERENDIB` |
| `/map` | Interactive GIS Cartography | `Interactive GIS Expedition Map of Sri Lanka \| SERENDIB` |
| `/beaches` | Ocean Bays & Surf | `Turquoise Ocean Beaches & Surf Coastlines \| SERENDIB` |
| `/highlands` | Tea Country & Scenic Rail | `Misty Highlands, Ceylon Tea & Scenic Rail \| SERENDIB` |
| `/wildlife` | Big 5 Sanctuaries | `Big 5 Wildlife Sanctuaries & Leopard Corridors \| SERENDIB` |
| `/heritage` | 2,500 Years History | `2,500 Years Ancient Heritage & Sacred Citadels \| SERENDIB` |
| `/cuisine` | Ceylon Gastronomy | `Ceylon Culinary Arts, Spices & Gastronomy \| SERENDIB` |
| `/experiences` | 10 Bucket-List Moments | `10 Iconic Bucket-List Island Expeditions \| SERENDIB` |
| `/regions` | The 6 Realms | `The 6 Island Realms & Microclimates \| SERENDIB` |
| `/guide` | Practical Logistics | `Practical Island Travel Guide & Monsoons \| SERENDIB` |
| `/planner` | Trip Architect | `Bespoke Itinerary & Expedition Architect \| SERENDIB` |

**Routing Capabilities:**
1. **Direct Deep Linking:** Visitors can directly open or share `https://sl.sushenjayasuriya.org.lk/map` or `https://sl.sushenjayasuriya.org.lk/beaches` and the site will automatically navigate to that exact section.
2. **Dynamic ScrollSpy:** As visitors scroll through the page, the address bar smoothly reflects the active section via `history.replaceState` without triggering page jumps.
3. **Browser History (Back/Forward):** Native support for browser Back and Forward navigation buttons.

---

## 🔒 4. Administrator & Curatorial Studio Manual

The site features a client-side **Curatorial Studio & CMS** allowing live modification of imagery, copywriting, and datasets without writing code.

### 🔑 Master Passcodes (Default)
The vault accepts the following administrator passcodes:
1. **`serendib2026`** *(Primary Master)*
2. **`admin@serendib`**
3. **`serendib_curator_2026`**

> [!NOTE]
> Passcodes are **never stored in plain text**. They are verified against salted SHA-256 hashes using the browser's native `crypto.subtle` API.

---

### 🚪 How to Access the Admin Studio

You can unlock and open the Curatorial Studio using any of these 3 methods:

1. **Keyboard Shortcut**: Press **`Ctrl + Shift + A`** (or `Cmd + Shift + A` on Mac) anywhere on the website.
2. **Secret Logo Gesture**: Scroll to the footer and **triple-click the `SERENDIB` logo emblem** within 1 second.
3. **URL Query / Hash**: Navigate to `https://sl.sushenjayasuriya.org.lk/?admin=true` or append `#admin` to the URL.

---

### 🛡️ Security & Anti-Brute-Force Policies

| Security Feature | Implementation Detail |
|---|---|
| **Salted Hashing** | Uses salt: `SERENDIB_SALT_2026_SECURE_VAULT_` + SHA-256 digest. |
| **Lockout Rate-Limiter** | Maximum **5 failed passcode attempts**. Exceeding this triggers an automatic **15-minute security lockout** with a real-time countdown timer. |
| **Session Inactivity Timeout** | Generates a 24-byte cryptographic session token. Automatically terminates session and locks the studio after **30 minutes of inactivity**. |
| **Stealth Mode** | When enabled, hides any visible "Admin" link from public visitors. Only secret shortcuts/gestures reveal the authentication gate. |

---

### 🎛️ Studio Capabilities & Tabs

When authenticated, a floating **Curator Studio HUD** appears at the bottom-left of the live page (`fixed bottom-6 left-6`) with a minimize button and draft override counter.

```
┌────────────────────────────────────────────────────────┐
│  SERENDIB Curatorial Studio & CMS                      │
├──────────────┬──────────────┬──────────────┬───────────┤
│ 📸 Visual    │ ✍️ Editorial  │ 🩺 Link      │ 💾 Backup │
│    Assets    │    Copy      │    Health    │    & Sync │
└──────────────┴──────────────┴──────────────┴───────────┘
```

1. **📸 Visual Assets Studio**:
   - Filter assets across all categories (Hero, Destinations, Beaches, Highlands, Wildlife, Parks, Heritage, Food, Experiences, Regions).
   - Search by keyword.
   - Paste direct image URLs with instant live preview.
   - Pick from curated high-resolution presets.
   - Revert individual items back to system defaults with one click.
2. **✍️ Editorial Copy CMS**:
   - Select any destination to edit its Name, Region, Poetic Tagline, Climate, Elevation, Recommended Stay, and Editorial Description.
3. **🩺 Link Integrity & Health Scanner**:
   - Automated diagnostic tool that fires non-blocking probes across all active photographs to flag broken links (`404`) and measure latency in milliseconds.
4. **💾 Backup & Code Sync**:
   - **Download Backup**: Exports all active customizations as a `.json` file (`serendib-cms-backup-YYYY-MM-DD.json`).
   - **Restore Backup**: Paste any previously exported JSON snapshot to restore the site state instantly.
5. **🛡️ Vault & Privacy Settings**:
   - Update the Master Passcode (requires current password; sets a new salted hash).
   - Toggle Public Stealth Mode on/off.

---

## 🔍 4. SEO & Search Engine Specifications

| Optimization Area | Technical Implementation |
|---|---|
| **Crawler Shell** | Pre-rendered static semantic HTML shell with ~1,800 words of content for instant crawler indexing before JavaScript execution. |
| **Meta Tags** | Unique `<title>`, `<meta name="description">`, `canonical`, Open Graph (`og:image`, `og:title`), and Twitter Cards. |
| **Structured Data** | Validated Schema.org JSON-LD definitions: `WebSite`, `TouristDestination`, `FAQPage`, `Article`. |
| **Indexing Directives** | `public/robots.txt` explicitly allows all search crawlers (`Allow: /`) and disallows `#admin`. |
| **Sitemap** | `public/sitemap.xml` pointing to `https://sl.sushenjayasuriya.org.lk/` with daily change frequency. |
| **Performance Rules** | `firebase.json` headers configured with `no-cache` for `index.html` and aggressive immutable caching for hashed `.js`, `.css`, `.webp`, `.woff2` bundles. |

---

## 📞 5. Commercial Contact & Concierge Information

- **Official Website:** `https://sl.sushenjayasuriya.org.lk/`
- **WhatsApp Concierge:** `+94 71 391 2972`
- **Direct WhatsApp Link:** `https://wa.me/94713912972`
- **Concierge Email:** `concierge@sushenjayasuriya.org.lk` / `sushenjayasuriya@gmail.com`
- **Headquarters:** Colombo 03, Western Province, Sri Lanka
