import NodeCache from 'node-cache';
import { cacheConfig } from '../config/cache.config';

class CacheService {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache({
      stdTTL: cacheConfig.stdTTL,
      checkperiod: cacheConfig.checkperiod,
      maxKeys: cacheConfig.maxKeys
    });
  }

  get<T>(key: string): T | undefined {
    return this.cache.get<T>(key);
  }

  set<T>(key: string, value: T): boolean {
    return this.cache.set(key, value);
  }
}

export const cacheService = new CacheService();