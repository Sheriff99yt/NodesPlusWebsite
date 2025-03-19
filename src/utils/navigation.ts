/**
 * Navigation utility functions
 * Provides helpers for navigation with optional forced reloading
 */

/**
 * Navigate to a URL with a full page reload
 * @param url The URL to navigate to
 */
export const navigateWithReload = (url: string): void => {
  window.location.href = url.startsWith('/') 
    ? `#${url}` // For HashRouter
    : url;
};

/**
 * Navigate to a route, optionally forcing a page reload
 * @param route The route to navigate to (without the hash)
 * @param forceReload Whether to force a page reload
 */
export const navigateTo = (route: string, forceReload = false): void => {
  if (forceReload) {
    navigateWithReload(route);
  } else {
    // Let React Router handle it (code using this would use the navigate function from useNavigate)
    console.log(`Normal navigation to ${route} (handled by caller)`);
  }
};

/**
 * Check if a route requires a reload based on known problematic routes
 * @param route The route to check
 * @returns True if the route should be reloaded
 */
export const shouldForceReload = (route: string): boolean => {
  // No problematic routes since docs were removed
  return false;
}; 