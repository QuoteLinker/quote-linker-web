// src/lib/ga4.ts
// Minimal GA4 event logger for browser and SSR-safe usage

export function logEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params || {});
  } else {
    // Optionally, send to server or log for SSR
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('[GA4]', eventName, params);
    }
  }
}
