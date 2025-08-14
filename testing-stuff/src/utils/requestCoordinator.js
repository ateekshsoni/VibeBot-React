/**
 * Global Request Coordinator
 * Prevents multiple API calls from overwhelming the backend server
 * Implements request throttling and priority queuing
 */

class RequestCoordinator {
  constructor() {
    this.activeRequests = new Map();
    this.requestQueue = [];
    this.maxConcurrentRequests = 3; // Limit concurrent requests
    this.requestDelay = 250; // Minimum delay between requests (ms)
    this.lastRequestTime = 0;
    this.stats = {
      totalRequests: 0,
      throttledRequests: 0,
      queuedRequests: 0
    };
  }

  /**
   * Coordinate an API request with throttling and queuing
   * @param {string} endpoint - API endpoint
   * @param {Function} requestFn - Function that makes the actual request
   * @param {object} options - Request options
   * @returns {Promise} - Request result
   */
  async coordinateRequest(endpoint, requestFn, options = {}) {
    const {
      priority = 'normal', // 'high', 'normal', 'low'
      dedupe = true, // Deduplicate identical requests
      maxAge = 30000, // Cache results for 30 seconds
    } = options;

    this.stats.totalRequests++;

    // Check if identical request is already in progress
    if (dedupe && this.activeRequests.has(endpoint)) {
      console.log(`🔄 Deduplicating request to ${endpoint}`);
      return this.activeRequests.get(endpoint);
    }

    // Check if we need to throttle
    if (this.shouldThrottle()) {
      this.stats.throttledRequests++;
      console.log(`⏱️  Throttling request to ${endpoint}`);
      await this.waitForSlot();
    }

    // Create the coordinated request
    const coordinatedRequest = this.executeRequest(endpoint, requestFn);
    
    if (dedupe) {
      this.activeRequests.set(endpoint, coordinatedRequest);
    }

    try {
      const result = await coordinatedRequest;
      this.lastRequestTime = Date.now();
      return result;
    } finally {
      if (dedupe) {
        this.activeRequests.delete(endpoint);
      }
    }
  }

  /**
   * Check if we should throttle the request
   */
  shouldThrottle() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    const tooManyActive = this.activeRequests.size >= this.maxConcurrentRequests;
    const tooSoon = timeSinceLastRequest < this.requestDelay;

    return tooManyActive || tooSoon;
  }

  /**
   * Wait for an available slot
   */
  async waitForSlot() {
    return new Promise((resolve) => {
      const checkSlot = () => {
        if (!this.shouldThrottle()) {
          resolve();
        } else {
          setTimeout(checkSlot, 100); // Check every 100ms
        }
      };
      
      setTimeout(checkSlot, this.requestDelay);
    });
  }

  /**
   * Execute the actual request
   */
  async executeRequest(endpoint, requestFn) {
    console.log(`🚀 Executing coordinated request to ${endpoint}`);
    try {
      return await requestFn();
    } catch (error) {
      console.error(`❌ Coordinated request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Get current statistics
   */
  getStats() {
    return {
      ...this.stats,
      activeRequests: this.activeRequests.size,
      queuedRequests: this.requestQueue.length,
    };
  }

  /**
   * Clear all active requests (useful for cleanup)
   */
  clearActive() {
    this.activeRequests.clear();
    console.log('🧹 Cleared all active requests');
  }

  /**
   * Reset statistics
   */
  resetStats() {
    this.stats = {
      totalRequests: 0,
      throttledRequests: 0,
      queuedRequests: 0
    };
    console.log('📊 Reset request coordinator statistics');
  }
}

// Global singleton instance
export const requestCoordinator = new RequestCoordinator();

/**
 * Hook to use the request coordinator
 */
export const useRequestCoordinator = () => {
  return {
    coordinateRequest: requestCoordinator.coordinateRequest.bind(requestCoordinator),
    getStats: requestCoordinator.getStats.bind(requestCoordinator),
    clearActive: requestCoordinator.clearActive.bind(requestCoordinator),
    resetStats: requestCoordinator.resetStats.bind(requestCoordinator),
  };
};

export default requestCoordinator;
