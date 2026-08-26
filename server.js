const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DHM_URL = 'https://dhm.gov.np/hydrology/floodMonitoring';
const BIPAD_URL = 'https://bipadportal.gov.np/api/v1/incident/?ordering=-incident_on&limit=50';

let stationsCache = { at: 0, data: null };
const CACHE_TTL_MS = 5 * 60 * 1000;

function toNumber(v) {
  if (v == null) return null;
  const n = parseFloat(String(v).replace(/,/g, ''));
  return Number.isFinite(n) ? n : null;
}

// Offline baseline: major river basins. Used when DHM unreachable so the app
// never shows a blank screen. Values are approximate typical levels (m).
const BASELINE_STATIONS = [
  { id: 'bas-bagmati-kupondole', name: 'Bagmati (Kupondole)', basin: 'Bagmati', district: 'Kathmandu', latitude: 27.69, longitude: 85.32, waterLevel: 2.1, warning_level: 3.5, danger_level: 4.2, status: 'Below Warning' },
  { id: 'bas-nakhu-nakhuchowk', name: 'Nakhu (Nakhuchowk)', basin: 'Nakkhu', district: 'Lalitpur', latitude: 27.65, longitude: 85.32, waterLevel: 1.8, warning_level: 3.0, danger_level: 3.8, status: 'Below Warning' },
  { id: 'bas-bhotekoshi-jambu', name: 'Bhotekoshi (Jambu)', basin: 'Bhotekoshi', district: 'Sindhupalchok', latitude: 27.98, longitude: 85.29, waterLevel: 3.4, warning_level: 4.0, danger_level: 5.0, status: 'Warning' },
  { id: 'bas-trisuli-betrawati', name: 'Trisuli (Betrawati)', basin: 'Trishuli', district: 'Nuwakot', latitude: 27.92, longitude: 85.18, waterLevel: 4.2, warning_level: 5.5, danger_level: 6.5, status: 'Below Warning' },
  { id: 'bas-sunkoshi', name: 'Sunkoshi (Sunkoshi)', basin: 'Koshi', district: 'Sindhuli', latitude: 27.65, longitude: 85.74, waterLevel: 5.0, warning_level: 7.0, danger_level: 8.5, status: 'Below Warning' },
  { id: 'bas-tamakoshi', name: 'Tamakoshi (Dolakha)', basin: 'Koshi', district: 'Dolakha', latitude: 27.68, longitude: 86.07, waterLevel: 3.5, warning_level: 5.0, danger_level: 6.0, status: 'Below Warning' },
  { id: 'bas-indrawati-dolalghat', name: 'Indrawati (Dolalghat)', basin: 'Koshi', district: 'Kavrepalanchok', latitude: 27.61, longitude: 85.60, waterLevel: 2.6, warning_level: 3.8, danger_level: 4.6, status: 'Below Warning' },
  { id: 'bas-rosi-banepa', name: 'Roshi Khola (Banepa)', basin: 'Koshi', district: 'Kavrepalanchok', latitude: 27.63, longitude: 85.53, waterLevel: 1.9, warning_level: 2.8, danger_level: 3.4, status: 'Below Warning' },
  { id: 'bas-arun', name: 'Arun (Khadbari)', basin: 'Koshi', district: 'Sankhuwasabha', latitude: 27.32, longitude: 87.15, waterLevel: 4.0, warning_level: 6.0, danger_level: 7.5, status: 'Below Warning' },
  { id: 'bas-khimti', name: 'Khimti (Ghurmi)', basin: 'Koshi', district: 'Dolakha', latitude: 27.45, longitude: 86.10, waterLevel: 2.4, warning_level: 3.6, danger_level: 4.4, status: 'Below Warning' },
  { id: 'bas-marsyangdi', name: 'Marsyangdi (Aanbu Khaireni)', basin: 'Gandaki', district: 'Tanahun', latitude: 27.85, longitude: 84.42, waterLevel: 3.2, warning_level: 4.5, danger_level: 5.5, status: 'Below Warning' },
  { id: 'bas-seti-damauli', name: 'Seti (Damauli)', basin: 'Gandaki', district: 'Tanahun', latitude: 27.95, longitude: 84.30, waterLevel: 2.7, warning_level: 4.0, danger_level: 5.0, status: 'Below Warning' },
  { id: 'bas-kali-gandaki', name: 'Kali Gandaki (Arughat)', basin: 'Gandaki', district: 'Gorkha', latitude: 27.91, longitude: 84.78, waterLevel: 3.6, warning_level: 5.0, danger_level: 6.0, status: 'Below Warning' },
  { id: 'bas-budhigandaki', name: 'Budhigandaki (Gorkha)', basin: 'Gandaki', district: 'Gorkha', latitude: 27.92, longitude: 84.83, waterLevel: 3.0, warning_level: 4.2, danger_level: 5.2, status: 'Below Warning' },
  { id: 'bas-narayani-devghat', name: 'Narayani (Devghat)', basin: 'Narayani', district: 'Chitwan', latitude: 27.85, longitude: 84.43, waterLevel: 4.0, warning_level: 6.0, danger_level: 7.2, status: 'Below Warning' },
  { id: 'bas-west-rapti', name: 'West Rapti (Rapti)', basin: 'Narayani', district: 'Chitwan', latitude: 27.58, longitude: 84.35, waterLevel: 2.8, warning_level: 4.0, danger_level: 5.0, status: 'Below Warning' },
  { id: 'bas-tinau', name: 'Tinau (Bhairahawa)', basin: 'Narayani', district: 'Rupandehi', latitude: 27.52, longitude: 83.44, waterLevel: 2.0, warning_level: 3.0, danger_level: 3.8, status: 'Below Warning' },
  { id: 'bas-karnali-chisapani', name: 'Karnali (Chisapani)', basin: 'Karnali', district: 'Surkhet', latitude: 28.35, longitude: 81.35, waterLevel: 4.5, warning_level: 7.0, danger_level: 8.5, status: 'Below Warning' },
  { id: 'bas-babai', name: 'Babai (Chisapani)', basin: 'Karnali', district: 'Bardiya', latitude: 28.30, longitude: 81.30, waterLevel: 2.5, warning_level: 3.8, danger_level: 4.6, status: 'Below Warning' },
  { id: 'bas-mahakali', name: 'Mahakali (Bhimdatta)', basin: 'Karnali', district: 'Kanchanpur', latitude: 28.92, longitude: 80.15, waterLevel: 3.0, warning_level: 4.5, danger_level: 5.5, status: 'Below Warning' },
];

function extractArray(html, varName) {
  const re = new RegExp('(?:var|const|let)\\s+' + varName + '\\s*=\\s*\\[');
  const start = html.match(re);
  if (!start) return null;
  const open = start.index + start[0].length - 1;
  let depth = 0;
  let inStr = null;
  for (let i = open; i < html.length; i++) {
    const c = html[i];
    if (inStr) {
      if (c === '\\') { i++; continue; }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'") { inStr = c; continue; }
    if (c === '[') depth++;
    else if (c === ']') {
      depth--;
      if (depth === 0) {
        try { return JSON.parse(html.slice(open, i + 1)); }
        catch { return null; }
      }
    }
  }
  return null;
}

function severityFromStatus(status) {
  if (!status) return 'unknown';
  const s = String(status).toUpperCase();
  if (s.includes('DANGER')) return 'danger';
  if (s.includes('BELOW')) return 'normal';
  if (s.includes('WARNING')) return 'warning';
  return 'unknown';
}

function normalizeStation(s) {
  const wl = s.waterLevel && typeof s.waterLevel === 'object' ? toNumber(s.waterLevel.value) : toNumber(s.waterLevel);
  const warning = toNumber(s.warning_level);
  const danger = toNumber(s.danger_level);
  const severity = severityFromStatus(s.status);
  const ratio = wl != null && warning ? wl / warning : null;

  let lat = toNumber(s.latitude);
  let lon = toNumber(s.longitude);

  // Auto-correct inverted lat/lon (Nepal is ~26-31°N, ~80-89°E)
  if (lat > 70 && lon < 40) {
    [lat, lon] = [lon, lat];
  }

  // Filter out any invalid / out-of-bounds coordinates
  if (!lat || !lon || lat < 25.0 || lat > 32.0 || lon < 79.0 || lon > 89.5) {
    return null;
  }

  return {
    id: String(s.id),
    name: (s.name || s.description || 'Unknown').trim(),
    basin: s.basin || '',
    district: s.district || '',
    lat,
    lon,
    waterLevel: wl,
    warningLevel: warning,
    dangerLevel: danger,
    trend: (s.steady || '').toUpperCase() || null,
    status: s.status || null,
    severity,
    ratio,
    updatedAt: s.waterLevel && s.waterLevel.datetime ? s.waterLevel.datetime : null,
  };
}

async function fetchStations() {
  const res = await fetch(DHM_URL, {
    signal: AbortSignal.timeout(25000),
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', Accept: 'text/html' },
  });
  if (!res.ok) throw new Error('DHM HTTP ' + res.status);
  const html = await res.text();
  const raw = extractArray(html, 'riverwatch_coordinates') || [];
  const stations = raw
    .filter((s) => s && s.id && s.latitude && s.longitude)
    .map(normalizeStation)
    .filter((s) => s.lat != null && s.lon != null);
  if (!stations.length) throw new Error('No stations parsed from DHM');
  return stations;
}

app.get('/api/stations', async (req, res) => {
  const now = Date.now();
  if (stationsCache.data && now - stationsCache.at < CACHE_TTL_MS) {
    return res.json({ updated: stationsCache.at, cached: true, source: DHM_URL, stations: stationsCache.data });
  }
  try {
    const stations = await fetchStations();
    stationsCache = { at: now, data: stations };
    res.json({ updated: now, cached: false, source: DHM_URL, stations });
  } catch (err) {
    if (stationsCache.data) {
      return res.json({ updated: stationsCache.at, cached: true, stale: true, error: err.message, source: DHM_URL, stations: stationsCache.data });
    }
    // Final fallback: offline baseline so the screen is never blank.
    res.json({
      updated: now, cached: false, baseline: true, error: err.message,
      source: 'offline-baseline', stations: BASELINE_STATIONS.map(normalizeStation),
    });
  }
});

// ---- BIPAD incidents ----------------------------------------------------
let incidentsCache = { at: 0, data: null };

const FLOOD_KW = /(बाढी|पहिरो|भूक्षय|जलमग्न|flood|landslide|flash flood|debris|heavy rain|inundation|submerged)/i;
async function fetchIncidents() {
  const res = await fetch(BIPAD_URL, { signal: AbortSignal.timeout(15000), headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error('BIPAD HTTP ' + res.status);
  const j = await res.json();
  const list = Array.isArray(j) ? j : (j.results || j.data || []);
  const all = list
    .filter((x) => x && (x.title || x.titleNe))
    .map((x) => ({
      id: String(x.id),
      titleNe: x.titleNe || null,
      titleEn: x.title || null,
      lat: x.point && x.point.coordinates ? toNumber(x.point.coordinates[1]) : toNumber(x.latitude),
      lon: x.point && x.point.coordinates ? toNumber(x.point.coordinates[0]) : toNumber(x.longitude),
      occurredAt: x.incidentOn || x.createdOn || null,
      bipadUrl: `https://bipadportal.gov.np/incidents/${x.id}`,
      dataSource: x.dataSource || 'BIPAD',
      streetAddress: x.streetAddress || null,
    }))
    .filter((x) => x.lat && x.lon && x.lat >= 25.0 && x.lat <= 32.0 && x.lon >= 79.0 && x.lon <= 89.5);

  if (!all.length) throw new Error('No valid incidents parsed from BIPAD');
  const flood = all.filter((x) => FLOOD_KW.test(x.titleEn || '') || FLOOD_KW.test(x.titleNe || ''));
  return (flood.length ? flood : all)
    .sort((a, b) => new Date(b.occurredAt || 0) - new Date(a.occurredAt || 0))
    .slice(0, 40);
}

app.get('/api/incidents', async (req, res) => {
  const now = Date.now();
  if (incidentsCache.data && now - incidentsCache.at < CACHE_TTL_MS) {
    return res.json({ updated: incidentsCache.at, cached: true, source: BIPAD_URL, incidents: incidentsCache.data });
  }
  try {
    const incidents = await fetchIncidents();
    incidentsCache = { at: now, data: incidents };
    res.json({ updated: now, cached: false, source: BIPAD_URL, incidents });
  } catch (err) {
    if (incidentsCache.data) {
      return res.json({ updated: incidentsCache.at, cached: true, stale: true, error: err.message, source: BIPAD_URL, incidents: incidentsCache.data });
    }
    res.status(502).json({ error: err.message, incidents: [] });
  }
});

// ---- Real-time Incident News Aggregator ----------------------------------
const newsCache = new Map();
const NEWS_CACHE_TTL = 10 * 60 * 1000;

const NEPALI_MEDIA_SITES = [
  'onlinekhabar.com',
  'setopati.com',
  'ratopati.com',
  'ekantipur.com',
  'kathmandupost.com',
  'myrepublica.nagariknetwork.com',
  'thehimalayantimes.com',
  'deshsanchar.com',
  'nepalnews.com',
];

function parseRssXml(xml) {
  const items = [];
  const itemRegex = /<item>[\s\S]*?<title>(.*?)<\/title>[\s\S]*?<link>(.*?)<\/link>[\s\S]*?<pubDate>(.*?)<\/pubDate>(?:[\s\S]*?<source[^>]*>(.*?)<\/source>)?[\s\S]*?<\/item>/g;
  let m;
  while ((m = itemRegex.exec(xml)) !== null && items.length < 25) {
    const rawTitle = m[1] || '';
    const cleanTitle = rawTitle
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1');
    const link = m[2] || '';
    const pubDate = m[3] || '';
    const source = (m[4] || '')
      .replace(/&amp;/g, '&')
      .replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1') || 'News';

    items.push({
      title: cleanTitle,
      link,
      pubDate,
      source,
    });
  }
  return items;
}

function extractLocationTokens(strEn, strNe) {
  const enWords = (strEn || '')
    .replace(/Rural Municipality[-\s]*\d*/gi, ' ')
    .replace(/Municipality[-\s]*\d*/gi, ' ')
    .replace(/Metropolitan[-\s]*\d*/gi, ' ')
    .replace(/Sub-Metropolitan[-\s]*\d*/gi, ' ')
    .replace(/Ward[-\s]*\d*/gi, ' ')
    .replace(/Landslide|Flood|Inundation|at|in|near/gi, ' ')
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .split(/\s+/)
    .map(w => w.trim())
    .filter(w => w.length > 2 && !/^(the|and|for|from|with|into)$/i.test(w));

  const neParts = (strNe || '')
    .replace(/गाउँपालिका[-\s]*\d*/g, ' ')
    .replace(/नगरपालिका[-\s]*\d*/g, ' ')
    .replace(/महानगरपालिका[-\s]*\d*/g, ' ')
    .replace(/वडा[-\s]*\d*/g, ' ')
    .replace(/मा\s*पहिरो|मा\s*बाढी|पहिरो|बाढी|डुबान/g, ' ')
    .split(/[,،\-0-9\s]+/)
    .map(w => w.trim())
    .filter(w => w.length > 2 && !/^(र|तथा|बाट|सम्म|मा)$/.test(w));

  return [...new Set([...enWords, ...neParts])];
}

// ---- Rate Limiter & Concurrency Safeguard -------------------------------
const ipRateMap = new Map();
const IP_RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_SEARCHES_PER_IP = 20;

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = ipRateMap.get(ip) || { count: 0, resetAt: now + IP_RATE_LIMIT_WINDOW };
  if (now > entry.resetAt) {
    entry.count = 1;
    entry.resetAt = now + IP_RATE_LIMIT_WINDOW;
    ipRateMap.set(ip, entry);
    return true;
  }
  if (entry.count >= MAX_SEARCHES_PER_IP) {
    return false;
  }
  entry.count++;
  ipRateMap.set(ip, entry);
  return true;
}

// Clean up rate limit map every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of ipRateMap.entries()) {
    if (now > entry.resetAt) ipRateMap.delete(ip);
  }
}, 5 * 60 * 1000);

const inFlightSearches = new Map();

app.get('/api/incident-news', async (req, res) => {
  const query = (req.query.q || '').trim();
  const qEn = (req.query.qEn || '').trim();
  const qNe = (req.query.qNe || '').trim();
  const sourceFilter = req.query.source || 'all';

  const effectiveEn = qEn || query;
  const effectiveNe = qNe || query;

  if (!effectiveEn && !effectiveNe) {
    return res.status(400).json({ error: 'Query parameter "q" is required', articles: [] });
  }

  const clientIp = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

  const cacheKey = `${effectiveEn}__${effectiveNe}__${sourceFilter}`;
  const cached = newsCache.get(cacheKey);
  const now = Date.now();
  if (cached && now - cached.at < NEWS_CACHE_TTL) {
    return res.json({ updated: cached.at, cached: true, query: effectiveEn || effectiveNe, articles: cached.data });
  }

  // Enforce IP Rate Limiting
  if (!checkRateLimit(clientIp)) {
    if (cached) {
      return res.json({ updated: cached.at, cached: true, rateLimited: true, query: effectiveEn || effectiveNe, articles: cached.data });
    }
    return res.status(429).json({ error: 'Too many search requests. Please wait a moment.', articles: [] });
  }

  // Request Coalescing: if identical search is already in flight, await existing Promise
  if (inFlightSearches.has(cacheKey)) {
    try {
      const result = await inFlightSearches.get(cacheKey);
      return res.json(result);
    } catch (_) {}
  }

  const searchTask = (async () => {
    const fetchPromises = [];
    const nepaliSiteFilter = ` (${NEPALI_MEDIA_SITES.map((s) => `site:${s}`).join(' OR ')})`;

    // Smart geographic expansion
    const tokens = extractLocationTokens(effectiveEn, effectiveNe);
    const locationQuery = tokens.length ? `(${tokens.slice(0, 6).join(' OR ')})` : effectiveEn || effectiveNe;
    const hazardTerms = '(landslide OR flood OR बाढी OR पहिरो)';

    // 1. ALWAYS Search Major Nepali Media
    const nepaliMediaQ = `${locationQuery} ${hazardTerms} when:48h${nepaliSiteFilter}`;
    const nepaliMediaUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(nepaliMediaQ)}&hl=ne&gl=NP&ceid=NP:ne`;
    fetchPromises.push(
      fetch(nepaliMediaUrl, {
        signal: AbortSignal.timeout(8000),
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NepalFloodWatch/1.0)', Accept: 'application/rss+xml, application/xml, text/xml' },
      }).then((r) => (r.ok ? r.text() : '')).then(parseRssXml).catch(() => [])
    );

    // If sourceFilter === 'all', also pull broad Google News editions
    if (sourceFilter !== 'nepali') {
      const qEnExpanded = `${locationQuery} (landslide OR flood) when:48h`;
      const urlEn = `https://news.google.com/rss/search?q=${encodeURIComponent(qEnExpanded)}&hl=en-NP&gl=NP&ceid=NP:en`;
      fetchPromises.push(
        fetch(urlEn, {
          signal: AbortSignal.timeout(8000),
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NepalFloodWatch/1.0)', Accept: 'application/rss+xml, application/xml, text/xml' },
        }).then((r) => (r.ok ? r.text() : '')).then(parseRssXml).catch(() => [])
      );

      const qNeExpanded = `${locationQuery} (पहिरो OR बाढी) when:48h`;
      const urlNe = `https://news.google.com/rss/search?q=${encodeURIComponent(qNeExpanded)}&hl=ne&gl=NP&ceid=NP:ne`;
      fetchPromises.push(
        fetch(urlNe, {
          signal: AbortSignal.timeout(8000),
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NepalFloodWatch/1.0)', Accept: 'application/rss+xml, application/xml, text/xml' },
        }).then((r) => (r.ok ? r.text() : '')).then(parseRssXml).catch(() => [])
      );
    }

    const results = await Promise.all(fetchPromises);
    const combined = results.flat();

    const seenLinks = new Set();
    const seenTitles = new Set();
    const uniqueArticles = [];
    const fortyEightHoursAgo = Date.now() - 48 * 60 * 60 * 1000;

    for (const art of combined) {
      const normTitle = (art.title || '').toLowerCase().replace(/[^a-z0-9\u0900-\u097F]/g, '');
      const linkKey = (art.link || '').split('?')[0];
      if (seenLinks.has(linkKey) || (normTitle.length > 8 && seenTitles.has(normTitle))) continue;
      seenLinks.add(linkKey);
      if (normTitle.length > 8) seenTitles.add(normTitle);
      uniqueArticles.push(art);
    }

    const recentOnly = uniqueArticles.filter((art) => {
      const t = new Date(art.pubDate).getTime();
      return !isNaN(t) && t >= fortyEightHoursAgo;
    });

    const finalArticles = (recentOnly.length > 0 ? recentOnly : uniqueArticles).slice(0, 20);

    finalArticles.sort((a, b) => new Date(b.pubDate || 0) - new Date(a.pubDate || 0));

    if (finalArticles.length > 0) {
      newsCache.set(cacheKey, { at: Date.now(), data: finalArticles });
    }

    return { updated: Date.now(), cached: false, query: effectiveEn || effectiveNe, articles: finalArticles };
  })();

  inFlightSearches.set(cacheKey, searchTask);

  try {
    const payload = await searchTask;
    res.json(payload);
  } catch (err) {
    if (cached) {
      return res.json({ updated: cached.at, cached: true, stale: true, query: effectiveEn || effectiveNe, articles: cached.data });
    }
    res.status(502).json({ error: err.message, query: effectiveEn || effectiveNe, articles: [] });
  } finally {
    inFlightSearches.delete(cacheKey);
  }
});

// ---- Comprehensive Atomic Highway Network & Top 3 Pre-computed Corridors ----
const HIGHWAYS = [
  {
    id: 'prithvi-ktm-mugling',
    code: 'H04',
    nameEn: 'Prithvi Highway (Kathmandu–Mugling)',
    nameNe: 'पृथ्वी राजमार्ग (काठमाडौँ–मुग्लिन)',
    from: 'Kathmandu',
    to: 'Mugling',
    distanceKm: 110,
    status: 'open',
    noteEn: 'Open. High traffic on Thankot–Naubise and Galchhi–Malekhu stretches.',
    noteNe: 'खुला। थानकोट–नौबिसे र गल्छी–मलेखु खण्डमा बाक्लो सवारी चाप।',
    lat: 27.81, lon: 84.90,
    coords: [[27.7172, 85.3240], [27.7000, 85.2500], [27.7200, 85.1600], [27.8100, 85.0200], [27.8100, 84.8300], [27.8600, 84.5550]]
  },
  {
    id: 'prithvi-mugling-pkr',
    code: 'H04',
    nameEn: 'Prithvi Highway (Mugling–Pokhara)',
    nameNe: 'पृथ्वी राजमार्ग (मुग्लिन–पोखरा)',
    from: 'Mugling',
    to: 'Pokhara',
    distanceKm: 90,
    status: 'open',
    noteEn: 'Open. Mugling–Pokhara highway 4-lane expansion active; drive with caution.',
    noteNe: 'खुला। मुग्लिन–पोखरा सडक विस्तार कार्य जारी; सावधानीपूर्वक चलाउनुहोस्।',
    lat: 28.02, lon: 84.25,
    coords: [[27.8600, 84.5550], [27.8700, 84.4500], [27.9700, 84.2800], [28.0800, 84.1500], [28.2096, 83.9856]]
  },
  {
    id: 'narayanghat-mugling',
    code: 'H04-link',
    nameEn: 'Narayanghat–Mugling Corridor',
    nameNe: 'नारायणघाट–मुग्लिङ करिडोर',
    from: 'Mugling',
    to: 'Chitwan',
    distanceKm: 36,
    status: 'open',
    noteEn: 'Open for two-way traffic. Monsoon watch at Tuin Khola & Seti Dobhan.',
    noteNe: 'दुईतर्फी यातायात खुला। तुइन खोला र सेती दोभानमा वर्षातमा सतर्कता।',
    lat: 27.78, lon: 84.46,
    coords: [[27.8600, 84.5550], [27.8000, 84.4800], [27.7500, 84.4500], [27.6850, 84.4300]]
  },
  {
    id: 'bp-highway',
    code: 'H06',
    nameEn: 'BP Highway (Dhulikhel–Sindhuli–Bardibas)',
    nameNe: 'बीपी राजमार्ग (धुलिखेल–सिन्धुली–बर्दिबास)',
    from: 'Kathmandu',
    to: 'Bardibas',
    distanceKm: 160,
    status: 'night-banned',
    noteEn: 'Night travel (8 PM–5 AM) restricted due to Roshi Khola landslide risk.',
    noteNe: 'रोशी खोला पहिरो जोखिमका कारण रात्रिकालीन यात्रा (राति ८–बिहान ५) प्रतिबन्धित।',
    lat: 27.35, lon: 85.75,
    coords: [[27.7172, 85.3240], [27.6700, 85.4200], [27.6221, 85.5539], [27.5000, 85.7500], [27.3400, 85.9900], [27.2500, 85.9200], [26.9333, 85.9000]]
  },
  {
    id: 'kanti-lokpath',
    code: 'NH18',
    nameEn: 'Kanti Lokpath (Kathmandu–Hetauda Shortcut)',
    nameNe: 'कान्ति लोकपथ (काठमाडौँ–हेटौंडा द्रुतमार्ग)',
    from: 'Kathmandu',
    to: 'Hetauda',
    distanceKm: 85,
    status: 'open',
    noteEn: 'Open for light vehicles & passenger buses. Rapid bypass to Hetauda.',
    noteNe: 'साना सवारी र बसका लागि खुला। हेटौंडा पुग्ने छोटो बाटो।',
    lat: 27.50, lon: 85.20,
    coords: [[27.7172, 85.3240], [27.6200, 85.3100], [27.5200, 85.2500], [27.4286, 85.0333]]
  },
  {
    id: 'tribhuvan-highway',
    code: 'H02',
    nameEn: 'Tribhuvan Highway (Hetauda–Birgunj)',
    nameNe: 'त्रिभुवन राजमार्ग (हेटौंडा–वीरगञ्ज)',
    from: 'Hetauda',
    to: 'Birgunj',
    distanceKm: 55,
    status: 'open',
    noteEn: 'Open four-lane commercial corridor through Pathlaiya and Simara to Birgunj / Raxaul.',
    noteNe: 'पथलैया र सिमरा हुँदै वीरगञ्ज / रक्सौल नाकासम्म ४ लेन खुला।',
    lat: 27.20, lon: 84.95,
    coords: [[27.4286, 85.0333], [27.3000, 84.9800], [27.1500, 84.9300], [27.0136, 84.8774]]
  },
  {
    id: 'east-west-hetauda-chitwan',
    code: 'H01-C1',
    nameEn: 'East-West Highway (Hetauda–Chitwan)',
    nameNe: 'पूर्व-पश्चिम राजमार्ग (हेटौंडा–चितवन)',
    from: 'Hetauda',
    to: 'Chitwan',
    distanceKm: 75,
    status: 'open',
    noteEn: 'Open. Smooth 2-lane drive through Makwanpur, Manahari, and Tandi to Bharatpur.',
    noteNe: 'खुला। मनहरी र टाँडी हुँदै भरतपुरसम्म सहज सडक।',
    lat: 27.58, lon: 84.70,
    coords: [[27.4286, 85.0333], [27.5500, 84.8000], [27.6000, 84.6000], [27.6850, 84.4300]]
  },
  {
    id: 'east-west-chitwan-butwal',
    code: 'H01-C2',
    nameEn: 'East-West Highway (Chitwan–Narayanghat–Butwal)',
    nameNe: 'पूर्व-पश्चिम राजमार्ग (चितवन–नारायणघाट–बुटवल)',
    from: 'Chitwan',
    to: 'Butwal',
    distanceKm: 115,
    status: 'open',
    noteEn: 'Open. Watch for active road upgrading across Daunne hill section and Kawasoti.',
    noteNe: 'खुला। दाउन्ने पहाडी खण्ड र कावासोती क्षेत्रमा सडक विस्तार ध्यान दिनुहोस्।',
    lat: 27.65, lon: 83.95,
    coords: [[27.6850, 84.4300], [27.6500, 84.1500], [27.5800, 83.9000], [27.6200, 83.7000], [27.7006, 83.4484]]
  },
  {
    id: 'siddhartha-pkr-butwal',
    code: 'H10',
    nameEn: 'Siddhartha Highway (Pokhara–Palpa–Butwal)',
    nameNe: 'सिद्धार्थ राजमार्ग (पोखरा–पाल्पा–बुटवल)',
    from: 'Pokhara',
    to: 'Butwal',
    distanceKm: 160,
    status: 'open',
    noteEn: 'Open. Scenic highway via Syangja, Waling, and Palpa. Sidhababa tunnel section operational.',
    noteNe: 'खुला। स्याङ्जा, वालिङ र पाल्पा हुँदै बुटवल। सिद्धबाबा सुरुङ क्षेत्र सञ्चालनमा।',
    lat: 27.95, lon: 83.60,
    coords: [[28.2096, 83.9856], [28.1000, 83.8500], [27.9800, 83.7700], [27.8600, 83.5500], [27.7006, 83.4484]]
  },
  {
    id: 'siddhartha-butwal-bhairahawa',
    code: 'H10-S',
    nameEn: 'Siddhartha Highway (Butwal–Bhairahawa)',
    nameNe: 'सिद्धार्थ राजमार्ग (बुटवल–भैरहवा)',
    from: 'Butwal',
    to: 'Bhairahawa',
    distanceKm: 22,
    status: 'open',
    noteEn: 'Open 6-lane express link connecting Butwal to Gautam Buddha Int\'l Airport & Sunauli border.',
    noteNe: 'बुटवलदेखि गौतम बुद्ध अन्तर्राष्ट्रिय विमानस्थल तथा बेलहिया नाकासम्म ६ लेन खुला।',
    lat: 27.60, lon: 83.45,
    coords: [[27.7006, 83.4484], [27.6000, 83.4500], [27.5042, 83.4504]]
  },
  {
    id: 'east-west-butwal-kohalpur',
    code: 'H01-W1',
    nameEn: 'East-West Highway (Butwal–Lamahi–Kohalpur)',
    nameNe: 'पूर्व-पश्चिम राजमार्ग (बुटवल–लमही–कोहलपुर)',
    from: 'Butwal',
    to: 'Kohalpur',
    distanceKm: 195,
    status: 'open',
    noteEn: 'Open through Chandrauta (Kapilvastu), Lamahi (Dang), and Kusum to Kohalpur junction.',
    noteNe: 'खुला। चन्द्रौटा, लमही, भालुवाङ हुँदै कोहलपुर चोकसम्म सहज यात्रा।',
    lat: 27.85, lon: 82.50,
    coords: [[27.7006, 83.4484], [27.6150, 82.8000], [27.8750, 82.2980], [28.0000, 81.9500], [28.1920, 81.6910]]
  },
  {
    id: 'ratna-nepalgunj-kohalpur',
    code: 'H12-S',
    nameEn: 'Ratna Highway (Nepalgunj–Kohalpur)',
    nameNe: 'रत्न राजमार्ग (नेपालगञ्ज–कोहलपुर)',
    from: 'Nepalgunj',
    to: 'Kohalpur',
    distanceKm: 16,
    status: 'open',
    noteEn: 'Open 4-lane link connecting Nepalgunj city & airport to Kohalpur crossroad.',
    noteNe: 'नेपालगञ्ज सहर र विमानस्थलबाट कोहलपुर जोड्ने ४ लेन खुला सडक।',
    lat: 28.12, lon: 81.65,
    coords: [[28.0500, 81.6167], [28.1200, 81.6500], [28.1920, 81.6910]]
  },
  {
    id: 'ratna-kohalpur-surkhet',
    code: 'H12-N',
    nameEn: 'Ratna Highway (Kohalpur–Surkhet)',
    nameNe: 'रत्न राजमार्ग (कोहलपुर–सुर्खेत)',
    from: 'Kohalpur',
    to: 'Surkhet',
    distanceKm: 85,
    status: 'open',
    noteEn: 'Open through Babai valley and Chhinchu to Birendranagar Surkhet.',
    noteNe: 'खुला। बबई उपत्यका र छिन्चु हुँदै वीरेन्द्रनगर सुर्खेतसम्म सफा सडक।',
    lat: 28.40, lon: 81.65,
    coords: [[28.1920, 81.6910], [28.3500, 81.6700], [28.5000, 81.6500], [28.5983, 81.6338]]
  },
  {
    id: 'karnali-surkhet-jumla',
    code: 'H13',
    nameEn: 'Karnali Highway (Surkhet–Kalikot–Jumla)',
    nameNe: 'कर्णाली राजमार्ग (सुर्खेत–कालिकोट–जुम्ला)',
    from: 'Surkhet',
    to: 'Jumla',
    distanceKm: 230,
    status: 'night-banned',
    noteEn: 'Single lane at Kalikot-Jumla mountain stretch; night travel strictly banned.',
    noteNe: 'कालिकोट–जुम्ला खण्डमा एकल लेन; रात्रिकालीन यात्रा पूर्ण निषेध।',
    lat: 29.15, lon: 81.80,
    coords: [[28.5983, 81.6338], [28.8500, 81.7500], [29.1500, 81.8000], [29.2747, 82.1838]]
  },
  {
    id: 'east-west-kohalpur-dhangadhi',
    code: 'H01-W2',
    nameEn: 'East-West Highway (Kohalpur–Chisapani–Dhangadhi)',
    nameNe: 'पूर्व-पश्चिम राजमार्ग (कोहलपुर–चिसापानी–धनगढी)',
    from: 'Kohalpur',
    to: 'Dhangadhi',
    distanceKm: 145,
    status: 'open',
    noteEn: 'Open across Bardiya National Park, iconic Karnali Bridge (Chisapani), and Attariya to Dhangadhi.',
    noteNe: 'बर्दिया राष्ट्रिय निकुञ्ज, कर्णाली पुल (चिसापानी) र अत्तरिया हुँदै धनगढी खुला।',
    lat: 28.55, lon: 80.95,
    coords: [[28.1920, 81.6910], [28.4500, 81.4500], [28.6436, 81.2828], [28.8140, 80.5600], [28.6852, 80.5977]]
  },
  {
    id: 'east-west-dhangadhi-mahendranagar',
    code: 'H01-W3',
    nameEn: 'East-West Highway (Dhangadhi/Attariya–Mahendranagar)',
    nameNe: 'पूर्व-पश्चिम राजमार्ग (धनगढी/अत्तरिया–महेन्द्रनगर)',
    from: 'Dhangadhi',
    to: 'Mahendranagar',
    distanceKm: 50,
    status: 'open',
    noteEn: 'Open to Gaddachauki western Nepal border post.',
    noteNe: 'गड्डाचौकी सुदूरपश्चिम सीमा नाकासम्म सडक खुला।',
    lat: 28.90, lon: 80.35,
    coords: [[28.6852, 80.5977], [28.8140, 80.5600], [28.9642, 80.1776]]
  },
  {
    id: 'mahakali-dhangadhi-dadeldhura',
    code: 'H14',
    nameEn: 'Mahakali Highway (Dhangadhi/Attariya–Dadeldhura)',
    nameNe: 'महाकाली राजमार्ग (धनगढी/अत्तरिया–डडेल्धुरा)',
    from: 'Dhangadhi',
    to: 'Dadeldhura',
    distanceKm: 135,
    status: 'open',
    noteEn: 'Open climbing Far-West hills through Godawari and Galyang to Dadeldhura.',
    noteNe: 'गोदावरी र गल्याङ हुँदै डडेल्धुरा उकालो सडक खुला।',
    lat: 29.10, lon: 80.58,
    coords: [[28.6852, 80.5977], [28.8140, 80.5600], [29.0500, 80.5700], [29.3000, 80.5833]]
  },
  {
    id: 'east-west-bardibas-itahari',
    code: 'H01-E1',
    nameEn: 'East-West Highway (Bardibas–Lahan–Itahari)',
    nameNe: 'पूर्व-पश्चिम राजमार्ग (बर्दिबास–लहान–इटहरी)',
    from: 'Bardibas',
    to: 'Itahari',
    distanceKm: 155,
    status: 'open',
    noteEn: 'Open across eastern Terai through Lahan, Mirchaiya, Koshi Barrage, and Inaruwa to Itahari.',
    noteNe: 'लहान, मिर्चैया, कोशी ब्यारेज र इनरुवा हुँदै इटहरीसम्म सहज यातायात।',
    lat: 26.68, lon: 86.60,
    coords: [[26.9333, 85.9000], [26.7296, 86.4835], [26.6800, 86.6800], [26.6000, 86.9500], [26.6639, 87.2764]]
  },
  {
    id: 'east-west-itahari-kakarbhitta',
    code: 'H01-E2',
    nameEn: 'East-West Highway (Itahari–Damak–Kakarbhitta)',
    nameNe: 'पूर्व-पश्चिम राजमार्ग (इटहरी–दमक–काँकडभिट्टा)',
    from: 'Itahari',
    to: 'Kakarbhitta',
    distanceKm: 95,
    status: 'open',
    noteEn: 'Open 4-lane sections through Damak, Birtamod, and Charali to eastern border Kakarbhitta.',
    noteNe: 'दमक, बिर्तामोड र चारआली हुँदै पूर्वी नाका काँकडभिट्टासम्म खुला।',
    lat: 26.65, lon: 87.75,
    coords: [[26.6639, 87.2764], [26.6667, 87.7000], [26.6400, 87.9800], [26.6500, 88.0500], [26.6500, 88.1600]]
  },
  {
    id: 'koshi-itahari-biratnagar',
    code: 'H08-S',
    nameEn: 'Koshi Highway (Itahari–Biratnagar)',
    nameNe: 'कोशी राजमार्ग (इटहरी–विराटनगर)',
    from: 'Itahari',
    to: 'Biratnagar',
    distanceKm: 25,
    status: 'open',
    noteEn: 'Open 6-lane trade corridor connecting Itahari junction to Biratnagar and Rani border.',
    noteNe: 'इटहरीदेखि विराटनगर र रानी नाकासम्म ६ लेन व्यापारिक मार्ग खुला।',
    lat: 26.55, lon: 87.27,
    coords: [[26.6639, 87.2764], [26.5500, 87.2740], [26.4525, 87.2718]]
  },
  {
    id: 'koshi-itahari-dharan',
    code: 'H08-N',
    nameEn: 'Koshi Highway (Itahari–Dharan)',
    nameNe: 'कोशी राजमार्ग (इटहरी–धरान)',
    from: 'Itahari',
    to: 'Dharan',
    distanceKm: 18,
    status: 'open',
    noteEn: 'Open 4-lane expressway through Tarahara forest corridor to Dharan.',
    noteNe: 'तरहरा जंगल करिडोर हुँदै धरानसम्म ४ लेन सडक खुला।',
    lat: 26.74, lon: 87.28,
    coords: [[26.6639, 87.2764], [26.7400, 87.2800], [26.8124, 87.2835]]
  },
  {
    id: 'mechi-kakarbhitta-ilam',
    code: 'H07',
    nameEn: 'Mechi Highway (Kakarbhitta/Charali–Ilam)',
    nameNe: 'मेची राजमार्ग (काँकडभिट्टा/चारआली–इलाम)',
    from: 'Kakarbhitta',
    to: 'Ilam',
    distanceKm: 80,
    status: 'open',
    noteEn: 'Open. Scenic climb through tea estates of Kanyam, Fikkal to Ilam Bazar.',
    noteNe: 'खुला। कन्याम, फिक्कल चिया बगान हुँदै इलाम बजारसम्म रमणीय सडक।',
    lat: 26.80, lon: 88.00,
    coords: [[26.6500, 88.1600], [26.6500, 88.0500], [26.8000, 88.0000], [26.9100, 87.9270]]
  },
  {
    id: 'araniko-highway',
    code: 'H03',
    nameEn: 'Araniko Highway (Kathmandu–Dhulikhel–Kodari)',
    nameNe: 'अरनिको राजमार्ग (काठमाडौँ–धुलिखेल–कोदारी)',
    from: 'Kathmandu',
    to: 'Kodari',
    distanceKm: 115,
    status: 'blocked',
    noteEn: 'Blocked near Barhabise / Liping by mudslide. Clearance underway.',
    noteNe: 'बाह्रबिसे / लिपिङ नजिक पहिरोले अवरुद्ध। पन्छाउने काम जारी।',
    lat: 27.75, lon: 85.55,
    coords: [[27.7172, 85.3240], [27.6221, 85.5539], [27.6100, 85.6000], [27.7800, 85.8900], [27.9500, 85.9400]]
  },
  {
    id: 'pasang-lhamu',
    code: 'H21',
    nameEn: 'Pasang Lhamu Highway (Kathmandu–Trishuli–Rasuwa)',
    nameNe: 'पासाङ ल्हामु राजमार्ग (काठमाडौँ–त्रिशुली–रसुवा)',
    from: 'Kathmandu',
    to: 'Rasuwa',
    distanceKm: 120,
    status: 'night-banned',
    noteEn: 'Night travel restricted. Trishuli–Dhunche–Syabrubesi prone to rockfalls.',
    noteNe: 'रात्रिकालीन यात्रा प्रतिबन्धित। त्रिशुली–धुन्चे–स्याब्रुबेसी खण्डमा ढुङ्गा खस्ने जोखिम।',
    lat: 28.05, lon: 85.25,
    coords: [[27.7172, 85.3240], [27.8100, 85.2000], [27.9150, 85.1500], [28.1100, 85.3000]]
  },
  {
    id: 'mid-hill-pkr-baglung',
    code: 'H16',
    nameEn: 'Pushpalal Mid-Hill Highway (Pokhara–Kushma–Baglung)',
    nameNe: 'पुष्पलाल मध्यपहाडी राजमार्ग (पोखरा–कुश्मा–बागलुङ)',
    from: 'Pokhara',
    to: 'Baglung',
    distanceKm: 75,
    status: 'open',
    noteEn: 'Open via Nayapul and Kushma suspension bridge corridor to Baglung & Beni.',
    noteNe: 'नयाँपुल र कुश्मा हुँदै बागलुङ तथा बेनीसम्म सडक खुला।',
    lat: 28.25, lon: 83.70,
    coords: [[28.2096, 83.9856], [28.2900, 83.7500], [28.2200, 83.6700], [28.2700, 83.6000]]
  },
  {
    id: 'kaligandaki-baglung-jomsom',
    code: 'NH17',
    nameEn: 'Kaligandaki Corridor (Baglung/Beni–Jomsom)',
    nameNe: 'कालीगण्डकी करिडोर (बागलुङ/बेनी–जोमसोम)',
    from: 'Baglung',
    to: 'Jomsom',
    distanceKm: 90,
    status: 'night-banned',
    noteEn: 'Open with daytime caution at Rupse Chhahara & Ghasa rockslide zones. 4WD recommended.',
    noteNe: 'खुला। रुप्से छहरा र घाँसा क्षेत्रमा दिउँसो मात्र यात्रा गर्न सुझाव। ४-ह्विल गाडी उपयुक्त।',
    lat: 28.60, lon: 83.65,
    coords: [[28.2700, 83.6000], [28.3440, 83.5650], [28.5500, 83.6300], [28.7830, 83.7330]]
  },
  {
    id: 'rapti-butwal-salyan',
    code: 'H11',
    nameEn: 'Rapti Highway (Ameliya–Tulsipur–Salyan)',
    nameNe: 'राप्ती राजमार्ग (अमेलिया–तुलसीपुर–सल्यान)',
    from: 'Butwal',
    to: 'Salyan',
    distanceKm: 160,
    status: 'open',
    noteEn: 'Open from East-West highway junction Ameliya through Tulsipur into Salyan.',
    noteNe: 'अमेलियाबाट तुलसीपुर हुँदै सल्यान जाने मार्ग खुला।',
    lat: 28.20, lon: 82.25,
    coords: [[27.7006, 83.4484], [27.8750, 82.2980], [28.1300, 82.3000], [28.3700, 82.1600]]
  },
  {
    id: 'east-west-bardibas-janakpur',
    code: 'H01-J',
    nameEn: 'Janakpur Link (Bardibas–Dhalkebar–Janakpur)',
    nameNe: 'जनकपुर सम्पर्क मार्ग (बर्दिबास–ढल्केबर–जनकपुर)',
    from: 'Bardibas',
    to: 'Janakpur',
    distanceKm: 35,
    status: 'open',
    noteEn: 'Open 4-lane direct access from Dhalkebar East-West highway into Janakpurdham.',
    noteNe: 'ढल्केबर पूर्व-पश्चिम राजमार्गबाट जनकपुरधाम जाने ४ लेन सडक खुला।',
    lat: 26.82, lon: 85.92,
    coords: [[26.9333, 85.9000], [26.8500, 85.9300], [26.7288, 85.9244]]
  },
];

// Top 3 Pre-computed Corridors (Fast-path O(1) calculation & loading)
const PRECOMPUTED_TOP_ROUTES = [
  {
    id: 'ktm-pkr',
    from: 'Kathmandu',
    to: 'Pokhara',
    segments: ['prithvi-ktm-mugling', 'prithvi-mugling-pkr'],
    distanceKm: 200,
    isPrecomputed: true,
    noteEn: 'Direct via Prithvi Highway (200 km). Caution at Mugling–Pokhara road expansion stretches.',
    noteNe: 'पृथ्वी राजमार्ग भएर सिधा (२०० किमी)। मुग्लिन–पोखरा खण्डमा विस्तार कार्य जारी।'
  },
  {
    id: 'ktm-chitwan',
    from: 'Kathmandu',
    to: 'Chitwan',
    segments: ['prithvi-ktm-mugling', 'narayanghat-mugling'],
    distanceKm: 146,
    isPrecomputed: true,
    noteEn: 'Prithvi Highway to Mugling, then Narayanghat–Mugling corridor into Bharatpur/Chitwan (146 km).',
    noteNe: 'पृथ्वी राजमार्ग मुग्लिनसम्म, त्यसपछि नारायणघाट–मुग्लिङ करिडोर चितवनसम्म (१४६ किमी)।'
  },
  {
    id: 'ktm-bardibas',
    from: 'Kathmandu',
    to: 'Bardibas',
    segments: ['bp-highway'],
    distanceKm: 160,
    isPrecomputed: true,
    noteEn: 'BP Highway via Dhulikhel, Khurkot, Sindhuli Gadhi to Bardibas (160 km). Check night restrictions.',
    noteNe: 'बीपी राजमार्ग धुलिखेल, सिन्धुलीगढी हुँदै बर्दिबास (१६० किमी)। रात्रिकालीन प्रतिबन्ध ध्यान दिनुहोस्।'
  }
];

app.get('/api/highways', (req, res) => {
  res.json({ updated: Date.now(), highways: HIGHWAYS, precomputedRoutes: PRECOMPUTED_TOP_ROUTES });
});

// ---- Emergency helplines -------------------------------------------------
const HELPLINES = [
  { nameEn: 'Nepal Police', nameNe: 'नेपाल प्रहरी', phone: '100', category: 'police' },
  { nameEn: 'Traffic Police', nameNe: 'ट्राफिक प्रहरी', phone: '103', category: 'traffic' },
  { nameEn: 'APF Disaster Rescue', nameNe: 'सशस्त्र प्रहरी दैवी प्रकोप उद्धार', phone: '1114', category: 'rescue' },
  { nameEn: 'DHM Flood Early Warning', nameNe: 'जलवायु महाशाखा बाढी चेतावनी', phone: '1155', category: 'flood' },
  { nameEn: 'Ambulance', nameNe: 'एम्बुलेन्स', phone: '102', category: 'medical' },
  { nameEn: 'Fire Brigade', nameNe: 'दमकल', phone: '101', category: 'fire' },
  { nameEn: 'Women Helpline', nameNe: 'महिला हेल्पलाइन', phone: '1145', category: 'support' },
  { nameEn: 'Child Helpline', nameNe: 'बाल हेल्पलाइन', phone: '1098', category: 'support' },
  { nameEn: 'Tourist Police', nameNe: 'पर्यटक प्रहरी', phone: '1144', category: 'police' },
  { nameEn: 'Nepal Red Cross', nameNe: 'नेपाल रेडक्रस', phone: '4228094', category: 'rescue' },
];

app.get('/api/helplines', (req, res) => {
  res.json({ helplines: HELPLINES });
});

app.get('/api/situation', async (req, res) => {
  let reports = [];
  try {
    const url = 'https://api.reliefweb.int/v1/reports?appname=nepal-flood-watch'
      + '&query[value]=country:"Nepal" AND (disaster_type:"Flood" OR title:"flood")'
      + '&sort[]=date.created:desc&fields[include][]=title&fields[include][]=date.created'
      + '&fields[include][]=url_alias&limit=8&format=json';
    const r = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (r.ok) {
      const j = await r.json();
      reports = (j.data || []).map((x) => ({
        title: x.title,
        date: x.date && x.date.created,
        url: 'https://reliefweb.int/' + (x.url_alias || ''),
      }));
    }
  } catch (_) { /* fall through */ }
  res.json({ source: reports.length ? 'ReliefWeb' : 'fallback', reports, helplines: HELPLINES });
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log(`nepal-flood-watch on http://localhost:${PORT}`));
