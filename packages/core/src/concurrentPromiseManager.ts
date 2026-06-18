export class ConcurrentPromiseManager<T> {
  promises: Partial<Record<string, Promise<T>>> = {};

  register(key: string, promise: Promise<T>) {
    if (this.promises[key]) return; // ignore
    void promise.finally(() => delete this.promises[key]);
    this.promises[key] = promise;
  }

  has(key: string): boolean {
    return Object.hasOwn(this.promises, key);
  }

  get(key: string): Promise<T> | undefined {
    return this.promises[key];
  }
}
