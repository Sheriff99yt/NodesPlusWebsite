/**
 * analytics.ts
 * A simple analytics module for tracking page views and events
 * This is a placeholder implementation that logs to console in development
 * and would send data to an analytics service in production
 */

// Check if we're in production
const isProduction = import.meta.env.PROD;

// Initialize analytics
let initialized = false;

// Export initialization function
export const initAnalytics = (): void => {
  initializeAnalytics();
};

// Track page view
export const trackPageView = (path: string, title: string): void => {
  if (!initialized) {
    initializeAnalytics();
  }
  
  if (isProduction) {
    // In a real implementation, this would send data to your analytics service
    // Example: window.gtag('page_view', { page_path: path, page_title: title });
    console.log(`[ANALYTICS] Page view: ${path} (${title})`);
  } else {
    console.log(`[DEV] Page view: ${path} (${title})`);
  }
};

// Track event
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
): void => {
  if (!initialized) {
    initializeAnalytics();
  }
  
  if (isProduction) {
    // In a real implementation, this would send event data to your analytics service
    // Example: window.gtag('event', action, { event_category: category, event_label: label, value });
    console.log(
      `[ANALYTICS] Event: ${category} / ${action}${label ? ` / ${label}` : ''}${
        value !== undefined ? ` (${value})` : ''
      }`
    );
  } else {
    console.log(
      `[DEV] Event: ${category} / ${action}${label ? ` / ${label}` : ''}${
        value !== undefined ? ` (${value})` : ''
      }`
    );
  }
};

// Track search queries
export const trackSearch = (query: string, resultCount: number): void => {
  trackEvent('Search', 'Query', query, resultCount);
};

// Track node views
export const trackNodeView = (nodeId: string, nodeName: string, category: string): void => {
  trackEvent('Node', 'View', `${category}/${nodeName}`, 1);
};

// Initialize analytics
const initializeAnalytics = (): void => {
  if (isProduction) {
    // In a real implementation, this would initialize your analytics service
    // Example: window.gtag = (...args) => { /* initialize Google Analytics */ };
    console.log('Analytics initialized in production mode');
  } else {
    console.log('Analytics initialized in development mode (no data sent)');
  }
  initialized = true;
}; 