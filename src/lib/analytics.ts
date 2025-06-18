// src/lib/analytics.ts
import { logEvent } from './ga4';

// Call this on form submission
export function trackFormSubmission(formName: string, data?: Record<string, any>) {
  logEvent('form_submit', { form_name: formName, ...data });
}

// Call this on page view (e.g. in _app or layout)
export function trackPageView(path: string) {
  logEvent('page_view', { page_path: path });
}

// Call this in error boundaries
export function trackReactError(error: Error, info?: any) {
  logEvent('react_error', {
    message: error.message,
    stack: error.stack,
    componentStack: info?.componentStack || '',
  });
}
