# MASTER PRD & EXECUTION SPEC: BESPOKE DIGITAL WEDDING INVITATION ENGINE

> **CRITICAL DIRECTIVE FOR ANTIGRAVITY (AI AGENT):**
> Read this entire specification carefully before writing a single line of code. You are strictly forbidden from improvising features, adding unrequested dependencies, or altering the architectural patterns defined below. Follow the **Phased Execution Plan** at the bottom of this document sequentially. Do NOT proceed to the next phase without completing and verifying the current phase.

---

## 1. STRICT GUARDRAILS (ANTI-HALLUCINATION & ANTI-AI-SLOP RULES)

### 1.1 Architectural Guardrails (DO NOT VIOLATE)
* **Headless Separation:** Business logic (audio, countdown, RSVP, calendar, clipboard, guest sanitization) MUST live solely inside custom hooks (`src/hooks/`). Theme UI components (`src/components/themes/`) MUST be pure presentation layers receiving data and hook handlers via props/context.
* **True Multi-Theme Architecture:** Themes MUST NOT share the same DOM layout with mere CSS variable swaps. Each theme (`EditorialMinimalist`, `DarkLuxe`, `ModernHeritage`) must have its own distinct component tree, grid system, and typography hierarchy.
* **Portfolio Location Rule:** The Hybrid Location Module MUST render **both** the interactive Visual Map Illustration (with zoom lightbox & download) **and** the live Google Maps / Waze navigation buttons simultaneously in Portfolio Demo Mode. Never hide one in favor of the other.

### 1.2 Visual & Design Guardrails (ANTI-AI-SLOP)
* **FORBIDDEN PATTERNS:**
  * NO generic SaaS gradients (e.g., `bg-gradient-to-r from-purple-500 to-pink-500` or generic pastel blobs).
  * NO generic card wrappers on every section (`rounded-2xl shadow-lg bg-white p-6` repeated endlessly).
  * NO centering every single text block from top to bottom.
  * NO decorative icons next to every section heading.
  * NO heavy `backdrop-filter: blur()` on scrolling containers (causes severe frame drops on mobile WebViews).
  * NO broken external image URLs. Use deterministic high-res architectural/editorial placeholders or local SVG patterns.
* **MANDATORY DESIGN STANDARDS:**
  * Use intentional typographic hierarchy (loaded via `next/font/google`: e.g., `Cormorant_Garamond` or `Playfair_Display` paired with `Plus_Jakarta_Sans` or `Inter`, plus `JetBrains_Mono` for dates/coordinates).
  * Use crisp `1px` borders, asymmetrical editorial grids (12-column CSS Grid), generous negative space, and subtle static noise textures.
  * Restrict Framer Motion animations strictly to GPU-accelerated properties (`transform`, `opacity`).

---

## 2. TECH STACK & DEPENDENCY LOCK

* **Framework:** Next.js (App Router, TypeScript strict mode)
* **Styling:** Tailwind CSS
* **Animation:** `framer-motion`
* **Validation:** `zod`
* **Icons:** `lucide-react` (Use sparingly and functionally only: audio toggle, copy, zoom, map pin, close)
* **Backend/State (Portfolio Mode):** Next.js Route Handlers (`/api/guestbook`, `/api/og`) + LocalStorage persistence & in-memory mock DB with ready-to-connect Supabase interface.
* **FORBIDDEN PACKAGES:** Do NOT install `swiper`, `aos`, `react-slick`, `three`, `gsap`, `bootstrap`, or heavy UI libraries (`mui`, `antd`, `chakra-ui`).

---

## 3. EXACT DIRECTORY & FILE STRUCTURE

You must scaffold and strictly adhere to this exact file structure:

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                        # Main entry (loads default portfolio demo)
│   ├── api/
│   │   ├── og/route.tsx                # Dynamic OpenGraph image generator
│   │   └── guestbook/route.ts          # Rate-limited RSVP & Guestbook API
├── types/
│   └── invitation.ts                   # Core TypeScript interfaces
├── lib/
│   ├── validation.ts                   # Zod schemas & XSS/Input sanitizers
│   └── dummy-data.ts                   # Complete, realistic portfolio dataset
├── hooks/
│   ├── useAudioController.ts           # Audio play/pause, fade-in, visibilitychange auto-pause
│   ├── useCountdown.ts                 # Timezone-aware countdown timer
│   ├── useGuestbook.ts                 # Fetch, optimistic submit, session rate-limit
│   ├── useCalendarGenerator.ts         # Google Calendar URL & .ics file generator
│   └── useClipboard.ts                 # WebView-safe copy with execCommand fallback
├── components/
│   ├── shared/
│   │   ├── PortfolioCommandBar.tsx     # Floating switcher (Theme, Guest Name, Mobile/Desktop Frame)
│   │   ├── TactileGate.tsx             # Envelope cover lock + triggers audio & scroll unlock
│   │   ├── HybridLocationModule.tsx    # Visual Map Lightbox + Real Maps/Waze/Copy Address
│   │   ├── DigitalEnvelopeModule.tsx   # Accordion bank accounts + QRIS + safe copy
│   │   └── GuestbookModule.tsx         # Protected RSVP form + real-time comment feed
│   └── themes/
│       ├── EditorialMinimalist/        # Theme 1: Swiss Grid, high-contrast serif, magazine layout
│       │   └── index.tsx
│       ├── DarkLuxe/                   # Theme 2: Obsidian dark, fine gold lines, cinematic layout
│       │   └── index.tsx
│       └── ModernHeritage/             # Theme 3: Warm earth tones, contemporary ethnic geometry
│           └── index.tsx
```

---

## 4. DATA CONTRACT & VALIDATION SPECIFICATION

### 4.1 TypeScript Interface (`src/types/invitation.ts`)
Implement this exact schema without omitting fields:

```typescript
export type ThemeId = 'editorial' | 'dark-luxe' | 'heritage';

export interface PersonProfile {
  fullName: string;
  nickname: string;
  fatherName: string;
  motherName: string;
  instagramHandle: string;
  photoUrl: string;
}

export interface EventDetail {
  title: string;
  dateISO: string; // e.g., "2026-12-12T08:00:00+07:00"
  endTimeISO: string;
  timezoneLabel: 'WIB' | 'WITA' | 'WIT';
  description: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  qrImageUrl?: string;
}

export interface GuestbookEntry {
  id: string;
  guestName: string;
  attendance: 'hadir' | 'tidak_hadir' | 'ragu';
  pax: number;
  message: string;
  createdAt: string;
}

export interface WeddingInvitationData {
  id: string;
  slug: string;
  themeId: ThemeId;
  isPortfolioDemo: boolean;
  couple: {
    groom: PersonProfile;
    bride: PersonProfile;
  };
  events: {
    akad: EventDetail;
    reception: EventDetail;
  };
  location: {
    venueName: string;
    fullAddress: string;
    landmarkNotes: string;
    visualMapAssetUrl: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    googleMapsPlaceId?: string;
  };
  audio: {
    srcUrl: string;
    title: string;
    artist: string;
  };
  gallery: string[];
  loveStory: Array<{
    year: string;
    title: string;
    story: string;
  }>;
  digitalEnvelope: BankAccount[];
}
```

### 4.2 Security & Validation Rules (`src/lib/validation.ts`)
1. **Guest Name URL Parameter (`?to=`):**
   * Extract from URL query.
   * Strip all HTML tags, script payloads, and special characters except letters, numbers, spaces, dots, commas, and hyphens (`/[^a-zA-Z0-9 .,']/g`).
   * Truncate strictly at **35 characters**.
   * Fallback to `"Tamu Kehormatan"` if empty or invalid.
2. **RSVP & Guestbook Form Validation (Zod):**
   * `guestName`: string, trimmed, min 2 chars, max 40 chars, no HTML tags.
   * `attendance`: enum `['hadir', 'tidak_hadir', 'ragu']`.
   * `pax`: number, int, min 1, max 5 (automatically forced to `0` if `attendance === 'tidak_hadir'`).
   * `message`: string, trimmed, min 5 chars, max 300 chars, strip HTML tags.
   * `honeypot`: string, max 0 chars (if filled by a bot, silently reject submission).

---

## 5. CORE MODULE & HOOK SPECIFICATIONS

### 5.1 `useAudioController.ts`
* Must manage an `HTMLAudioElement` instance.
* `unlockAndPlay()`: Called ONLY when the user clicks "Buka Undangan" on the `TactileGate`. Starts volume at `0` and smoothly ramps to `0.8` over 1500ms.
* **Mandatory Listener:** Attach `document.addEventListener('visibilitychange', ...)`. If `document.hidden === true`, automatically pause audio. If `document.hidden === false` and user had not manually muted it, resume audio.

### 5.2 `useClipboard.ts`
* Provide `copy(text: string): Promise<boolean>`.
* Primary method: `navigator.clipboard.writeText(text)`.
* Fallback method (for older WhatsApp/Instagram Android WebViews): Create hidden `<textarea>`, select, run `document.execCommand('copy')`, and clean up DOM.
* Manage `copiedId` state with a 2000ms auto-reset for UI toast/checkmark feedback.

### 5.3 `HybridLocationModule.tsx`
* Must display:
  1. `venueName`, `fullAddress`, and `landmarkNotes`.
  2. **"Salin Alamat" Button:** Copies full address + landmark notes using `useClipboard`.
  3. **Interactive Visual Map Denah:** Renders an editorial SVG/Image floor & route map (`visualMapAssetUrl`). Clicking opens a full-screen Zoomable Lightbox modal + a "Download Denah" button.
  4. **Direct Navigation Actions:**
     * Google Maps button using exact format: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
     * Waze button using exact format: `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`
  5. **NO Raw Interactive Iframe:** Do NOT embed a raw Google Maps iframe that traps mobile touch scrolling.

### 5.4 `PortfolioCommandBar.tsx`
* Fixed floating control bar at the bottom/top of the screen (only rendered when `isPortfolioDemo === true`).
* Controls:
  1. **Theme Switcher:** Instant switch between `editorial`, `dark-luxe`, and `heritage`.
  2. **Live Guest Name Simulator:** Input field to type a custom guest name and immediately see it update on the Gate & Invitation greeting.
  3. **Viewport Toggle (Desktop Only):** Switch between a realistic centered Mobile Device Frame (`max-w-[430px]`) and Responsive Desktop View.
  4. **Re-lock Gate Button:** Button to reset the `TactileGate` so reviewers can re-test the opening animation.

---

## 6. DISTINCT THEME SPECIFICATIONS

Do NOT make these look the same. Build distinct layouts:

1. **Theme 1: `EditorialMinimalist`**
   * **Palette:** Warm Alabaster (`#F8F6F2`), Ink Black (`#141413`), Muted Stone (`#78756F`).
   * **Layout:** Swiss editorial grid with exposed `1px solid #E2DFD7` hairlines, oversized serif numbers for dates, asymmetric split columns on desktop, left-aligned structured typography on mobile.
2. **Theme 2: `DarkLuxe`**
   * **Palette:** Obsidian (`#0B0B0C`), Champagne Gold (`#D4AF37`), Soft Ivory (`#EAE6DF`).
   * **Layout:** Full-bleed atmospheric dark sections, ultra-thin gold border accents, high-contrast dramatic typography, subtle vertical timeline lines.
3. **Theme 3: `ModernHeritage`**
   * **Palette:** Terracotta Clay (`#9E4733`), Deep Espresso (`#231A16`), Warm Sand (`#F2ECE1`), Antique Brass (`#B8860B`).
   * **Layout:** Architectural arch framing (`rounded-t-full` photo masks), subtle geometric Indonesian vector border motifs (clean SVG lines, not blurry raster batik), warm editorial storytelling flow.

---

## 7. PHASED EXECUTION PLAN (MANDATORY WORKFLOW)

**STOP AND READ:** You must execute this project in **4 sequential phases**. After completing each phase, summarize what was built, verify there are zero TypeScript/build errors, and wait for user confirmation (or verify all checks pass before moving to the next phase).

* **PHASE 1: Foundation, Types, Validation & Dummy Data**
  * Setup fonts in `layout.tsx`.
  * Create `src/types/invitation.ts`, `src/lib/validation.ts`, and `src/lib/dummy-data.ts` (including a clean inline/local SVG architectural map for `visualMapAssetUrl` so there are zero broken images).
* **PHASE 2: Headless Hooks & Shared Interactive Modules**
  * Implement all 5 hooks in `src/hooks/`.
  * Build `TactileGate.tsx`, `HybridLocationModule.tsx`, `DigitalEnvelopeModule.tsx`, `GuestbookModule.tsx`, and `PortfolioCommandBar.tsx`.
* **PHASE 3: The 3 Distinct Theme Layouts**
  * Build `EditorialMinimalist`, `DarkLuxe`, and `ModernHeritage` consuming the shared hooks and modules, ensuring each has a distinct DOM and grid structure.
* **PHASE 4: Main Page Wiring, API Routes & Final Audit**
  * Connect everything in `src/app/page.tsx`, build `/api/guestbook/route.ts` and `/api/og/route.tsx`, and run a full TypeScript & build verification.