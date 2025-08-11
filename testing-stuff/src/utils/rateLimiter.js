/**
 * Simple rate limiter to prevent API abuse and infinite loops
 */
class RateLimiter {
  constructor() {
    this.requests = new Map();
  }

  /**
   * Check if request is allowed
   * @param {string} key - Unique identifier for the request
   * @param {number} maxRequests - Maximum requests allowed
   * @param {number} windowMs - Time window in milliseconds
   * @returns {boolean} - Whether request is allowed
   */
  isAllowed(key, maxRequests = 5, windowMs = 60000) {
    const now = Date.now();
    const requestData = this.requests.get(key) || {
      count: 0,
      resetTime: now + windowMs,
    };

    // Reset if window has passed
    if (now >= requestData.resetTime) {
      requestData.count = 0;
      requestData.resetTime = now + windowMs;
    }

    // Check if limit exceeded
    if (requestData.count >= maxRequests) {
      console.warn(
        `⚠️ Rate limit exceeded for ${key}: ${requestData.count}/${maxRequests} requests`
      );
      return false;
    }

    // Increment and store
    requestData.count++;
    this.requests.set(key, requestData);

    return true;
  }

  /**
   * Reset rate limit for a key
   * @param {string} key - Key to reset
   */
  reset(key) {
    this.requests.delete(key);
  }

  /**
   * Get remaining requests for a key
   * @param {string} key - Key to check
   * @param {number} maxRequests - Maximum requests allowed
   * @returns {number} - Remaining requests
   */
  getRemaining(key, maxRequests = 5) {
    const requestData = this.requests.get(key);
    if (!requestData) return maxRequests;

    return Math.max(0, maxRequests - requestData.count);
  }
}

// Create global instance
export const rateLimiter = new RateLimiter();

// Helper function for API requests
export const withRateLimit = (key, maxRequests = 5, windowMs = 60000) => {
  return rateLimiter.isAllowed(key, maxRequests, windowMs);
};

export default RateLimiter;
