import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root = resolve('dist');
const prefix = '/learn_pollish_minimalistic/';
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

createServer(async (request, response) => {
  try {
    const path = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (!path.startsWith(prefix)) {
      response.writeHead(404).end();
      return;
    }
    const file = resolve(root, path.slice(prefix.length) || 'index.html');
    if (!file.startsWith(root + sep)) {
      response.writeHead(403).end();
      return;
    }
    const body = await readFile(file);
    response
      .writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' })
      .end(body);
  } catch {
    response.writeHead(404).end();
  }
}).listen(4179, '127.0.0.1');
