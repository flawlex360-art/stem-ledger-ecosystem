const http = require('http');
const fs = require('fs');
const path = require('path');

function serveFolder(folderPath, port, name) {
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.json': 'application/json',
    '.wav': 'audio/wav',
  };

  const server = http.createServer((req, res) => {
    // Normalize URL path and remove query parameters
    let filePath = path.join(folderPath, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
    
    // Check if path is outside root
    if (!filePath.startsWith(folderPath)) {
      res.statusCode = 403;
      res.end('Forbidden');
      return;
    }

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        // Fallback to index.html for SPA router support
        filePath = path.join(folderPath, 'index.html');
      }

      fs.stat(filePath, (err2, stats2) => {
        if (err2 || !stats2.isFile()) {
          res.statusCode = 404;
          res.end('Not Found');
          return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = mimeTypes[ext] || 'application/octet-stream';

        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(filePath).pipe(res);
      });
    });
  });

  server.listen(port, '0.0.0.0', () => {
    console.log(`[${name}] Serving at http://localhost:${port}`);
  });
}

const rootDir = __dirname;

// Serve individual portals
serveFolder(path.join(rootDir, 'stem_ledger_mobile', 'www'), 8080, 'School App');
serveFolder(path.join(rootDir, 'kpando_stem_community', 'www'), 8081, 'Community App');
serveFolder(path.join(rootDir, 'stem_ledger_master_portal', 'www'), 8082, 'Master Portal');

// Serve Central Hub
serveFolder(rootDir, 3000, 'Portal Hub');
