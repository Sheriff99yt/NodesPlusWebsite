import { useCallback } from 'react';

/**
 * Hook for tracking analytics events in the application
 * This is a placeholder that will log to console in development
 * In a production environment, this would connect to a real analytics service
 */
const useAnalytics = () => {
  /**
   * Track page view
   */
  const trackPageView = useCallback((path: string, title: string) => {
    if (import.meta.env.DEV) {
      console.log(`[Analytics] Page View: ${path} - ${title}`);
    }
    
    // In production, this would send data to an analytics service
    // Example: window.gtag('event', 'page_view', { page_path: path, page_title: title });
  }, []);
  
  /**
   * Track a specific node view
   */
  const trackNodeView = useCallback((nodeId: string, nodeName: string, category: string) => {
    if (import.meta.env.DEV) {
      console.log(`[Analytics] Node View: ${nodeId} - ${nodeName} (${category})`);
    }
    
    // In production, this would send data to an analytics service
    // Example: window.gtag('event', 'node_view', { node_id: nodeId, node_name: nodeName, category });
  }, []);
  
  /**
   * Track search events
   */
  const trackSearch = useCallback((searchTerm: string, resultCount: number) => {
    if (import.meta.env.DEV) {
      console.log(`[Analytics] Search: "${searchTerm}" - ${resultCount} results`);
    }
    
    // In production, this would send data to an analytics service
    // Example: window.gtag('event', 'search', { search_term: searchTerm, result_count: resultCount });
  }, []);
  
  /**
   * Track feature usage
   */
  const trackFeatureUsage = useCallback((featureId: string, metadata?: Record<string, any>) => {
    if (import.meta.env.DEV) {
      console.log(`[Analytics] Feature Usage: ${featureId}`, metadata);
    }
    
    // In production, this would send data to an analytics service
    // Example: window.gtag('event', 'feature_use', { feature_id: featureId, ...metadata });
  }, []);
  
  return {
    trackPageView,
    trackNodeView,
    trackSearch,
    trackFeatureUsage
  };
};

export default useAnalytics; 