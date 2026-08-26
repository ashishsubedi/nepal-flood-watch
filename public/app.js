const I18N = {
  en: {
    appTitle: 'Nepal Flood & Highway Watch',
    tabHighways: 'Highways', tabRivers: 'Rivers', tabHelplines: 'Helplines',
    radar: 'Radar', from: 'From', to: 'To', filterRivers: 'Filter by name / district…', incidents: 'Live Incidents',
    riverStations: 'River Stations', filterAll: 'All', filterDanger: 'Danger Only',
    officialReport: 'Official Report', searchNews: 'Search News', sourceBipad: 'NDRRMA / BIPAD',
    newsBadge: '📰 Live Coverage', searchNewsPh: 'Search news articles…', searchBtn: 'Search',
    newsAll: '🌐 All Sources', newsNepali: '🇳🇵 Major Nepali Media',
    newsSearching: 'Searching latest news coverage…',
    newsEmpty: 'No recent news articles found for this query.',
    checkRoute: 'Check status',
    allCorridors: 'All Routes', intercityRoutes: 'Popular Corridors', majorHighways: 'Highway Network',
    scrollTop: 'Top',
    open: '✅ Safe — road open', nightBanned: '⚠️ Night travel banned / single-lane', blocked: '⛔ Blocked by landslide',
    topRouteBadge: '★ Top Route',
    calculatedBadge: '⚡ Calculated',
    callNow: 'Call now', updated: 'Updated', stations: 'gauges', noRoute: 'Select both origin and destination.',
    noMatch: 'No route found between selected places. Try another destination.',
    legendAbove: 'Above danger', legendWarn: 'Above warning', legendBelow: 'Below warning', legendNone: 'No data',
    noDangerStations: '🟢 All river stations are currently below warning level',
    noDangerIncidents: '🟢 No active critical flood or landslide incidents reported',
    mapHazardsOnly: 'Hazards Only',
    mapAllGauges: 'All Gauges',
  },
  ne: {
    appTitle: 'नेपाल बाढी तथा सडक अवस्था',
    tabHighways: 'सडक', tabRivers: 'नदी', tabHelplines: 'सम्पर्क',
    radar: 'रडार', from: 'बाट', to: 'सम्म', filterRivers: 'नाम / जिल्लाले छान्नुहोस्…', incidents: 'प्रत्यक्ष घटनाहरू',
    riverStations: 'नदी स्टेशनहरू', filterAll: 'सबै', filterDanger: 'खतरा मात्र',
    officialReport: 'सरकारी प्रतिवेदन', searchNews: 'समाचार खोज्नुहोस्', sourceBipad: 'विपद पोर्टल',
    newsBadge: '📰 प्रत्यक्ष समाचार', searchNewsPh: 'समाचार लेखहरू खोज्नुहोस्…', searchBtn: 'खोज्नुहोस्',
    newsAll: '🌐 सबै स्रोतहरू', newsNepali: '🇳🇵 प्रमुख नेपाली मिडिया',
    newsSearching: 'ताजा समाचार खोज्दै…',
    newsEmpty: 'यो खोजीको लागि कुनै हालैका समाचार लेखहरू फेला परेनन्।',
    checkRoute: 'अवस्था हेर्नुहोस्',
    allCorridors: 'सबै मार्गहरू', intercityRoutes: 'प्रसिद्ध मुख्य करिडोरहरू', majorHighways: 'राजमार्ग सञ्जाल',
    scrollTop: 'माथि',
    open: '✅ सुरक्षित — बाटो खुला', nightBanned: '⚠️ रात्रिकालीन यात्रा प्रतिबन्धित / एकल लेन', blocked: '⛔ पहिरोले अवरुद्ध',
    topRouteBadge: '★ मुख्य मार्ग',
    calculatedBadge: '⚡ गणना गरिएको मार्ग',
    callNow: 'अहिले कल गर्नुहोस्', updated: 'अपडेट', stations: 'गेज', noRoute: 'सुरु र गन्तव्य दुवै छान्नुहोस्।',
    noMatch: 'छानिएका ठाउँहरू बीच कुनै मार्ग फेला परेन। अर्को गन्तव्य रोज्नुहोस्।',
    legendAbove: 'खतरा माथि', legendWarn: 'चेतावनी माथि', legendBelow: 'चेतावनी मुनि', legendNone: 'डाटा छैन',
    noDangerStations: '🟢 सबै नदी स्टेशनहरू हाल चेतावनी तह भन्दा मुनि छन्',
    noDangerIncidents: '🟢 हाल कुनै गम्भीर बाढी वा पहिरोका घटना रिपोर्ट गरिएको छैन',
    mapHazardsOnly: 'खतरा मात्र',
    mapAllGauges: 'सबै गेज',
  },
};

const PLACE_NAMES = {
  'Kathmandu': 'काठमाडौँ',
  'Pokhara': 'पोखरा',
  'Chitwan': 'चितवन',
  'Narayanghat': 'नारायणघाट',
  'Mugling': 'मुग्लिन',
  'Hetauda': 'हेटौंडा',
  'Birgunj': 'वीरगञ्ज',
  'Butwal': 'बुटवल',
  'Bhairahawa': 'भैरहवा',
  'Kohalpur': 'कोहलपुर',
  'Nepalgunj': 'नेपालगञ्ज',
  'Surkhet': 'सुर्खेत',
  'Jumla': 'जुम्ला',
  'Dhangadhi': 'धनगढी',
  'Mahendranagar': 'महेन्द्रनगर',
  'Dadeldhura': 'डडेल्धुरा',
  'Bardibas': 'बर्दिबास',
  'Janakpur': 'जनकपुर',
  'Itahari': 'इटहरी',
  'Dharan': 'धरान',
  'Biratnagar': 'विराटनगर',
  'Ilam': 'इलाम',
  'Kakarbhitta': 'काँकडभिट्टा',
  'Baglung': 'बागलुङ',
  'Jomsom': 'जोमसोम',
  'Beni': 'बेनी',
  'Salyan': 'सल्यान',
  'Tulsipur': 'तुलसीपुर',
  'Rasuwa': 'रसुवा',
  'Kodari': 'कोदारी',
  'Trishuli': 'त्रिशुली',
  'Dhulikhel': 'धुलिखेल',
  'Sindhuli': 'सिन्धुली',
  'Gaighat': 'गाईघाट',
  'Diktel': 'दिक्तेल',
  'Dipayal': 'दिपायल',
};

let lang = 'en';
const t = (k) => (I18N[lang]?.[k] ?? I18N.en[k] ?? k);
const toPlaceName = (p) => (lang === 'ne' ? (PLACE_NAMES[p] || p) : p);

function toNepaliDigits(n) {
  if (n == null) return '';
  const devDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return String(n).replace(/[0-9]/g, (d) => devDigits[d]);
}

function fmtDist(km) {
  if (!km) return '';
  return lang === 'ne' ? `${toNepaliDigits(km)} किमी` : `${km} km`;
}

function fmtLegs(count) {
  return lang === 'ne' ? `${toNepaliDigits(count)} खण्ड` : `${count} legs`;
}

const SEV_COLOR = { danger: '#ef4444', warning: '#f59e0b', normal: '#10b981', unknown: '#7a8aa0' };
const SEV_RANK = { danger: 3, warning: 2, normal: 1, unknown: 0 };

const isMobile = window.innerWidth < 768;
const map = L.map('map', {
  zoomControl: false,
  minZoom: 5,
  maxBounds: [[18.0, 70.0], [38.0, 98.0]],
  maxBoundsViscosity: 0.0,
}).setView(isMobile ? [26.9, 84.2] : [28.2, 84.2], isMobile ? 6.4 : 7);
L.control.zoom({ position: 'bottomright' }).addTo(map);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'OSM' }).addTo(map);

map.createPane('radarPane');
map.getPane('radarPane').style.zIndex = 350;

let userInteractedWithMap = false;
map.on('dragstart zoomstart', () => { userInteractedWithMap = true; });

const stationLayer = L.layerGroup().addTo(map);
const hazardLayer = L.layerGroup().addTo(map);
const highwayLayer = L.layerGroup().addTo(map);
const routeHighlightLayer = L.layerGroup().addTo(map);

const stationMarkers = new Map();
const incidentMarkers = new Map();
const highwayMarkers = new Map();
let currentTab = 'highways';
let mapFilterMode = 'hazards';
let currentNewsQuery = '';
let currentNewsQueryEn = '';
let currentNewsQueryNe = '';
let currentNewsFilter = 'all';

function formatNewsDateTime(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;

  const now = Date.now();
  const diffMs = now - d.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor(diffMs / (1000 * 60));

  let relative = '';
  if (diffMins >= 0 && diffMins < 60) {
    relative = lang === 'ne' ? `${diffMins || 1} मिनेट अघि` : `${diffMins || 1}m ago`;
  } else if (diffHours >= 1 && diffHours < 24) {
    relative = lang === 'ne' ? `${diffHours} घण्टा अघि` : `${diffHours}h ago`;
  }

  const dateFormatted = d.toLocaleDateString(lang === 'ne' ? 'ne-NP' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const timeFormatted = d.toLocaleTimeString(lang === 'ne' ? 'ne-NP' : 'en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  if (relative) {
    return `${relative} · ${dateFormatted}, ${timeFormatted}`;
  }
  return `${dateFormatted}, ${timeFormatted}`;
}

function openNewsModal(incOrQuery) {
  const modal = document.getElementById('news-modal');
  if (!modal) return;
  let title = '';
  if (typeof incOrQuery === 'string') {
    title = incOrQuery;
    currentNewsQueryEn = incOrQuery;
    currentNewsQueryNe = incOrQuery;
  } else if (incOrQuery) {
    currentNewsQueryEn = incOrQuery.titleEn || incOrQuery.titleNe || '';
    currentNewsQueryNe = incOrQuery.titleNe || incOrQuery.titleEn || '';
    title = lang === 'ne' ? currentNewsQueryNe : currentNewsQueryEn;
  }
  currentNewsQuery = title || 'Nepal flood landslide';
  document.getElementById('news-modal-title').textContent = title || t('searchNews');
  document.getElementById('news-search-input').value = currentNewsQuery;
  
  // Sync filter chips UI state
  document.querySelectorAll('[data-newsfilter]').forEach((c) => {
    c.classList.toggle('active', c.dataset.newsfilter === currentNewsFilter);
  });

  modal.classList.remove('hidden');
  fetchAndRenderNews(currentNewsQuery, currentNewsFilter, currentNewsQueryEn, currentNewsQueryNe);
}

function closeNewsModal() {
  const modal = document.getElementById('news-modal');
  if (modal) modal.classList.add('hidden');
}

async function fetchAndRenderNews(query, sourceFilter = 'all', qEn = '', qNe = '') {
  const loadingEl = document.getElementById('news-loading');
  const resultsEl = document.getElementById('news-results');
  const submitBtn = document.getElementById('news-search-submit');
  if (!resultsEl) return;
  resultsEl.innerHTML = '';
  if (loadingEl) loadingEl.classList.remove('hidden');
  if (submitBtn) submitBtn.disabled = true;

  try {
    const params = new URLSearchParams({
      q: query,
      source: sourceFilter,
    });
    if (qEn) params.set('qEn', qEn);
    if (qNe) params.set('qNe', qNe);

    const res = await fetch(`/api/incident-news?${params.toString()}`);
    const j = await res.json();
    if (loadingEl) loadingEl.classList.add('hidden');
    if (submitBtn) submitBtn.disabled = false;

    if (j && j.error && (!j.articles || !j.articles.length)) {
      const errEl = document.createElement('div');
      errEl.className = 'news-empty';
      errEl.textContent = j.error;
      resultsEl.appendChild(errEl);
      return;
    }

    const articles = (j && j.articles) || [];
    if (!articles.length) {
      const empty = document.createElement('div');
      empty.className = 'news-empty';
      empty.textContent = t('newsEmpty');
      resultsEl.appendChild(empty);
      return;
    }

    const frag = document.createDocumentFragment();
    for (const art of articles) {
      const a = document.createElement('a');
      a.className = 'news-item';
      a.href = art.link;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';

      const timeStr = formatNewsDateTime(art.pubDate);
      a.innerHTML = `
        <div class="news-item-title">${art.title}</div>
        <div class="news-item-meta">
          <span class="news-source-badge">${art.source || 'News'}</span>
          <span class="news-item-time">${timeStr}</span>
        </div>
      `;
      frag.appendChild(a);
    }
    resultsEl.appendChild(frag);
  } catch (err) {
    if (loadingEl) loadingEl.classList.add('hidden');
    const errEl = document.createElement('div');
    errEl.className = 'news-empty';
    errEl.textContent = 'Failed to load news: ' + err.message;
    resultsEl.appendChild(errEl);
  }
}

let allStations = [];
let highways = [];
let precomputedRoutes = [];
let helplines = [];
let incidents = [];
let listFilter = 'all';
let hwFilter = 'all';
let selectedId = null;

// Graph and memoization structures
const highwayGraph = new Map();
const routeCache = new Map();

function fmt(n, d = 2) { return n == null ? '—' : (lang === 'ne' ? toNepaliDigits(Number(n).toFixed(d)) : Number(n).toFixed(d)); }

function selectItem(id, lat, lon, zoom = 11, marker = null, targetTab = null) {
  selectedId = id;
  if (targetTab) {
    switchTab(targetTab);
  }
  document.querySelectorAll('.card').forEach((c) => {
    c.classList.toggle('selected', c.dataset.id === String(id));
  });
  if (lat != null && lon != null) {
    map.flyTo([lat, lon], zoom, { duration: 0.6 });
  }
  if (marker) {
    marker.openPopup();
  }
  const el = document.querySelector(`.card[data-id="${id}"]`);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function popupNode(s) {
  const d = document.createElement('div');
  const b = document.createElement('b');
  b.textContent = s.name;
  d.appendChild(b);
  d.appendChild(document.createElement('br'));
  const meta = document.createElement('div');
  meta.textContent = [s.district, s.basin ? s.basin + (lang === 'ne' ? ' जलाधार' : ' basin') : ''].filter(Boolean).join(' · ');
  d.appendChild(meta);
  const wl = document.createElement('div');
  wl.textContent = (lang === 'ne' ? 'जलस्तर: ' : 'Water level: ') + `${fmt(s.waterLevel)} m`;
  d.appendChild(wl);
  const wd = document.createElement('div');
  wd.textContent = (lang === 'ne' ? `चेतावनी: ${fmt(s.warningLevel)} m · खतरा: ${fmt(s.dangerLevel)} m` : `Warning: ${fmt(s.warningLevel)} m · Danger: ${fmt(s.dangerLevel)} m`);
  d.appendChild(wd);
  const st = document.createElement('div');
  st.textContent = (lang === 'ne' ? 'अवस्था: ' : 'Status: ') + `${s.status || '—'}`;
  d.appendChild(st);
  return d;
}

function getIncidentNewsUrl(x) {
  const title = lang === 'ne' ? (x.titleNe || x.titleEn) : (x.titleEn || x.titleNe);
  const query = `${title} Nepal`;
  return `https://news.google.com/search?q=${encodeURIComponent(query)}`;
}

function updateMapFilterButton(hazardCount = 0) {
  const btn = document.getElementById('map-mode-toggle');
  if (!btn) return;
  const isHazards = mapFilterMode === 'hazards';
  btn.classList.toggle('active', isHazards);
  const iconEl = document.getElementById('map-mode-icon');
  const labelEl = document.getElementById('map-mode-label');
  if (iconEl) iconEl.textContent = isHazards ? '⚠️' : '🌐';
  if (labelEl) {
    if (isHazards) {
      const countVal = lang === 'ne' ? toNepaliDigits(hazardCount) : hazardCount;
      labelEl.innerHTML = `${t('mapHazardsOnly')}${hazardCount > 0 ? ` <span class="chip-count">${countVal}</span>` : ''}`;
    } else {
      const totalVal = lang === 'ne' ? toNepaliDigits(allStations.length) : allStations.length;
      labelEl.innerHTML = `${t('mapAllGauges')} <span class="chip-count" style="background:#2563eb;color:#fff;">${totalVal}</span>`;
    }
  }
}

function renderMarkers() {
  stationLayer.clearLayers();
  hazardLayer.clearLayers();
  stationMarkers.clear();
  incidentMarkers.clear();
  highwayMarkers.clear();

  const bounds = [];
  const dangerGauges = allStations.filter(s => s.severity === 'danger' || s.severity === 'warning');
  const blockedHighways = highways.filter(h => h.status === 'blocked' || h.status === 'night-banned');
  const totalHazards = dangerGauges.length + blockedHighways.length + incidents.length;

  updateMapFilterButton(totalHazards);

  for (const s of allStations) {
    if (s.lat == null || s.lon == null) continue;
    const isDanger = s.severity === 'danger';
    const isWarning = s.severity === 'warning';

    // In 'hazards' mode, hide normal safe stations when viewing Highways, Helplines, or Danger filter
    if (mapFilterMode === 'hazards' && !isDanger && !isWarning) {
      if (currentTab === 'highways' || currentTab === 'helplines' || (currentTab === 'rivers' && listFilter === 'danger')) {
        continue;
      }
    }

    if (currentTab === 'rivers' && listFilter === 'incidents') {
      continue;
    }

    // Refined visual hierarchy: prominent danger/warning, subtle small safe dots
    const radius = isDanger ? 9 : isWarning ? 7 : (mapFilterMode === 'hazards' ? 4 : 3.5);
    const opacity = isDanger ? 1.0 : isWarning ? 0.95 : 0.45;
    const weight = isDanger ? 2 : isWarning ? 1.5 : 0.8;
    const color = isDanger ? '#ffffff' : isWarning ? '#ffffff' : 'rgba(255,255,255,0.45)';

    const m = L.circleMarker([s.lat, s.lon], {
      radius,
      color,
      weight,
      fillColor: SEV_COLOR[s.severity],
      fillOpacity: opacity,
    }).bindPopup(popupNode(s));
    m.on('click', () => {
      selectItem(s.id, s.lat, s.lon, 12, m, 'rivers');
    });
    m.addTo(stationLayer);
    stationMarkers.set(String(s.id), m);
    if (isDanger || isWarning) bounds.push([s.lat, s.lon]);
  }

  for (const h of highways) {
    if (h.lat == null || h.lon == null) continue;
    const isBlocked = h.status === 'blocked';
    const isNightBanned = h.status === 'night-banned';
    const color = isBlocked ? '#ef4444' : isNightBanned ? '#f59e0b' : '#10b981';
    const icon = L.divIcon({
      className: 'highway-badge-icon',
      html: `<div style="background:${color};width:${isBlocked ? 14 : 11}px;height:${isBlocked ? 14 : 11}px;border-radius:3px;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.6);"></div>`,
      iconSize: [14, 14]
    });
    const name = lang === 'ne' ? (h.nameNe || h.nameEn) : (h.nameEn || h.nameNe);
    const fromDisp = toPlaceName(h.from);
    const toDisp = toPlaceName(h.to);
    const m = L.marker([h.lat, h.lon], { icon })
      .bindPopup(`<b>${name}</b><br><span style="font-size:11px;">${fromDisp} ➔ ${toDisp}</span><br><b>${h.status.toUpperCase()}</b>`);
    m.on('click', () => {
      selectItem('hw-' + h.id, h.lat, h.lon, 11, m, 'highways');
      const selF = document.getElementById('route-from'), selT = document.getElementById('route-to');
      if (selF && selT) {
        selF.value = h.from;
        selT.value = h.to;
        checkRoute();
      }
    });
    m.addTo(hazardLayer);
    highwayMarkers.set(String(h.id), m);
  }

  for (const inc of incidents) {
    if (inc.lat == null || inc.lon == null) continue;
    const icon = L.divIcon({
      className: 'pulse',
      html: '<div class="pulse-dot"></div>',
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });
    const title = lang === 'ne' ? (inc.titleNe || inc.titleEn) : (inc.titleEn || inc.titleNe);
    const dateStr = inc.occurredAt ? new Date(inc.occurredAt).toLocaleDateString() : '';
    const reportUrl = inc.bipadUrl || `https://bipadportal.gov.np/incidents/${inc.id}`;

    const pd = document.createElement('div');
    pd.className = 'popup-incident';
    pd.innerHTML = `
      <b style="color:#ef4444;">🚨 ${title}</b><br>
      <span style="font-size:11px;color:#7a8aa0;">${dateStr} · ${t('sourceBipad')}</span>
      <div style="display:flex;gap:6px;margin-top:8px;">
        <a href="${reportUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:4px 8px;background:#1b2a3a;color:#2f9bff;border-radius:4px;font-size:11px;text-decoration:none;font-weight:600;">🏛️ ${t('officialReport')}</a>
        <button type="button" class="btn-popup-news" style="display:inline-block;padding:4px 8px;background:#1b2a3a;color:#38bdf8;border:1px solid #283e58;border-radius:4px;font-size:11px;font-weight:600;cursor:pointer;">📰 ${t('searchNews')}</button>
      </div>
    `;
    const newsBtn = pd.querySelector('.btn-popup-news');
    if (newsBtn) {
      newsBtn.onclick = (e) => {
        e.stopPropagation();
        openNewsModal(inc);
      };
    }

    const m = L.marker([inc.lat, inc.lon], { icon }).bindPopup(pd);
    m.on('click', () => {
      selectItem('inc-' + inc.id, inc.lat, inc.lon, 12, m, 'rivers');
    });
    m.addTo(hazardLayer);
    incidentMarkers.set(String(inc.id), m);
  }

  if (bounds.length && !selectedId && !userInteractedWithMap) {
    const mobile = window.innerWidth < 768;
    const paddingBottom = mobile ? Math.round(window.innerHeight * 0.48) : 0;
    const paddingRight = mobile ? 0 : 410;
    map.fitBounds([[26.3, 80.0], [30.5, 88.2]], {
      maxZoom: mobile ? 6.8 : 8,
      paddingTopLeft: [10, 65],
      paddingBottomRight: [paddingRight, paddingBottom]
    });
  }
}

function createStationCard(s) {
  const div = document.createElement('div');
  div.className = 'card ' + s.severity + (selectedId === String(s.id) ? ' selected' : '');
  div.dataset.id = String(s.id);
  const nameEl = document.createElement('div');
  nameEl.className = 'name';
  nameEl.textContent = s.name;
  const metaEl = document.createElement('div');
  metaEl.className = 'meta';
  metaEl.textContent = [s.district || '—', s.basin ? s.basin + (lang === 'ne' ? ' जलाधार' : ' basin') : ''].filter(Boolean).join(' · ');
  const lvlEl = document.createElement('div');
  lvlEl.className = 'lvl';
  const statusLabel = s.severity === 'danger' ? t('legendAbove')
    : s.severity === 'warning' ? t('legendWarn')
    : t('legendBelow');
  if (s.waterLevel != null) {
    lvlEl.append(statusLabel + ': ', document.createElement('b'));
    lvlEl.lastChild.textContent = fmt(s.waterLevel) + ' m';
    lvlEl.appendChild(document.createTextNode(` · warn ${fmt(s.warningLevel)} · danger ${fmt(s.dangerLevel)}`));
  } else {
    lvlEl.textContent = lang === 'ne' ? 'कुनै डाटा छैन' : 'No current reading';
  }
  div.append(nameEl, metaEl, lvlEl);
  div.onclick = () => {
    selectItem(s.id, s.lat, s.lon, 12, stationMarkers.get(String(s.id)));
  };
  return div;
}

function createIncidentCard(x) {
  const div = document.createElement('div');
  const cardId = 'inc-' + x.id;
  div.className = 'card danger' + (selectedId === cardId ? ' selected' : '');
  div.dataset.id = cardId;
  const title = lang === 'ne' ? (x.titleNe || x.titleEn) : (x.titleEn || x.titleNe);
  const nameEl = document.createElement('div');
  nameEl.className = 'name';
  nameEl.textContent = title;
  const metaEl = document.createElement('div');
  metaEl.className = 'meta';
  const dateStr = x.occurredAt ? new Date(x.occurredAt).toLocaleDateString() : '';
  metaEl.textContent = `${dateStr} · ${t('sourceBipad')}`;

  const actionsEl = document.createElement('div');
  actionsEl.className = 'incident-actions';

  const reportLink = document.createElement('a');
  reportLink.className = 'btn-incident-action';
  reportLink.href = x.bipadUrl || `https://bipadportal.gov.np/incidents/${x.id}`;
  reportLink.target = '_blank';
  reportLink.rel = 'noopener noreferrer';
  reportLink.innerHTML = `<span>🏛️</span> ${t('officialReport')}`;
  reportLink.onclick = (e) => e.stopPropagation();

  const newsBtn = document.createElement('button');
  newsBtn.type = 'button';
  newsBtn.className = 'btn-incident-action btn-incident-news';
  newsBtn.innerHTML = `<span>📰</span> ${t('searchNews')}`;
  newsBtn.onclick = (e) => {
    e.stopPropagation();
    openNewsModal(x);
  };

  actionsEl.append(reportLink, newsBtn);
  div.append(nameEl, metaEl, actionsEl);
  div.onclick = () => {
    selectItem(cardId, x.lat, x.lon, 12, incidentMarkers.get(String(x.id)));
  };
  return div;
}

function renderStations(filter = '') {
  const f = filter.trim().toLowerCase();
  let list = allStations
    .filter((s) => !f || s.name.toLowerCase().includes(f) || (s.district || '').toLowerCase().includes(f))
    .sort((a, b) => (SEV_RANK[b.severity] - SEV_RANK[a.severity]) || (b.ratio || 0) - (a.ratio || 0));
  const el = document.getElementById('station-list');
  if (listFilter === 'danger') {
    list = list.filter((s) => s.severity === 'danger' || s.severity === 'warning');
  }
  el.innerHTML = '';
  if (!list.length) {
    const empty = document.createElement('div');
    empty.className = 'empty';
    empty.textContent = t('noDangerStations');
    el.appendChild(empty);
    return;
  }
  const frag = document.createDocumentFragment();
  for (const s of list) {
    frag.appendChild(createStationCard(s));
  }
  el.appendChild(frag);
}

function renderIncidents(filter = '') {
  const f = filter.trim().toLowerCase();
  const el = document.getElementById('incident-list');
  if (!el) return;
  el.innerHTML = '';
  let list = incidents
    .filter((x) => !f || (x.titleEn || '').toLowerCase().includes(f) || (x.titleNe || '').toLowerCase().includes(f))
    .sort((a, b) => new Date(b.occurredAt || 0) - new Date(a.occurredAt || 0));

  if (!list.length) {
    if (listFilter === 'incidents' || listFilter === 'danger') {
      const empty = document.createElement('div');
      empty.className = 'empty';
      empty.textContent = t('noDangerIncidents');
      el.appendChild(empty);
    }
    return;
  }
  const frag = document.createDocumentFragment();
  for (const inc of list) {
    frag.appendChild(createIncidentCard(inc));
  }
  el.appendChild(frag);
}

// ---- Highway Graph & Dynamic Route Calculation Engine --------------------
const HW_RANK = { blocked: 3, 'night-banned': 2, open: 1 };

function buildHighwayGraph() {
  highwayGraph.clear();
  routeCache.clear();
  for (const h of highways) {
    if (!h.from || !h.to) continue;
    const f = h.from.trim();
    const t = h.to.trim();
    if (!highwayGraph.has(f)) highwayGraph.set(f, []);
    if (!highwayGraph.has(t)) highwayGraph.set(t, []);

    // Forward edge
    highwayGraph.get(f).push({ to: t, segment: h, isReversed: false });
    // Backward edge (undirected road network)
    highwayGraph.get(t).push({ to: f, segment: h, isReversed: true });
  }
}

function calculateDijkstra(startNode, endNode) {
  if (!highwayGraph.has(startNode) || !highwayGraph.has(endNode)) return null;
  if (startNode.toLowerCase() === endNode.toLowerCase()) return null;

  const distances = new Map();
  const prev = new Map();
  const unvisited = new Set(highwayGraph.keys());

  for (const node of highwayGraph.keys()) {
    distances.set(node, Infinity);
  }
  distances.set(startNode, 0);

  while (unvisited.size > 0) {
    let current = null;
    let minDis = Infinity;
    for (const node of unvisited) {
      const d = distances.get(node);
      if (d < minDis) {
        minDis = d;
        current = node;
      }
    }

    if (current === null || minDis === Infinity) break;
    if (current === endNode) break;

    unvisited.delete(current);

    const neighbors = highwayGraph.get(current) || [];
    for (const edge of neighbors) {
      if (!unvisited.has(edge.to)) continue;

      const status = edge.segment.status || 'open';
      const penalty = status === 'blocked' ? 1000 : status === 'night-banned' ? 1.5 : 1.0;
      const weight = (edge.segment.distanceKm || 50) * penalty;

      const alt = distances.get(current) + weight;
      if (alt < distances.get(edge.to)) {
        distances.set(edge.to, alt);
        prev.set(edge.to, { node: current, edge });
      }
    }
  }

  if (!prev.has(endNode)) return null;

  const pathEdges = [];
  let curr = endNode;
  while (curr !== startNode) {
    const step = prev.get(curr);
    if (!step) break;
    pathEdges.unshift(step.edge);
    curr = step.node;
  }

  return pathEdges;
}

function findRoute(origin, destination) {
  const o = (origin || '').trim();
  const d = (destination || '').trim();
  if (!o || !d || o.toLowerCase() === d.toLowerCase()) return null;

  const cacheKey = `${o.toLowerCase()}->${d.toLowerCase()}`;

  // 1. Fast-Path: Top 3 Pre-computed Routes Check
  const pre = precomputedRoutes.find((r) =>
    (r.from.toLowerCase() === o.toLowerCase() && r.to.toLowerCase() === d.toLowerCase()) ||
    (r.from.toLowerCase() === d.toLowerCase() && r.to.toLowerCase() === o.toLowerCase())
  );

  if (pre) {
    const isReverse = pre.from.toLowerCase() !== o.toLowerCase();
    const segIds = isReverse ? [...pre.segments].reverse() : pre.segments;
    const segs = segIds.map((id) => highways.find((hw) => hw.id === id)).filter(Boolean);
    
    if (segs.length) {
      const worst = segs.reduce((w, s) => (HW_RANK[s.status] > HW_RANK[w] ? s.status : w), 'open');
      const totalDist = pre.distanceKm || segs.reduce((sum, s) => sum + (s.distanceKm || 0), 0);
      
      let allCoords = [];
      for (let i = 0; i < segs.length; i++) {
        const s = segs[i];
        if (s.coords && s.coords.length) {
          let sc = [...s.coords];
          if (isReverse) sc.reverse();
          if (allCoords.length > 0 && sc.length > 0) {
            allCoords = allCoords.concat(sc.slice(1));
          } else {
            allCoords = allCoords.concat(sc);
          }
        }
      }

      return {
        from: o,
        to: d,
        status: worst,
        distanceKm: totalDist,
        segments: segs,
        coords: allCoords,
        isPrecomputed: true,
        noteEn: pre.noteEn,
        noteNe: pre.noteNe
      };
    }
  }

  // 2. Fast-Path: Memoized Cache Check
  if (routeCache.has(cacheKey)) {
    return routeCache.get(cacheKey);
  }

  // 3. Dynamic Calculation: Status-Weighted Dijkstra
  const pathEdges = calculateDijkstra(o, d);
  if (!pathEdges || !pathEdges.length) return null;

  const segs = pathEdges.map((e) => e.segment);
  const worst = segs.reduce((w, s) => (HW_RANK[s.status] > HW_RANK[w] ? s.status : w), 'open');
  const totalDist = segs.reduce((sum, s) => sum + (s.distanceKm || 0), 0);

  let allCoords = [];
  for (const edge of pathEdges) {
    const s = edge.segment;
    if (s.coords && s.coords.length) {
      let sc = [...s.coords];
      if (edge.isReversed) sc.reverse();
      if (allCoords.length > 0 && sc.length > 0) {
        allCoords = allCoords.concat(sc.slice(1));
      } else {
        allCoords = allCoords.concat(sc);
      }
    }
  }

  // Dynamic note synthesis
  const notesEnList = segs.map((s) => s.noteEn).filter(Boolean);
  const notesNeList = segs.map((s) => s.noteNe).filter(Boolean);
  const noteEn = notesEnList.length ? notesEnList.join(' · ') : `Route via ${segs.map(s => s.nameEn).join(', ')}.`;
  const noteNe = notesNeList.length ? notesNeList.join(' · ') : `${segs.map(s => s.nameNe || s.nameEn).join(', ')} हुँदै यात्रा।`;

  const routeObj = {
    from: o,
    to: d,
    status: worst,
    distanceKm: totalDist,
    segments: segs,
    coords: allCoords,
    isPrecomputed: false,
    noteEn,
    noteNe
  };

  // Cache result for instantaneous subsequent queries
  routeCache.set(cacheKey, routeObj);
  return routeObj;
}

// ---- Map Route Highlighting -----------------------------------------------
function highlightRouteOnMap(route) {
  routeHighlightLayer.clearLayers();
  if (!route || !route.coords || route.coords.length === 0) return;

  // Background casing for high visual contrast
  L.polyline(route.coords, {
    color: '#0b131e',
    weight: 8,
    opacity: 0.85,
    lineCap: 'round',
    lineJoin: 'round',
  }).addTo(routeHighlightLayer);

  // Foreground status-colored line
  const color = SEV_COLOR[route.status] || '#10b981';
  const mainLine = L.polyline(route.coords, {
    color: color,
    weight: 4.5,
    opacity: 0.95,
    lineCap: 'round',
    lineJoin: 'round',
    dashArray: route.status === 'night-banned' ? '8, 8' : null,
  }).addTo(routeHighlightLayer);

  const fromDisp = toPlaceName(route.from);
  const toDisp = toPlaceName(route.to);

  // Origin pin
  const startIcon = L.divIcon({
    className: 'route-pin start',
    html: 'A',
    iconSize: [22, 22],
    iconAnchor: [11, 11]
  });
  L.marker(route.coords[0], { icon: startIcon })
    .bindPopup(`<b>${fromDisp}</b><br><span style="font-size:11px;">${lang === 'ne' ? 'सुरुवात विन्दु' : 'Origin'}</span>`)
    .addTo(routeHighlightLayer);

  // Destination pin
  const endIcon = L.divIcon({
    className: 'route-pin end',
    html: 'B',
    iconSize: [22, 22],
    iconAnchor: [11, 11]
  });
  L.marker(route.coords[route.coords.length - 1], { icon: endIcon })
    .bindPopup(`<b>${toDisp}</b><br><span style="font-size:11px;">${lang === 'ne' ? 'गन्तव्य विन्दु' : 'Destination'}</span>`)
    .addTo(routeHighlightLayer);

  // Smooth fit bounds with responsive padding
  const bounds = mainLine.getBounds();
  if (bounds.isValid()) {
    const mobile = window.innerWidth < 768;
    const paddingBottom = mobile ? Math.round(window.innerHeight * 0.48) : 50;
    const paddingRight = mobile ? 20 : 420;
    map.fitBounds(bounds, {
      paddingTopLeft: [20, 65],
      paddingBottomRight: [paddingRight, paddingBottom],
      maxZoom: 11,
      duration: 0.8
    });
  }
}

function createHighwayCard(h) {
  const div = document.createElement('div');
  div.className = 'card ' + h.status;
  const label = { open: t('open'), 'night-banned': t('nightBanned'), blocked: t('blocked') };
  const name = lang === 'ne' ? (h.nameNe || h.nameEn) : (h.nameEn || h.nameNe);
  const note = lang === 'ne' ? (h.noteNe || h.noteEn) : (h.noteEn || h.noteNe);
  const codeBadge = h.code ? `<span class="badge-code">${h.code}</span>` : '';
  const distBadge = h.distanceKm ? `<span class="badge-distance">${fmtDist(h.distanceKm)}</span>` : '';
  const fromDisp = toPlaceName(h.from);
  const toDisp = toPlaceName(h.to);

  div.innerHTML = `<div class="name"><span>${codeBadge}${name}</span> <span>${distBadge} <span class="badge-type">${fromDisp}–${toDisp}</span></span></div>
    <div class="lvl">${label[h.status] || h.status}</div>
    <div class="meta">${note}</div>`;

  div.onclick = () => {
    const selF = document.getElementById('route-from'), selT = document.getElementById('route-to');
    if (selF && selT) {
      selF.value = h.from;
      selT.value = h.to;
      checkRoute();
    }
  };
  return div;
}

function createCompositeRouteCard(r) {
  const div = document.createElement('div');
  const route = findRoute(r.from, r.to) || r;
  const worst = route.status || 'open';
  div.className = 'card ' + worst;
  const label = { open: t('open'), 'night-banned': t('nightBanned'), blocked: t('blocked') };
  const note = lang === 'ne' ? (route.noteNe || route.noteEn || '') : (route.noteEn || route.noteNe || '');
  const distBadge = route.distanceKm ? `<span class="badge-distance">${fmtDist(route.distanceKm)}</span>` : '';
  const preBadge = `<span class="badge-fastpath">${t('topRouteBadge')}</span>`;

  const fromDisp = toPlaceName(r.from);
  const toDisp = toPlaceName(r.to);

  const segs = route.segments || [];
  const segChips = segs.map((s) => {
    const sName = lang === 'ne' ? (s.nameNe || s.nameEn) : (s.nameEn || s.nameNe);
    return `<span class="seg-chip">${sName}</span>`;
  }).join(' <span class="seg-arrow">➔</span> ');

  div.innerHTML = `<div class="name"><span>📍 ${fromDisp} ➔ ${toDisp}</span> <span>${preBadge} ${distBadge}</span></div>
    <div class="lvl">${label[worst] || worst}</div>
    <div class="route-segments">${segChips}</div>
    <div class="meta" style="margin-top:6px;">${note}</div>`;

  div.onclick = () => {
    const selF = document.getElementById('route-from'), selT = document.getElementById('route-to');
    if (selF && selT) {
      selF.value = r.from;
      selT.value = r.to;
      checkRoute();
    }
  };
  return div;
}

function renderHighways() {
  const el = document.getElementById('highway-list');
  el.innerHTML = '';
  const frag = document.createDocumentFragment();

  if (hwFilter === 'all' || hwFilter === 'composite') {
    if (precomputedRoutes.length) {
      const h2 = document.createElement('h2');
      h2.className = 'subhead';
      const countStr = lang === 'ne' ? toNepaliDigits(precomputedRoutes.length) : precomputedRoutes.length;
      h2.textContent = t('intercityRoutes') + ` (${countStr})`;
      frag.appendChild(h2);
      for (const r of precomputedRoutes) {
        frag.appendChild(createCompositeRouteCard(r));
      }
    }
  }

  if (hwFilter === 'all' || hwFilter === 'highways') {
    if (highways.length) {
      const h2 = document.createElement('h2');
      h2.className = 'subhead';
      const countStr = lang === 'ne' ? toNepaliDigits(highways.length) : highways.length;
      h2.textContent = t('majorHighways') + ` (${countStr})`;
      frag.appendChild(h2);
      for (const h of highways) {
        frag.appendChild(createHighwayCard(h));
      }
    }
  }

  el.appendChild(frag);

  // Populate dynamic origin/destination places dropdown with localized names
  const places = [...new Set([
    ...highways.flatMap((h) => [h.from, h.to]),
    ...precomputedRoutes.flatMap((r) => [r.from, r.to]),
  ])].filter(Boolean).sort();

  const selF = document.getElementById('route-from'), selT = document.getElementById('route-to');
  const curF = selF.value, curT = selT.value;
  const placeholderFrom = `<option value="" disabled ${!curF ? 'selected' : ''}>${t('from')}…</option>`;
  const placeholderTo = `<option value="" disabled ${!curT ? 'selected' : ''}>${t('to')}…</option>`;
  selF.innerHTML = placeholderFrom;
  selT.innerHTML = placeholderTo;
  for (const p of places) {
    const dispName = toPlaceName(p);
    selF.insertAdjacentHTML('beforeend', `<option value="${p}">${dispName}</option>`);
    selT.insertAdjacentHTML('beforeend', `<option value="${p}">${dispName}</option>`);
  }
  if (curF) selF.value = curF;
  if (curT) selT.value = curT;
}

function renderHelplines() {
  const el = document.getElementById('helpline-list');
  el.innerHTML = '';
  const frag = document.createDocumentFragment();
  for (const h of helplines) {
    const div = document.createElement('div');
    div.className = 'card normal';
    const name = lang === 'ne' ? (h.nameNe || h.nameEn) : (h.nameEn || h.nameNe);
    div.innerHTML = `<div class="name">${name}</div>
      <a class="call" href="tel:${h.phone}">📞 ${h.phone}</a>`;
    frag.appendChild(div);
  }
  el.appendChild(frag);
}

function applyListFilter() {
  document.querySelectorAll('#panel-rivers .filters .chip').forEach((c) => c.classList.toggle('active', c.dataset.filter === listFilter));
  const search = document.getElementById('search');
  const stations = document.getElementById('station-list');
  const incHead = document.querySelector('#panel-rivers .subhead');
  const stationsHead = document.getElementById('stations-head');
  const incList = document.getElementById('incident-list');

  search.classList.remove('hidden'); stations.classList.remove('hidden');
  stationsHead.classList.remove('hidden'); incHead.classList.remove('hidden'); incList.classList.remove('hidden');

  if (listFilter === 'incidents') {
    stations.classList.add('hidden'); stationsHead.classList.add('hidden');
    incHead.textContent = t('incidents');
    renderIncidents(search.value);
  } else if (listFilter === 'danger') {
    incHead.textContent = t('incidents');
    renderStations(search.value);
    renderIncidents(search.value);
  } else {
    incHead.textContent = t('incidents');
    renderStations(search.value);
    renderIncidents(search.value);
  }
}

function checkRoute() {
  const from = document.getElementById('route-from').value;
  const to = document.getElementById('route-to').value;
  const box = document.getElementById('route-verdict');
  box.className = 'verdict hidden';
  box.innerHTML = '';
  if (!from || !to) {
    routeHighlightLayer.clearLayers();
    box.textContent = t('noRoute');
    box.classList.remove('hidden');
    return;
  }
  const label = { open: t('open'), 'night-banned': t('nightBanned'), blocked: t('blocked') };

  const route = findRoute(from, to);

  if (route) {
    highlightRouteOnMap(route);

    const fromDisp = toPlaceName(from);
    const toDisp = toPlaceName(to);
    const note = lang === 'ne' ? (route.noteNe || route.noteEn || '') : (route.noteEn || route.noteNe || '');
    const segChips = (route.segments || []).map((s) => {
      const sName = lang === 'ne' ? (s.nameNe || s.nameEn) : (s.nameEn || s.nameNe);
      return `<span class="verdict-chip ${s.status}">${sName}</span>`;
    }).join(' <span class="seg-arrow">➔</span> ');

    const distInfo = route.distanceKm ? ` · ${fmtDist(route.distanceKm)}` : '';
    const badgeType = route.isPrecomputed
      ? `<span class="badge-fastpath">${t('topRouteBadge')}</span>`
      : `<span class="badge-code">${t('calculatedBadge')} (${fmtLegs(route.segments.length)})</span>`;

    box.className = 'verdict ' + route.status;
    box.innerHTML = `
      <div class="verdict-header">
        <span>📍 ${fromDisp} ➔ ${toDisp}${distInfo}</span>
        <span class="verdict-status">${label[route.status] || route.status}</span>
      </div>
      <div style="margin-top:4px;">${badgeType}</div>
      <div class="verdict-segments">${segChips}</div>
      <div class="sub">${note}</div>
    `;
    box.classList.remove('hidden');
    return;
  }

  // No graph route found
  routeHighlightLayer.clearLayers();
  box.textContent = t('noMatch');
  box.classList.remove('hidden');
}

let lastStationsData = null;

function updateStatusBadge(updatedAt, stationCount, isBaseline) {
  const statusEl = document.getElementById('status');
  if (!statusEl) return;
  const d = new Date(updatedAt);
  const timeStr = d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const gaugeWord = t('stations');
  const countStr = lang === 'ne' ? toNepaliDigits(stationCount) : stationCount;
  statusEl.innerHTML = `<span class="status-dot"></span><span>${countStr} ${gaugeWord} · ${timeStr}${isBaseline ? ' (offline)' : ''}</span>`;
}

async function loadStations() {
  const status = document.getElementById('status');
  try {
    const j = await (await fetch('/api/stations')).json();
    if (!j.stations) throw new Error(j.error || 'no data');
    allStations = j.stations;
    lastStationsData = j;
    renderMarkers();
    renderStations(document.getElementById('search').value);
    applyListFilter();
    updateStatusBadge(j.updated, j.stations.length, j.baseline);
  } catch (e) {
    if (status) status.textContent = 'Gauges: ' + e.message;
  }
}

async function loadHighways() {
  try {
    const j = (await (await fetch('/api/highways')).json());
    highways = j.highways || [];
    precomputedRoutes = j.precomputedRoutes || [];
    buildHighwayGraph();
    renderHighways();
    renderMarkers();
  } catch (_) {}
}

async function loadHelplines() {
  try { helplines = (await (await fetch('/api/helplines')).json()).helplines || []; renderHelplines(); } catch (_) {}
}

async function loadIncidents() {
  try {
    const j = await (await fetch('/api/incidents')).json();
    incidents = j.incidents || [];
    renderMarkers(); renderIncidents(document.getElementById('search').value); applyListFilter();
  } catch (_) {}
}

// ---- RainViewer radar ----
let radarLayer = null, radarTimer = null, radarFrames = null;
async function loadRadar() {
  try {
    const j = await (await fetch('https://api.rainviewer.com/public/weather-maps.json')).json();
    const host = j.host || 'https://tilecache.rainviewer.com';
    const past = (j.radar && j.radar.past) || [];
    const nowcast = (j.radar && j.radar.nowcast) || [];
    radarFrames = past
      .concat(nowcast)
      .map((f) => `${host}${f.path}/256/{z}/{x}/{y}/2/1_1.png`);
  } catch (_) { radarFrames = null; }
}
function showRadar(on) {
  const btn = document.getElementById('radar-toggle');
  if (!on) {
    if (radarLayer) map.removeLayer(radarLayer); radarLayer = null;
    clearInterval(radarTimer); btn.classList.remove('on'); return;
  }
  if (!radarFrames || !radarFrames.length) { btn.classList.remove('on'); return; }
  let i = 0;
  const addFrame = () => {
    if (!radarLayer) {
      radarLayer = L.tileLayer(radarFrames[i], {
        pane: 'radarPane',
        opacity: 0.7,
        maxNativeZoom: 10,
        maxZoom: 18,
        attribution: 'RainViewer'
      }).addTo(map);
    } else {
      radarLayer.setUrl(radarFrames[i]);
    }
    i = (i + 1) % radarFrames.length;
  };
  addFrame(); radarTimer = setInterval(addFrame, 1500); btn.classList.add('on');
}

function switchTab(tabName) {
  currentTab = tabName;
  document.querySelectorAll('.tab').forEach((b) => b.classList.toggle('active', b.dataset.tab === tabName));
  document.querySelectorAll('.tab-panel').forEach((p) => p.classList.toggle('active', p.id === 'panel-' + tabName));
  updateScrollTopButton();
  renderMarkers();
}

// ---- i18n apply ----
function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-ph]').forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
  document.getElementById('lang-switch').textContent = lang === 'en' ? 'नेपाली' : 'English';
  renderStations(document.getElementById('search').value);
  renderIncidents(document.getElementById('search').value);
  renderHighways();
  renderHelplines();
  applyListFilter();
  if (lastStationsData) {
    updateStatusBadge(lastStationsData.updated, lastStationsData.stations.length, lastStationsData.baseline);
  }
  renderMarkers();
  const box = document.getElementById('route-verdict');
  if (!box.classList.contains('hidden')) checkRoute();
}

// ---- scroll to top handler ----
const scrollTopBtn = document.getElementById('scroll-top-btn');
function updateScrollTopButton() {
  const activePanel = document.querySelector('.tab-panel.active');
  if (!activePanel || !scrollTopBtn) return;
  scrollTopBtn.classList.toggle('visible', activePanel.scrollTop > 80);
}

document.querySelectorAll('.tab-panel').forEach((panel) => {
  panel.addEventListener('scroll', updateScrollTopButton, { passive: true });
});

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    const activePanel = document.querySelector('.tab-panel.active');
    if (activePanel) {
      activePanel.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

// ---- sheet drag & toggle (mobile) ----
const sheet = document.getElementById('sheet');
const sheetHandle = document.getElementById('sheet-handle');
const tabsBar = document.getElementById('tabs');

function setSheetState(state) {
  sheet.classList.remove('collapsed', 'expanded');
  if (state === 'collapsed') sheet.classList.add('collapsed');
  else if (state === 'expanded') sheet.classList.add('expanded');
  setTimeout(() => map.invalidateSize(), 300);
}

if (sheetHandle) {
  sheetHandle.addEventListener('click', () => {
    if (sheet.classList.contains('collapsed')) {
      setSheetState('half');
    } else if (sheet.classList.contains('expanded')) {
      setSheetState('half');
    } else {
      setSheetState('collapsed');
    }
  });
}

let touchStartY = 0, touchDiffY = 0, isDraggingSheet = false;
[sheetHandle, tabsBar].forEach((el) => {
  if (!el) return;
  el.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
    touchDiffY = 0;
    isDraggingSheet = true;
  }, { passive: true });

  el.addEventListener('touchmove', (e) => {
    if (!isDraggingSheet) return;
    touchDiffY = e.touches[0].clientY - touchStartY;
  }, { passive: true });

  el.addEventListener('touchend', () => {
    if (!isDraggingSheet) return;
    isDraggingSheet = false;
    if (touchDiffY > 35) {
      if (sheet.classList.contains('expanded')) {
        setSheetState('half');
      } else {
        setSheetState('collapsed');
      }
    } else if (touchDiffY < -35) {
      if (sheet.classList.contains('collapsed')) {
        setSheetState('half');
      } else {
        setSheetState('expanded');
      }
    }
  });
});

// ---- events ----
document.querySelectorAll('.tab').forEach((btn) => btn.addEventListener('click', () => {
  if (btn.classList.contains('active')) {
    const activePanel = document.getElementById('panel-' + btn.dataset.tab);
    if (activePanel) activePanel.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    switchTab(btn.dataset.tab);
  }
}));

document.getElementById('lang-switch').addEventListener('click', () => {
  lang = lang === 'en' ? 'ne' : 'en';
  applyLang();
});

document.getElementById('radar-toggle').addEventListener('click', () => showRadar(!document.getElementById('radar-toggle').classList.contains('on')));

const mapModeBtn = document.getElementById('map-mode-toggle');
if (mapModeBtn) {
  mapModeBtn.addEventListener('click', () => {
    mapFilterMode = mapFilterMode === 'hazards' ? 'all' : 'hazards';
    renderMarkers();
  });
}

document.getElementById('search').addEventListener('input', () => { applyListFilter(); });

['change', 'input'].forEach((evt) => {
  document.getElementById('route-from').addEventListener(evt, () => {
    if (document.getElementById('route-to').value) checkRoute();
  });
  document.getElementById('route-to').addEventListener(evt, () => {
    if (document.getElementById('route-from').value) checkRoute();
  });
});

document.querySelectorAll('#panel-rivers .filters .chip').forEach((c) => c.addEventListener('click', () => {
  listFilter = c.dataset.filter;
  document.querySelectorAll('#panel-rivers .filters .chip').forEach((b) => b.classList.toggle('active', b === c));
  applyListFilter();
}));

document.querySelectorAll('#panel-highways .filters .chip').forEach((c) => c.addEventListener('click', () => {
  hwFilter = c.dataset.hwfilter;
  document.querySelectorAll('#panel-highways .filters .chip').forEach((b) => b.classList.toggle('active', b === c));
  renderHighways();
}));

// ---- news modal events ----
const newsModal = document.getElementById('news-modal');
const newsCloseBtn = document.getElementById('news-modal-close');
const newsSearchInput = document.getElementById('news-search-input');
const newsSearchSubmit = document.getElementById('news-search-submit');

if (newsCloseBtn) newsCloseBtn.addEventListener('click', closeNewsModal);
if (newsModal) {
  newsModal.addEventListener('click', (e) => {
    if (e.target === newsModal) closeNewsModal();
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeNewsModal();
});

if (newsSearchSubmit && newsSearchInput) {
  const triggerSearch = () => {
    const q = newsSearchInput.value.trim();
    if (q) {
      currentNewsQuery = q;
      currentNewsQueryEn = q;
      currentNewsQueryNe = q;
      fetchAndRenderNews(currentNewsQuery, currentNewsFilter, currentNewsQueryEn, currentNewsQueryNe);
    }
  };
  newsSearchSubmit.addEventListener('click', triggerSearch);
  newsSearchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') triggerSearch();
  });
}

document.querySelectorAll('[data-newsfilter]').forEach((chip) => {
  chip.addEventListener('click', () => {
    currentNewsFilter = chip.dataset.newsfilter;
    document.querySelectorAll('[data-newsfilter]').forEach((c) => c.classList.toggle('active', c === chip));
    const inputVal = (document.getElementById('news-search-input')?.value || '').trim();
    if (inputVal) {
      currentNewsQuery = inputVal;
      if (!currentNewsQueryEn && !currentNewsQueryNe) {
        currentNewsQueryEn = inputVal;
        currentNewsQueryNe = inputVal;
      }
    }
    fetchAndRenderNews(currentNewsQuery, currentNewsFilter, currentNewsQueryEn, currentNewsQueryNe);
  });
});

applyLang();
loadStations();
loadHighways();
loadHelplines();
loadIncidents();
loadRadar();
setInterval(loadStations, 5 * 60 * 1000);
