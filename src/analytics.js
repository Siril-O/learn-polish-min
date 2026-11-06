export const measurementId = 'G-WGNJPHP7HP';
export const consentKey = 'polski-praktyka-analytics-consent';
const routes = new Set(['plan', 'grammar', 'practice', 'karta', 'vocabulary', 'settings']);
let initialized = false;
let lastRoute = null;

export function analyticsAllowed(production, location) {
  return (
    production &&
    location.hostname === 'siril-o.github.io' &&
    location.pathname.startsWith('/learn-polish-min/')
  );
}

export function readConsent() {
  try {
    const value = localStorage.getItem(consentKey);
    return ['accepted', 'rejected'].includes(value) ? value : null;
  } catch {
    return null;
  }
}

export function saveConsent(value) {
  try {
    localStorage.setItem(consentKey, value);
  } catch {
    /* Keep the choice for this session. */
  }
}

export function trackPage(route) {
  if (!routes.has(route) || !analyticsAllowed(import.meta.env.PROD, window.location)) return;
  if (!initialized) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_domain: 'none',
      cookie_path: '/learn-polish-min/',
      cookie_prefix: 'polski',
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
    initialized = true;
  }
  if (lastRoute === route) return;
  lastRoute = route;
  // Only known section names are sent, never answers, search terms or arbitrary URL parameters.
  window.gtag('event', 'page_view', {
    page_title: `Polski Praktyka - ${route}`,
    page_location: `https://siril-o.github.io/learn-polish-min/#${route}`,
    page_referrer: '',
  });
}

export function withdrawConsent() {
  window[`ga-disable-${measurementId}`] = true;
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.trim().split('=')[0];
    if (name.startsWith('polski_ga'))
      document.cookie = `${name}=; Max-Age=0; Path=/learn-polish-min/; SameSite=Lax`;
  }
  saveConsent('rejected');
  // Unload the tag and its listeners, rather than leaving an opted-out tracker running.
  window.location.reload();
}
