/**
 * Loading manager for tracking axios requests
 * This can be used outside of React components
 */
class LoadingManager {
  constructor() {
    this.loadingCount = 0;
    this.listeners = new Set();
  }

  start() {
    this.loadingCount++;
    this.notifyListeners();
  }

  stop() {
    this.loadingCount = Math.max(0, this.loadingCount - 1);
    this.notifyListeners();
  }

  isLoading() {
    return this.loadingCount > 0;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach((listener) => listener(this.isLoading()));
  }
}

export const loadingManager = new LoadingManager();

