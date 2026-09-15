const fs = require('fs');
const path = require('path');

function getFiles(dir, files = []) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'dist') getFiles(full, files);
    } else {
      files.push(full);
    }
  }
  return files;
}

const files = getFiles('.');
const domainsByUsage = {
  scripts: new Set(),
  stylesheets: new Set(),
  fonts: new Set(),
  images: new Set(),
  connect: new Set(),
  frames: new Set()
};

// 1. Inspect index.html
const indexHtml = fs.readFileSync('index.html', 'utf8');

// Stylesheets in HTML
const styleMatches = indexHtml.matchAll(/href="(https:\/\/[^"]+)"/g);
for (const m of styleMatches) {
  if (m[1].includes('fonts.googleapis.com')) domainsByUsage.stylesheets.add('https://fonts.googleapis.com');
  if (m[1].includes('fonts.gstatic.com')) domainsByUsage.fonts.add('https://fonts.gstatic.com');
}

// Fonts
domainsByUsage.fonts.add('https://fonts.gstatic.com');

// Scripts
// Note: Cloudflare may inject email-decode.min.js or rocket-loader from /cdn-cgi/ (which is 'self')
domainsByUsage.scripts.add("'self'");

// Images across all source files and html
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  
  // Unsplash images
  if (content.includes('images.unsplash.com')) {
    domainsByUsage.images.add('https://images.unsplash.com');
  }
  // Cloudinary / other CDNs if any
  if (content.includes('cloudinary.com')) {
    domainsByUsage.images.add('https://*.cloudinary.com');
  }
  if (content.includes('data:image')) {
    domainsByUsage.images.add('data:');
  }
  if (content.includes('blob:')) {
    domainsByUsage.images.add('blob:');
  }

  // APIs / fetch
  if (content.includes('fetch(') || content.includes('axios')) {
    console.log('Found fetch/axios in:', file);
  }
}

// Add 'self' to images
domainsByUsage.images.add("'self'");

console.log('=== PRODUCTION RESOURCE INVENTORY ===');
console.log('1. Scripts:', Array.from(domainsByUsage.scripts));
console.log('2. Stylesheets:', Array.from(domainsByUsage.stylesheets), "'self'", "'unsafe-inline'");
console.log('3. Fonts:', Array.from(domainsByUsage.fonts));
console.log('4. Images:', Array.from(domainsByUsage.images));
console.log('5. Connect (XHR/Fetch/WS):', "'self'");
console.log('6. Frames / iframes:', "'none'");
console.log('7. Frame Ancestors (Clickjacking):', "'self'");
console.log('8. Object-src:', "'none'");
console.log('9. Base-URI:', "'self'");
