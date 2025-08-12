/**
 * Safe navigation utilities to prevent full page reloads
 * and maintain SPA behavior
 */

/**
 * Navigate to a route using React Router if available,
 * fallback to window.location for external links
 */
export const navigateToRoute = (path, external = false) => {
  try {
    // For external links or when React Router is not available
    if (external || !window.history?.pushState) {
      window.location.href = path;
      return;
    }

    // Try to use React Router navigation if available
    if (window.__REACT_ROUTER_NAVIGATE__) {
      window.__REACT_ROUTER_NAVIGATE__(path);
      return;
    }

    // Fallback to programmatic navigation
    window.history.pushState(null, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  } catch (error) {
    console.warn('Navigation fallback to window.location:', error);
    window.location.href = path;
  }
};

/**
 * Smooth scroll to element with fallback
 */
export const scrollToElement = (elementId, behavior = 'smooth') => {
  try {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior });
    } else {
      console.warn(`Element with ID "${elementId}" not found`);
    }
  } catch (error) {
    console.warn('Scroll to element failed:', error);
  }
};

/**
 * Check if the current environment supports modern navigation
 */
export const supportsModernNavigation = () => {
  return (
    typeof window !== 'undefined' &&
    window.history &&
    typeof window.history.pushState === 'function'
  );
};

/**
 * Safe email validation
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default {
  navigateToRoute,
  scrollToElement,
  supportsModernNavigation,
  isValidEmail
};
