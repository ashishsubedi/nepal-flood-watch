const http = require('http');
const assert = require('assert');

console.log('🚀 Running Highway Integration & API Security Tests...\n');

process.env.ADMIN_SECRET_KEY = 'test-secret-nepal-2026';
const app = require('../server.js');

const server = http.createServer(app);

function makeRequest(options, postData) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        let json = null;
        try { json = JSON.parse(body); } catch (_) {}
        resolve({ statusCode: res.statusCode, headers: res.headers, body, json });
      });
    });
    req.on('error', reject);
    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

server.listen(0, async () => {
  const port = server.address().port;
  const host = '127.0.0.1';

  try {
    // 1. Test GET /api/highways
    const resHw = await makeRequest({ host, port, path: '/api/highways', method: 'GET' });
    assert.strictEqual(resHw.statusCode, 200, 'GET /api/highways should return 200');
    assert(Array.isArray(resHw.json?.highways), 'Highways list should be an array');
    assert(resHw.json.highways.length > 10, 'Should return configured highway segments');
    console.log('✅ GET /api/highways endpoint verified.');

    // 2. Test POST /api/highway-overrides without auth header -> 401
    const resNoAuth = await makeRequest({
      host, port, path: '/api/highway-overrides', method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { id: 'prithvi-ktm-mugling', status: 'blocked' });
    assert.strictEqual(resNoAuth.statusCode, 401, 'POST /api/highway-overrides without auth must return 401');
    console.log('✅ POST /api/highway-overrides without auth properly rejected with 401.');

    // 3. Test POST /api/highway-overrides with invalid Bearer token -> 401
    const resWrongAuth = await makeRequest({
      host, port, path: '/api/highway-overrides', method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer wrong-token-xyz'
      }
    }, { id: 'prithvi-ktm-mugling', status: 'blocked' });
    assert.strictEqual(resWrongAuth.statusCode, 401, 'POST with wrong token must return 401');
    console.log('✅ POST /api/highway-overrides with wrong token properly rejected with 401.');

    // 4. Test POST /api/highway-overrides with prototype pollution id -> 400
    const resProto = await makeRequest({
      host, port, path: '/api/highway-overrides', method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-secret-nepal-2026'
      }
    }, { id: '__proto__', status: 'blocked' });
    assert.strictEqual(resProto.statusCode, 400, 'POST with proto pollution id must return 400');
    console.log('✅ Prototype pollution attack payload properly rejected with 400.');

    // 5. Test POST /api/highway-overrides with valid auth and payload -> 200
    const resValidPost = await makeRequest({
      host, port, path: '/api/highway-overrides', method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-secret-nepal-2026'
      }
    }, { id: 'prithvi-ktm-mugling', status: 'blocked', noteEn: 'Emergency road maintenance' });
    assert.strictEqual(resValidPost.statusCode, 200, 'Valid override POST must return 200');
    assert.strictEqual(resValidPost.json?.override?.status, 'blocked');
    console.log('✅ Authorized POST /api/highway-overrides successfully updated status.');

    // 6. Verify status updated in GET /api/highway-overrides
    const resGetOverrides = await makeRequest({ host, port, path: '/api/highway-overrides', method: 'GET' });
    assert.strictEqual(resGetOverrides.statusCode, 200);
    assert.strictEqual(resGetOverrides.json?.overrides?.['prithvi-ktm-mugling']?.status, 'blocked');
    console.log('✅ GET /api/highway-overrides reflects the authorized state override.');

    // 7. Test DELETE /api/highway-overrides/:id with auth -> 200
    const resDelete = await makeRequest({
      host, port, path: '/api/highway-overrides/prithvi-ktm-mugling', method: 'DELETE',
      headers: {
        'Authorization': 'Bearer test-secret-nepal-2026'
      }
    });
    assert.strictEqual(resDelete.statusCode, 200, 'DELETE override must return 200');
    assert.strictEqual(resDelete.json?.overrides?.['prithvi-ktm-mugling'], undefined);
    console.log('✅ DELETE /api/highway-overrides/:id successfully cleared the override.');

    console.log('\n🎉 ALL HIGHWAY INTEGRATION & SECURITY TESTS PASSED!');
  } catch (err) {
    console.error('❌ Integration test failed:', err);
    process.exit(1);
  } finally {
    server.close();
    process.exit(0);
  }
});
