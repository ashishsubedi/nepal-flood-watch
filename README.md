# 🌊 Nepal Flood & Highway Watch (नेपाल बाढी तथा सडक सुरक्षा)

> Real-time situational awareness dashboard for Nepal's flood risks, river water levels, highway corridor statuses, and emergency helplines.

---

## 🌟 Key Features

* **🌊 Live DHM River Telemetry:** Direct scraper & parser for the Department of Hydrology & Meteorology (`dhm.gov.np`) monitoring over 300+ river stations nationwide with 5-minute caching and graceful offline baselines.
* **🛣️ National Highway Route Checker:** Interactive corridor verdict system for Nepal's critical highways (Prithvi Highway, BP Highway, Narayanghat-Mugling, Karnali Highway, Pasang Lhamu, etc.) with multi-leg composite trip analysis.
* **🚨 BIPAD Disaster Incidents:** Real-time integration with the Government of Nepal's BIPAD disaster portal (`bipadportal.gov.np`) tracking floods, landslides, and debris flows.
* **🌧️ Live Precipitation Radar:** Animated real-time weather radar tiles (via RainViewer) showing active storm cloud movement across the Himalayas.
* **🆘 One-Tap Emergency Helplines:** Instant one-tap dialing for Nepal Police (100), Traffic Police (103), APF Disaster Rescue (1114), DHM Flood Alert (1155), Ambulance (102), and Red Cross.
* **🇳🇵 100% Bilingual:** Instant one-tap toggle between Nepali (नेपाली Devanagari) and English across all tabs, warnings, and route notices.
* **📱 Mobile-First Responsive Design:** Collapsible bottom-sheet drawer for smartphones and tablet/desktop side-panel interface.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* npm (bundled with Node.js)

### Installation & Running

```bash
# Clone the repository
git clone https://github.com/ashishsubedi/nepal-flood-watch.git
cd nepal-flood-watch

# Install dependencies
npm install

# Start the server
npm start
```

Visit **`http://localhost:3000`** in your browser.

For hot-reload during development:
```bash
npm run dev
```

---

## 📡 API Endpoints

| Endpoint | Description |
| :--- | :--- |
| `GET /api/stations` | Live DHM river gauges with warning/danger thresholds and 5-min caching |
| `GET /api/highways` | Curated status & notices for Nepal's major highway corridors and composite routes |
| `GET /api/incidents` | Live verified flood and landslide disaster incidents from BIPAD Portal |
| `GET /api/helplines` | Verified emergency contact numbers with categories |
| `GET /api/situation` | ReliefWeb disaster summary reports and emergency registry |

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js, native `fetch` with `AbortSignal` timeout handling.
* **Frontend:** Vanilla JavaScript (ES6+), Leaflet.js, OpenStreetMap, RainViewer Radar API.
* **Styling:** CSS3 variables, responsive bottom sheet, CSS animations, and Devanagari typography.

---

## 📄 License

Open-source under the [MIT License](LICENSE).
