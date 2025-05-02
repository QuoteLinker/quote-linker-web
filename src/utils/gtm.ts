interface GTMEvent {
  event: string;
  [key: string]: any;
}

type GTMDataLayer = Array<GTMEvent>;

function getDataLayer(): GTMDataLayer {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    return window.dataLayer;
  }
  return [];
}

export function pushGTMEvent(eventData: GTMEvent): void {
  const dataLayer = getDataLayer();
  dataLayer.push(eventData);
}

export const GTMEvents = {
  QUOTE_SUBMISSION: 'quote_submission',
  CONTACT_SUBMISSION: 'contact_submission',
  FORM_ERROR: 'form_error',
  NAV_CLICK: 'nav_click',
  FORM_START: 'form_start',
  FORM_FIELD_INTERACTION: 'form_field_interaction',
  FORM_VALIDATION: 'form_validation',
  CALENDLY_INTERACTION: 'calendly_interaction',
  TRUST_SIGNAL: 'trust_signal',
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

export function trackFormFieldInteraction(formId: string, fieldName: string, action: 'focus' | 'blur' | 'change') {
  pushGTMEvent({
    event: GTMEvents.FORM_FIELD_INTERACTION,
    formId,
    fieldName,
    action,
    timestamp: new Date().toISOString(),
  });
}

export function trackFormStart(formId: string, insuranceType: string) {
  pushGTMEvent({
    event: GTMEvents.FORM_START,
    formId,
    insuranceType,
    timestamp: new Date().toISOString(),
  });
}

export function trackFormValidation(formId: string, fieldName: string, isValid: boolean, errorMessage?: string) {
  pushGTMEvent({
    event: GTMEvents.FORM_VALIDATION,
    formId,
    fieldName,
    isValid,
    errorMessage,
    timestamp: new Date().toISOString(),
  });
}

export function trackCalendlyInteraction(action: 'open' | 'close' | 'scheduled', details?: Record<string, any>) {
  pushGTMEvent({
    event: GTMEvents.CALENDLY_INTERACTION,
    action,
    ...details,
    timestamp: new Date().toISOString(),
  });
}

export function trackTrustSignal(signalType: string, weight: number, metadata?: Record<string, any>) {
  pushGTMEvent({
    event: GTMEvents.TRUST_SIGNAL,
    signalType,
    weight,
    ...metadata,
    timestamp: new Date().toISOString(),
  });
} 