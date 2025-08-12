import { useCallback, useRef, useEffect } from 'react';

/**
 * Hook to prevent memory leaks from useEffect and intervals
 */
export const useSafeEffect = (effect, deps) => {
  const isMountedRef = useRef(true);
  
  useEffect(() => {
    if (isMountedRef.current) {
      return effect();
    }
  }, deps);
  
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  
  return isMountedRef;
};

/**
 * Hook to safely manage intervals
 */
export const useSafeInterval = (callback, delay) => {
  const intervalRef = useRef(null);
  const savedCallback = useRef(callback);
  const isMountedRef = useSafeEffect(() => {}, []);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null && isMountedRef.current) {
      intervalRef.current = setInterval(() => {
        if (isMountedRef.current) {
          savedCallback.current();
        }
      }, delay);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [delay, isMountedRef]);

  const clearInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  return clearInterval;
};

/**
 * Hook to debounce function calls
 */
export const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null);
  const isMountedRef = useSafeEffect(() => {}, []);

  const debouncedCallback = useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (isMountedRef.current) {
        callback(...args);
      }
    }, delay);
  }, [callback, delay, isMountedRef]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
};

/**
 * Hook to throttle function calls
 */
export const useThrottle = (callback, delay) => {
  const lastCallRef = useRef(0);
  const isMountedRef = useSafeEffect(() => {}, []);

  const throttledCallback = useCallback((...args) => {
    const now = Date.now();
    
    if (now - lastCallRef.current >= delay && isMountedRef.current) {
      lastCallRef.current = now;
      callback(...args);
    }
  }, [callback, delay, isMountedRef]);

  return throttledCallback;
};

export default {
  useSafeEffect,
  useSafeInterval,
  useDebounce,
  useThrottle
};
