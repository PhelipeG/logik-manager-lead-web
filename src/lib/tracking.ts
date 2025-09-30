/* eslint-disable @typescript-eslint/no-explicit-any */
interface LeadData {
  email: string;
  phone: string;
  name?: string;
  position?: string;
}

interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
}

/**
 * Track page view event
 */
export function trackPageView() {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page_path: window.location.pathname,
      page_location: window.location.href,
      page_title: document.title,
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * Track lead generation with enhanced data
 */
export function trackLeadGeneration(leadData: LeadData, utmParams?: UTMParams) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    // Push to dataLayer with all tracking data
    window.dataLayer.push({
      event: 'generate_lead',

      // GA4 Enhanced Ecommerce format
      currency: 'BRL',
      value: 100.0,

      // Enhanced conversions data (Google Ads)
      user_data: {
        email: leadData.email,
        phone_number: leadData.phone.replace(/\D/g, ''),
        first_name: leadData.name?.split(' ')[0] || '',
        last_name: leadData.name?.split(' ').slice(1).join(' ') || '',
      },

      // Lead information
      lead_data: {
        email: leadData.email,
        phone: leadData.phone,
        name: leadData.name,
        position: leadData.position,
      },

      // UTM parameters in correct format
      campaign_source: utmParams?.utm_source || '(direct)',
      campaign_medium: utmParams?.utm_medium || '(none)',
      campaign_name: utmParams?.utm_campaign || '(not set)',
      campaign_term: utmParams?.utm_term || '',
      campaign_content: utmParams?.utm_content || '',
      gclid: utmParams?.gclid || '',
      fbclid: utmParams?.fbclid || '',

      // Additional metadata
      event_category: 'Lead',
      event_label: 'Lead Form Submission',
      lead_type: 'contact_form',

      // Timestamp
      timestamp: new Date().toISOString(),

      // User agent info
      user_agent: navigator.userAgent,
      screen_resolution: `${window.screen.width}x${window.screen.height}`,
      viewport_size: `${window.innerWidth}x${window.innerHeight}`,
    });

    // Also push Meta Pixel specific event
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'Lead', {
        content_name: 'Lead Form',
        content_category: 'Contact',
        value: 1.0,
        currency: 'BRL',
      });
    }

    console.log('✅ Lead generation tracked:', {
      email: leadData.email,
      phone: leadData.phone,
      utmParams,
    });
  }
}

/**
 * Track form start
 */
export function trackFormStart() {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'form_start',
      event_category: 'Form',
      event_label: 'Lead Form',
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * Track form error
 */
export function trackFormError(errorField: string, errorMessage: string) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'form_error',
      event_category: 'Form',
      event_label: 'Lead Form',
      error_field: errorField,
      error_message: errorMessage,
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * Track button click
 */
export function trackButtonClick(buttonName: string, buttonLocation: string) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'button_click',
      event_category: 'Engagement',
      event_label: buttonName,
      button_location: buttonLocation,
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * Track login event
 */
export function trackLogin(method: string = 'email') {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'login',
      event_category: 'Authentication',
      method: method,
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * Track export event
 */
export function trackExport(exportType: string = 'csv') {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'export_data',
      event_category: 'Data',
      export_type: exportType,
      timestamp: new Date().toISOString(),
    });
  }
}
