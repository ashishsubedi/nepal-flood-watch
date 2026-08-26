const assert = require('assert');
const crypto = require('crypto');

console.log('🧪 Starting Highway Adversarial & Robustness Test Suite...\n');

// ---------------------------------------------------------------------------
// 1. Great-Circle Cross-Track & Haversine Distance Geometry Tests
// ---------------------------------------------------------------------------
function haversineDistKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function distToSegmentKm(pLat, pLon, aLat, aLon, bLat, bLon) {
  const R = 6371;
  const dAB_km = haversineDistKm(aLat, aLon, bLat, bLon);
  if (dAB_km === 0) return haversineDistKm(pLat, pLon, aLat, aLon);

  const delta12 = dAB_km / R;
  const delta13 = haversineDistKm(aLat, aLon, pLat, pLon) / R;

  const phi1 = aLat * Math.PI / 180;
  const lam1 = aLon * Math.PI / 180;
  const phi2 = bLat * Math.PI / 180;
  const lam2 = bLon * Math.PI / 180;
  const phi3 = pLat * Math.PI / 180;
  const lam3 = pLon * Math.PI / 180;

  const y12 = Math.sin(lam2 - lam1) * Math.cos(phi2);
  const x12 = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(lam2 - lam1);
  const theta12 = Math.atan2(y12, x12);

  const y13 = Math.sin(lam3 - lam1) * Math.cos(phi3);
  const x13 = Math.cos(phi1) * Math.sin(phi3) - Math.sin(phi1) * Math.cos(phi3) * Math.cos(lam3 - lam1);
  const theta13 = Math.atan2(y13, x13);

  const angleDiff = theta13 - theta12;
  const dXt = Math.asin(Math.max(-1, Math.min(1, Math.sin(delta13) * Math.sin(angleDiff))));
  const cosDxt = Math.cos(dXt);
  const dAt = Math.acos(Math.max(-1, Math.min(1, Math.cos(delta13) / (cosDxt === 0 ? 1e-9 : cosDxt))));

  if (Math.cos(angleDiff) < 0) {
    return haversineDistKm(pLat, pLon, aLat, aLon);
  }
  if (dAt > delta12) {
    return haversineDistKm(pLat, pLon, bLat, bLon);
  }

  return Math.abs(dXt * R);
}

// Test 1.1: Point directly on segment
const dOn = distToSegmentKm(27.75, 85.0, 27.70, 85.0, 27.80, 85.0);
assert(dOn < 0.05, `Expected point on segment to be ~0 km, got ${dOn}`);

// Test 1.2: Point offset by ~0.045 deg lat (~5km)
const d5km = distToSegmentKm(27.75, 85.05, 27.70, 85.0, 27.80, 85.0);
assert(d5km >= 4.5 && d5km <= 5.5, `Expected cross-track distance ~5 km, got ${d5km}`);

// Test 1.3: Point beyond endpoint
const dBeyond = distToSegmentKm(27.85, 85.0, 27.70, 85.0, 27.80, 85.0);
const expectedBeyond = haversineDistKm(27.85, 85.0, 27.80, 85.0);
assert(Math.abs(dBeyond - expectedBeyond) < 0.01, `Expected beyond-endpoint distance to match endpoint distance`);

console.log('✅ [1/6] Great-circle cross-track geometry math tests passed.');

// ---------------------------------------------------------------------------
// 2. NLP Classifier & Negation Detection Tests
// ---------------------------------------------------------------------------
function classifyNewsStatus(title) {
  if (!title || typeof title !== 'string') return null;
  const clean = title.trim();

  // Context terms relating to road/traffic/clearance/landslide
  const hasRoadHazardContext = /(पहिरो|लेदो|गेग्रान|बाढी|सडक|राजमार्ग|यातायात|सवारी|बाटो|खुलाउने|पन्छाउने|सुचारु|हटाउने|landslide|debris|mudslide|highway|road|traffic|clearance)/i.test(clean);

  // Explicit negative / negation markers that invalidate "open" status or indicate obstruction
  const hasNegation = /(हुन सकेन|भएन|सकेन|छैन|असफल|समस्या|अझै|अवरुद्ध नै|खुल्न सकेन|बाधा|पन्छाउन कठिन|समय लाग्ने|रोकिएको छ|failed|could not|not yet|unable|halt(s|ed|ing)?|stalled|delay|cannot|difficult)/i.test(clean);

  // Definite blockage terms
  const hasBlocked = /(अवरुद्ध|ठप्प|बन्द|रोकियो|सडक अवरोध|पहिरोले बन्द|यातायात अवरुद्ध|पहिरो खसेर अवरुद्ध|सवारी आवागमन ठप्प|सडक जाम|पहिरोका कारण बन्द|सडक भासियो|पुल भत्कियो|block(ed|s|ing)?|shut\s*down|clos(ed|es|ing)?|halt(s|ed|ing)?|landslide obstruction|road severed|disrupt(ed|s|ing)?|suspend(ed|s|ing)?)/i.test(clean);

  // Definite open/cleared terms
  const hasOpen = /(सञ्चालनमा आयो|सडक खुल्यो|सवारी सुचारु|खुला भयो|खुला गरिएको|दुईतर्फी सुचारु|दुईतर्फी खुल्यो|पूर्ण रूपमा सुचारु|reopen(ed|s|ing)?|clear(ed|s|ing)?|traffic resumed|resum(ed|es|ing)?|fully operational|two-way traffic)/i.test(clean);

  // Caution / Partial / One-way terms
  const hasCaution = /(एकतर्फी|सावधानी|सतर्कता|पहिरोको जोखिम|एक लेन|पहिरो हटाउने प्रयास|पहिरो पन्छाउने कार्य|single lane|one way|caution|alert|clearance underway|partial)/i.test(clean);

  // If there is negation/failure combined with road/hazard/open/clearance context, it is BLOCKED
  if (hasNegation && (hasOpen || hasBlocked || hasCaution || hasRoadHazardContext)) {
    return 'blocked';
  }

  if (hasBlocked && !hasOpen) return 'blocked';
  if (hasOpen && hasCaution) return 'caution';
  if (hasOpen && !hasBlocked && !hasNegation) return 'open';
  if (hasCaution) return 'caution';
  if (hasBlocked) return 'blocked';

  return null;
}

// Adversarial headlines
const nlpTestCases = [
  { title: 'पहिरोले अवरुद्ध सडक सुचारु हुन सकेन', expected: 'blocked' },
  { title: 'पहिरो खसेपछि सडक खुलाउने प्रयास असफल', expected: 'blocked' },
  { title: 'पहिरो पन्छाएर पृथ्वी राजमार्ग दुईतर्फी सुचारु', expected: 'open' },
  { title: 'मुग्लिन–नारायणगढ सडकखण्ड एकतर्फी खुल्यो', expected: 'caution' },
  { title: 'सडक खुलाउन अझै केही समय लाग्ने', expected: 'blocked' },
  { title: 'पहिरोले सडक अवरुद्ध, सवारी साधन रोकिए', expected: 'blocked' },
  { title: 'Landslide halts traffic along Prithvi Highway', expected: 'blocked' },
  { title: 'Traffic resumed on Narayanghat-Mugling road after 10 hours', expected: 'open' },
  { title: 'Efforts to resume traffic failed after fresh landslide', expected: 'blocked' },
  { title: 'काठमाडौँमा आज मौसम सामान्य रहने', expected: null },
];

for (const tc of nlpTestCases) {
  const actual = classifyNewsStatus(tc.title);
  assert.strictEqual(actual, tc.expected, `NLP test failed for "${tc.title}". Expected: ${tc.expected}, got: ${actual}`);
}

console.log('✅ [2/6] NLP negation and headline classification tests passed.');

// ---------------------------------------------------------------------------
// 3. Admin Authentication & Constant-Time Token Verification Tests
// ---------------------------------------------------------------------------
function verifyAdminAuth(req, configuredSecret) {
  if (!configuredSecret || typeof configuredSecret !== 'string' || configuredSecret.trim().length === 0) {
    return { ok: false, status: 401, error: 'Admin secret key is not configured on the server.' };
  }

  const authHeader = req.headers?.['authorization'] || '';
  const customHeader = req.headers?.['x-admin-key'] || '';
  let token = '';

  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.slice(7).trim();
  } else if (customHeader) {
    token = String(customHeader).trim();
  }

  if (!token) {
    return { ok: false, status: 401, error: 'Missing authorization header (Bearer token) or x-admin-key.' };
  }

  try {
    const expectedBuf = Buffer.from(configuredSecret.trim());
    const tokenBuf = Buffer.from(token);
    if (expectedBuf.length !== tokenBuf.length || !crypto.timingSafeEqual(expectedBuf, tokenBuf)) {
      return { ok: false, status: 401, error: 'Invalid admin credentials.' };
    }
    return { ok: true };
  } catch (_) {
    return { ok: false, status: 401, error: 'Authentication verification failed.' };
  }
}

// Test 3.1: No secret configured on server
const r1 = verifyAdminAuth({ headers: { authorization: 'Bearer secret123' } }, null);
assert.strictEqual(r1.ok, false);
assert.strictEqual(r1.status, 401);

// Test 3.2: Missing token
const r2 = verifyAdminAuth({ headers: {} }, 'my-secret-key-123');
assert.strictEqual(r2.ok, false);
assert.strictEqual(r2.status, 401);

// Test 3.3: Invalid token
const r3 = verifyAdminAuth({ headers: { authorization: 'Bearer wrong-secret' } }, 'my-secret-key-123');
assert.strictEqual(r3.ok, false);
assert.strictEqual(r3.status, 401);

// Test 3.4: Valid Bearer token
const r4 = verifyAdminAuth({ headers: { authorization: 'Bearer my-secret-key-123' } }, 'my-secret-key-123');
assert.strictEqual(r4.ok, true);

// Test 3.5: Valid x-admin-key header
const r5 = verifyAdminAuth({ headers: { 'x-admin-key': 'my-secret-key-123' } }, 'my-secret-key-123');
assert.strictEqual(r5.ok, true);

console.log('✅ [3/6] Admin auth and timing-safe token verification tests passed.');

// ---------------------------------------------------------------------------
// 4. Prototype Pollution & Input Validation Tests
// ---------------------------------------------------------------------------
const VALID_HIGHWAY_IDS = new Set(['prithvi-ktm-mugling', 'bp-highway', 'ktm-pkr']);
const VALID_STATUSES = new Set(['open', 'caution', 'night-banned', 'blocked', 'clear']);

function validateOverridePayload(body) {
  const { id, status } = body || {};
  if (!id || typeof id !== 'string' || !VALID_HIGHWAY_IDS.has(id) || id === '__proto__' || id === 'constructor') {
    return { ok: false, error: 'Invalid ID' };
  }
  if (!status || typeof status !== 'string' || !VALID_STATUSES.has(status)) {
    return { ok: false, error: 'Invalid status' };
  }
  return { ok: true };
}

assert.strictEqual(validateOverridePayload({ id: '__proto__', status: 'open' }).ok, false);
assert.strictEqual(validateOverridePayload({ id: 'constructor', status: 'open' }).ok, false);
assert.strictEqual(validateOverridePayload({ id: 'random-unknown-road', status: 'open' }).ok, false);
assert.strictEqual(validateOverridePayload({ id: 'prithvi-ktm-mugling', status: '<script>alert(1)</script>' }).ok, false);
assert.strictEqual(validateOverridePayload({ id: 'prithvi-ktm-mugling', status: 'blocked' }).ok, true);

console.log('✅ [4/6] Schema validation & prototype pollution defense tests passed.');

// ---------------------------------------------------------------------------
// 5. Allowlist URL & DOM Sanitization Tests
// ---------------------------------------------------------------------------
const ALLOWED_URL_SCHEMES = new Set(['http:', 'https:']);

function sanitizeUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  try {
    const parsed = new URL(rawUrl, 'https://example.com');
    if (ALLOWED_URL_SCHEMES.has(parsed.protocol)) {
      return parsed.href;
    }
  } catch (_) {}
  return '';
}

function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

assert.strictEqual(sanitizeUrl('javascript:alert(document.cookie)'), '');
assert.strictEqual(sanitizeUrl('data:text/html,<script>alert(1)</script>'), '');
assert.strictEqual(sanitizeUrl('vbscript:msgbox(1)'), '');
assert.strictEqual(sanitizeUrl('https://navigate.dor.gov.np/app/dashboard'), 'https://navigate.dor.gov.np/app/dashboard');
assert.strictEqual(escapeHtml('<script>alert("XSS")</script>'), '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;');

console.log('✅ [5/6] URL allowlist and DOM sanitization tests passed.');

// ---------------------------------------------------------------------------
// 6. Multi-Hazard "Worst-Status-Wins" Hierarchy & Temporal Decay Tests
// ---------------------------------------------------------------------------
const STATUS_SEVERITY = {
  'blocked': 4,
  'night-banned': 3,
  'caution': 2,
  'open': 1,
};

function resolveWorstStatus(hazards, baseline = 'open') {
  let highest = baseline;
  for (const h of hazards) {
    if ((STATUS_SEVERITY[h.status] || 0) > (STATUS_SEVERITY[highest] || 0)) {
      highest = h.status;
    }
  }
  return highest;
}

// Test 6.1: DoR caution + BIPAD blocked => blocked
const hazards1 = [{ type: 'dor', status: 'caution' }, { type: 'bipad', status: 'blocked' }];
assert.strictEqual(resolveWorstStatus(hazards1), 'blocked');

// Test 6.2: News open + DoR blocked => blocked (safety first)
const hazards2 = [{ type: 'dor', status: 'blocked' }, { type: 'news', status: 'open' }];
assert.strictEqual(resolveWorstStatus(hazards2), 'blocked');

// Test 6.3: Baseline night-banned + News open => night-banned preserved
const hazards3 = [{ type: 'news', status: 'open' }];
assert.strictEqual(resolveWorstStatus(hazards3, 'night-banned'), 'night-banned');

// Test 6.4: Temporal decay check
function getIncidentDecayStatus(ageHours, distanceKm) {
  if (ageHours <= 48) {
    if (distanceKm <= 2.0) return 'blocked';
    if (distanceKm <= 6.0) return 'caution';
    return null;
  }
  if (ageHours <= 7 * 24) {
    if (distanceKm <= 4.0) return 'caution'; // Recovery phase
    return null;
  }
  return null; // Expired after 7 days
}

assert.strictEqual(getIncidentDecayStatus(10, 1.2), 'blocked');
assert.strictEqual(getIncidentDecayStatus(10, 3.5), 'caution');
assert.strictEqual(getIncidentDecayStatus(72, 1.2), 'caution'); // 3 days old within 4km -> caution
assert.strictEqual(getIncidentDecayStatus(200, 1.2), null); // > 7 days old -> baseline

console.log('✅ [6/6] Multi-hazard Worst-Status-Wins & temporal decay tests passed.');

console.log('\n🎉 ALL HIGHWAY ADVERSARIAL & ROBUSTNESS TESTS PASSED SUCCESSFULLY!');
