/**
 * Circuit Breaker Utility for preventing infinite API retry loops
 * Implements the Circuit Breaker pattern to protect against cascading failures
 */

class CircuitBreaker {
  constructor(options = {}) {
    this.failureThreshold = options.failureThreshold || 3;
    this.recoveryTimeout = options.recoveryTimeout || 60000; // 1 minute
    this.monitoringTimeout = options.monitoringTimeout || 10000; // 10 seconds
    
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.nextAttempt = Date.now();
  }

  async call(fn, fallback) {
    if (this.state === 'OPEN') {
      if (Date.now() < this.nextAttempt) {
        console.warn(`🚨 Circuit breaker OPEN - blocking call`);
        return fallback ? fallback() : Promise.reject(new Error('Circuit breaker is OPEN'));
      } else {
        this.state = 'HALF_OPEN';
        console.log(`🔄 Circuit breaker transitioning to HALF_OPEN`);
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      if (fallback) {
        return fallback();
      }
      throw error;
    }
  }

  onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
    console.log(`✅ Circuit breaker reset to CLOSED state`);
  }

  onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();

    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.recoveryTimeout;
      console.warn(`🚨 Circuit breaker OPENED due to ${this.failureCount} failures`);
    }
  }

  getState() {
    return {
      state: this.state,
      failureCount: this.failureCount,
      nextAttempt: this.nextAttempt,
      isBlocking: this.state === 'OPEN' && Date.now() < this.nextAttempt
    };
  }

  reset() {
    this.failureCount = 0;
    this.state = 'CLOSED';
    this.nextAttempt = Date.now();
    console.log(`🔄 Circuit breaker manually reset`);
  }
}

// Global circuit breakers for different services
const circuitBreakers = {
  instagram: new CircuitBreaker({
    failureThreshold: 2,
    recoveryTimeout: 300000, // 5 minutes
    monitoringTimeout: 30000  // 30 seconds
  }),
  
  backendSync: new CircuitBreaker({
    failureThreshold: 2,
    recoveryTimeout: 300000, // 5 minutes
    monitoringTimeout: 60000  // 1 minute
  }),
  
  automation: new CircuitBreaker({
    failureThreshold: 3,
    recoveryTimeout: 180000, // 3 minutes
    monitoringTimeout: 30000  // 30 seconds
  })
};

export { CircuitBreaker, circuitBreakers };

// Utility functions for common use cases
export const withCircuitBreaker = (serviceName, fn, fallback) => {
  const breaker = circuitBreakers[serviceName];
  if (!breaker) {
    console.warn(`Unknown circuit breaker service: ${serviceName}`);
    return fn();
  }
  
  return breaker.call(fn, fallback);
};

export const getCircuitBreakerStatus = (serviceName) => {
  const breaker = circuitBreakers[serviceName];
  return breaker ? breaker.getState() : null;
};

export const resetCircuitBreaker = (serviceName) => {
  const breaker = circuitBreakers[serviceName];
  if (breaker) {
    breaker.reset();
  }
};
