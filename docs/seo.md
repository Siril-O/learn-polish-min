# Search visibility

The production build prerenders the Polish landing from `About.jsx` into the
initial HTML. React replaces that markup when it starts, preserving existing
hash navigation and returning-user preferences. This is static prerendering,
not hydration. No bot-specific content is served.

The sitemap lists only the canonical root. Hash routes are application states,
not separate indexable pages. Dedicated topic URLs remain future work.

## Google Search Console

1. Add a URL-prefix property for `https://siril-o.github.io/learn-polish-min/`.
2. Verify using Google's HTML file (place it in `public/`) or HTML meta tag
   (add the supplied verification tag to `index.html`), then deploy.
3. Submit `https://siril-o.github.io/learn-polish-min/sitemap.xml`.
4. Inspect the root URL, run the live test, review rendered HTML, and request indexing.

Verification requires the owner's Google account; Analytics does not replace
Search Console. Indexing and ranking are not guaranteed.

Robots rules apply at the host root, `https://siril-o.github.io/robots.txt`.
A file inside this project's subdirectory would not control crawling. The
host currently returns 404 for robots.txt, so no file is added here.
