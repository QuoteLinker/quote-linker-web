import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: false,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  integrations: [
    // Standard integrations
    // Add any specific integrations here if needed
  ],
  beforeSend(event, hint) {
    // Optionally filter or modify events here
    return event;
  },
  // Ensure both uncaught exceptions and unhandled rejections are captured
  attachStacktrace: true,
  // Set environment
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