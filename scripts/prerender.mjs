import { readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// Render the same landing component used by the app, without a browser or API calls.
const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' });
try {
  const { default: About } = await server.ssrLoadModule('/src/About.jsx');
  const markup = renderToStaticMarkup(React.createElement('main', {
    className: 'container py-4',
  }, React.createElement(About, { navigate: () => {} })));
  const path = new URL('../dist/index.html', import.meta.url);
  const html = await readFile(path, 'utf8');
  const placeholder = '<div id="root"></div>';
  if (!html.includes(placeholder)) throw new Error('Missing app root for prerendering');
  await writeFile(path, html.replace(placeholder, `<div id="root">${markup}</div>`));
  console.log('Prerendered Polish landing page into dist/index.html');
} finally {
  await server.close();
}
