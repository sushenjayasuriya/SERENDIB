const https = require('https');
const http = require('http');
const tls = require('tls');

function fetchUrl(urlStr) {
  return new Promise((resolve) => {
    const u = new URL(urlStr);
    const mod = u.protocol === 'https:' ? https : http;
    const start = Date.now();
    mod.get(urlStr, (res) => {
      const ttfb = Date.now() - start;
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({
        url: urlStr,
        statusCode: res.statusCode,
        ttfb,
        headers: res.headers,
        byteLength: Buffer.byteLength(data),
        data
      }));
    }).on('error', e => resolve({ url: urlStr, error: e.message }));
  });
}

function getTlsDetails(host) {
  return new Promise((resolve) => {
    const socket = tls.connect(443, host, { servername: host }, () => {
      const cert = socket.getPeerCertificate();
      const protocol = socket.getProtocol();
      const cipher = socket.getCipher();
      socket.end();
      resolve({
        subject: cert.subject,
        issuer: cert.issuer,
        valid_from: cert.valid_from,
        valid_to: cert.valid_to,
        protocol,
        cipher
      });
    });
    socket.on('error', e => resolve({ error: e.message }));
  });
}

async function runAudit() {
  console.log('=== 1. TLS & CERTIFICATE ===');
  const tlsInfo = await getTlsDetails('sl.sushenjayasuriya.org.lk');
  console.log(JSON.stringify(tlsInfo, null, 2));

  console.log('\n=== 2. HTTP TO HTTPS REDIRECT ===');
  const httpRes = await fetchUrl('http://sl.sushenjayasuriya.org.lk/');
  console.log('HTTP Status:', httpRes.statusCode, 'Location:', httpRes.headers ? httpRes.headers.location : 'N/A');

  console.log('\n=== 3. PRODUCTION ROOT HEADERS & TTFB ===');
  const rootRes = await fetchUrl('https://sl.sushenjayasuriya.org.lk/');
  console.log('Root HTTPS Status:', rootRes.statusCode, 'TTFB:', rootRes.ttfb + 'ms', 'Bytes:', rootRes.byteLength);
  console.log('Headers:', JSON.stringify(rootRes.headers, null, 2));

  console.log('\n=== 4. SPA DIRECT ROUTE TESTS ===');
  const routes = [
    '/',
    '/destinations',
    '/map',
    '/beaches',
    '/highlands',
    '/wildlife',
    '/heritage',
    '/cuisine',
    '/guide',
    '/planner'
  ];
  for (const r of routes) {
    const res = await fetchUrl('https://sl.sushenjayasuriya.org.lk' + r);
    console.log(`Route [${r}] -> Status: ${res.statusCode}, TTFB: ${res.ttfb}ms, Length: ${res.byteLength}`);
  }

  console.log('\n=== 5. SEO & DISCOVERY FILES ===');
  const robots = await fetchUrl('https://sl.sushenjayasuriya.org.lk/robots.txt');
  console.log('robots.txt -> Status:', robots.statusCode, '\nContent:\n' + robots.data);
  const sitemap = await fetchUrl('https://sl.sushenjayasuriya.org.lk/sitemap.xml');
  console.log('sitemap.xml -> Status:', sitemap.statusCode, 'Length:', sitemap.byteLength);

  console.log('\n=== 6. ASSET TRANSFER & CACHING AUDIT ===');
  const html = rootRes.data;
  
  // Find script and link tags
  const jsFiles = [];
  const jsRegex = /src="([^"]+\.js)"/g;
  let match;
  while ((match = jsRegex.exec(html)) !== null) {
    jsFiles.push(match[1]);
  }

  const cssFiles = [];
  const cssRegex = /href="([^"]+\.css)"/g;
  while ((match = cssRegex.exec(html)) !== null) {
    cssFiles.push(match[1]);
  }

  for (const js of jsFiles) {
    const fullUrl = js.startsWith('http') ? js : 'https://sl.sushenjayasuriya.org.lk' + (js.startsWith('/') ? '' : '/') + js;
    const res = await fetchUrl(fullUrl);
    console.log(`JS Asset: ${fullUrl}`);
    console.log(`Status: ${res.statusCode}, Raw Size: ${(res.byteLength / 1024).toFixed(1)} KB, Cache-Control: ${res.headers['cache-control']}`);
    
    // Check for sensitive credential leaks in bundle
    console.log('Contains plaintext "serendib2026":', res.data.includes('serendib2026'));
    console.log('Contains plaintext "admin@serendib":', res.data.includes('admin@serendib'));
    console.log('Contains plaintext "serendib_curator_2026":', res.data.includes('serendib_curator_2026'));
    console.log('Contains salted hash "a72641d59fa7b4b7a1089460334e6d66b806e65d6e11f853a98e9acc3200b04e":', res.data.includes('a72641d59fa7b4b7a1089460334e6d66b806e65d6e11f853a98e9acc3200b04e'));
  }

  for (const css of cssFiles) {
    const fullUrl = css.startsWith('http') ? css : 'https://sl.sushenjayasuriya.org.lk' + (css.startsWith('/') ? '' : '/') + css;
    const res = await fetchUrl(fullUrl);
    console.log(`CSS Asset: ${fullUrl}`);
    console.log(`Status: ${res.statusCode}, Raw Size: ${(res.byteLength / 1024).toFixed(1)} KB, Cache-Control: ${res.headers['cache-control']}`);
  }

  console.log('\n=== 7. JSON-LD STRUCTURED DATA PARSING ===');
  const ldMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (ldMatch) {
    try {
      const parsed = JSON.parse(ldMatch[1]);
      console.log('JSON-LD Valid JSON: YES');
      console.log('Graph entities:', parsed['@graph'] ? parsed['@graph'].map(e => e['@type'] + ' (' + (e.name || e.url || '') + ')') : parsed['@type']);
    } catch (e) {
      console.log('JSON-LD Valid JSON: NO - Error:', e.message);
    }
  }

  console.log('\n=== 8. CANONICAL & META TAGS IN HTML ===');
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
  console.log('Canonical Tag:', canonical ? canonical[1] : 'NONE');
  const title = html.match(/<title>([^<]+)<\/title>/);
  console.log('Title Tag:', title ? title[1] : 'NONE');
  const metaDesc = html.match(/<meta name="description" content="([^"]+)"/);
  console.log('Meta Description:', metaDesc ? metaDesc[1] : 'NONE');
  const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/);
  console.log('OG Image:', ogImage ? ogImage[1] : 'NONE');
}

runAudit();
