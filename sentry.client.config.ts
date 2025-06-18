import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: false,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  integrations: [
    // ...existing integrations
    new Sentry.Integrations.Http({ tracing: true }), // Capture server errors
    new Sentry.BrowserTracing(), // Capture client errors
  ],
  beforeSend(event, hint) {
    // Optionally filter or modify events here
    return event;
  },
  // Ensure both uncaught exceptions and unhandled rejections are captured
  attachStacktrace: true,
  autoSessionTracking: true,
  // Optionally, set environment
  environment: process.env.NODE_ENV,
});

if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    Sentry.captureException(event.reason);
  });
  window.addEventListener('error', (event) => {
    Sentry.captureException(event.error || event.message);
  });
}

if (typeof process !== 'undefined' && process.on) {
  process.on('unhandledRejection', (reason) => {
    Sentry.captureException(reason);
  });
  process.on('uncaughtException', (error) => {
    Sentry.captureException(error);
  });
}