interface GTMEvent {
  event: string;
  [key: string]: any;
}

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export function pushGTMEvent(eventData: GTMEvent): void {
  if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
    window.dataLayer.push(eventData);
  }
}

export const GTMEvents = {
  QUOTE_SUBMISSION: 'quote_submission',
  CONTACT_SUBMISSION: 'contact_submission',
  FORM_ERROR: 'form_error',
  NAV_CLICK: 'nav_click',
} as const;

export function trackQuoteSubmission(insuranceType: string, zip: string) {
  pushGTMEvent({
    event: GTMEvents.QUOTE_SUBMISSION,
    insuranceType,
    zip,
    timestamp: new Date().toISOString(),
  });
}

export function trackContactSubmission(subject: string) {
  pushGTMEvent({
    event: GTMEvents.CONTACT_SUBMISSION,
    subject,
    timestamp: new Date().toISOString(),
  });
}

export function trackFormError(formType: string, errors: string[]) {
  pushGTMEvent({
    event: GTMEvents.FORM_ERROR,
    formType,
    errors,
    timestamp: new Date().toISOString(),
  });
}

export function trackNavClick(linkText: string, path: string) {
  pushGTMEvent({
    event: GTMEvents.NAV_CLICK,
    linkText,
    path,
    timestamp: new Date().toISOString(),
  });
} 