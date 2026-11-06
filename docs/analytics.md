# Analytics

The site uses GA4 measurement ID `G-WGNJPHP7HP` directly. Do not also install the Tag Manager container: duplicate tags can double-count visits.

Collection is restricted to production builds on `siril-o.github.io/learn-polish-min/`. Localhost and preview hosts never load the Google tag. No tag is loaded before consent; rejecting does not send consent-mode pings. The choice is stored separately from learning progress. Users can change it under Settings. Withdrawal disables collection, removes app-prefixed cookies and reloads the page to unload the tag.

Only known app sections are explicitly sent as page views, without search parameters, exercise answers or learning progress. Advertising consent and Google signals are disabled.

## GA4 setup

In Admin > Data streams > the web stream > Enhanced measurement, disable automatic page-view measurement (including browser-history events) to avoid duplicate events. Disable the other enhanced-measurement features if only section visits are needed; this integration does not require them. Keep the direct Google tag as the only installation.

After deployment, accept analytics on the live site and check Realtime while moving between sections. Browser tests stub the Google script and do not send test visits to Google. They do not verify delivery to the real property.

References:
- https://developers.google.com/analytics/devguides/collection/ga4/views
- https://developers.google.com/tag-platform/security/guides/privacy

The consent notice links to Google's privacy policy. Review the site's privacy disclosures for its actual operator and use before launch; this implementation is not a legal compliance assessment.
