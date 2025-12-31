export const cacheConfig = {
  stdTTL: 3600, // Keep data for 1 hour (3600 seconds)
  checkperiod: 600, // Clean up expired keys every 10 minutes
  maxKeys: 100 // Prevent memory leaks by limiting cache size
};