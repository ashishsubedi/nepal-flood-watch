# Nepal Flood & Highway Watch (नेपाल बाढी तथा सडक सुरक्षा) — Implementation Plan

Transform the existing prototype in `/Users/ashishsubedi/workspace/nepal-flood-watch/` into an intuitive, resilient, citizen-friendly situational awareness tool. The upgraded system directly answers the 3 most critical questions during a disaster: **"Is my highway open?"**, **"Is my river flooding?"**, and **"Who do I call for emergency help?"**, supported by real-time rain radar and government incident data.

---

## User Review Required

> [!IMPORTANT]
> **No API Keys or Paid Services Required:** All data layers (BIPAD Portal incidents, DHM river gauges, Open-Meteo precipitation forecasts, and RainViewer weather radar tiles) are 100% open-access and free.

> [!NOTE]
> **Graceful Degradation:** Because Nepal government servers (`dhm.gov.np`) frequently experience heavy slowdowns during monsoon floods, the backend will feature automatic multi-tier caching and fallback to ensure the app never displays a blank screen or crashes.

---

## Proposed Architecture & Changes

### Data & Backend Layer (`server.js`)
* **Live River Gauges & Caching:** Multi-tier DHM scraper with 5-minute caching and an offline baseline dataset covering all major river basins (Bagmati, Koshi, Gandaki, Narayani, Karnali, Trishuli, Bhotekoshi, Nakkhu).
* **Official BIPAD Portal Integration:** Fetch live verified flood, landslide, and disaster incidents from `bipadportal.gov.np/api/v1/incident/` with Nepali & English titles and geo-coordinates.
* **National Highway & Route Status API:** Dynamic endpoint providing real-time status (Open, One-Way, Blocked, Night Travel Banned) for Nepal's critical highway corridors:
  * Prithvi Highway (Kathmandu–Mugling–Pokhara)
  * BP Highway (Kathmandu–Khurkot–Bardibas/Terai)
  * Narayanghat–Mugling Corridor
  * Araniko Highway & Pasang Lhamu Highway (Sindhupalchok / Rasuwa / Bhotekoshi)
  * Kanti Lokpath & Tribhuvan Highway (Hetauda–Kathmandu)
  * Karnali Highway & Mechi Highway
* **Emergency Helpline Registry:** Comprehensive directory with one-tap dialing for Nepal Police (100), Traffic Police (103), APF Disaster Rescue (1114), DHM Flood Early Warning (1155), and Ambulance (102).

---

### Citizen-First Frontend (`public/index.html`, `public/app.js`, `public/style.css`)
* **3-Tab Intuitive Bottom Drawer / Panel:**
  1. 🛣️ **Highway & Route Checker (सडक अवस्था):** Select origin and destination to get an instant clear verdict (*Green: Safe*, *Yellow: Night Travel Banned / Single-Lane*, *Red: Blocked by Landslide*).
  2. 🌊 **River Danger Watch (मुख्य नदीहरू):** Clear traffic-light status cards for major river basins with plain-language advice (*"Water is 1.5m above danger level — evacuate to higher ground"*).
  3. 🆘 **Emergency Helplines (आपतकालीन सम्पर्क):** High-contrast, large one-tap call buttons for all emergency agencies.
* **Live Visual Weather & Rain Radar:**
  * Animated live weather radar layer showing active storm cloud movement across Nepal.
  * Pulsing red danger markers on rivers and highway blockages.
* **Bilingual Support (नेपाली / English):** One-tap instant language switcher with high-contrast Devanagari typography.
* **Mobile-First Responsive Design:** Bottom-sheet drawer on mobile devices with full touch swipe controls.

---

## Proposed Changes

### Backend & API

#### [MODIFY] [server.js](file:///Users/ashishsubedi/workspace/nepal-flood-watch/server.js)
* Implement resilient DHM scraper with timeout fallbacks.
* Add `/api/incidents` endpoint querying BIPAD portal.
* Add `/api/highways` endpoint with highway route status and police notices.
* Add `/api/helplines` endpoint with verified emergency contact numbers.

---

### Frontend

#### [MODIFY] [public/index.html](file:///Users/ashishsubedi/workspace/nepal-flood-watch/public/index.html)
* Replace developer-focused sidebar with citizen-centric 3-tab layout (Highways, Rivers, Helplines).
* Add language switcher header, live status indicator, and mobile bottom sheet.

#### [MODIFY] [public/style.css](file:///Users/ashishsubedi/workspace/nepal-flood-watch/public/style.css)
* Add clean, mobile-first responsive layout (collapsible bottom sheet for phones, floating panel for desktop).
* High-contrast color tokens for status levels (Green `#10b981`, Yellow `#f59e0b`, Red `#ef4444`).
* Clean typography with proper font weights for Nepali Devanagari characters.

#### [MODIFY] [public/app.js](file:///Users/ashishsubedi/workspace/nepal-flood-watch/public/app.js)
* State management for Nepali/English translations across all modules.
* Interactive Highway Route Selector logic.
* Leaflet map enhancements: RainViewer radar tile integration, custom pulsing hazard markers, and auto-fit bounds.
* Search and filter for river gauges and BIPAD incidents.

---

## Verification Plan

### Automated & Connectivity Tests
* Verify server boots up with `node server.js`.
* Test all API endpoints:
  * `GET /api/stations` (DHM river gauges + fallback)
  * `GET /api/highways` (Highway route status)
  * `GET /api/incidents` (BIPAD portal feed)
  * `GET /api/situation` (Official notices & helplines)

### Manual & UX Verification
* Test in browser at `http://localhost:3000`.
* Test Nepali/English language toggle across all tabs.
* Test Highway status selector (e.g. Kathmandu ➔ Pokhara, Kathmandu ➔ Sindhuli).
* Test mobile responsiveness (bottom-sheet opening/closing).
* Verify radar tile layer animation and river station popups.
