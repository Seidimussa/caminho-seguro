class ImageCache {
  constructor() {
    this.cache = new Map();
    this.preloadQueue = new Set();
    this.maxCacheSize = 100;
  }

  async preload(src) {
    if (this.cache.has(src) || this.preloadQueue.has(src)) {
      return Promise.resolve();
    }

    this.preloadQueue.add(src);

    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        this.cache.set(src, {
          url: src,
          loaded: true,
          timestamp: Date.now()
        });
        this.preloadQueue.delete(src);
        this.cleanup();
        resolve();
      };

      img.onerror = () => {
        this.preloadQueue.delete(src);
        reject(new Error(`Failed to load image: ${src}`));
      };

      img.src = src;
    });
  }

  isCached(src) {
    return this.cache.has(src);
  }

  async preloadBatch(urls) {
    const promises = urls.map(url => this.preload(url).catch(() => null));
    return Promise.allSettled(promises);
  }

  cleanup() {
    if (this.cache.size <= this.maxCacheSize) return;

    const entries = Array.from(this.cache.entries());
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
    
    const toDelete = entries.slice(0, entries.length - this.maxCacheSize);
    toDelete.forEach(([key]) => this.cache.delete(key));
  }
}

export const imageCache = new ImageCache();