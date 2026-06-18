import type { Shop } from "../types.ts";

export const ShopCache = new (class {
  cache: Partial<Record<string, { time: number; data: Shop }>> = {};

  get(shopId: string): Shop | undefined {
    return this.cache[shopId]?.data;
  }
  add(value: Shop): void {
    this.cache[value.id] = { data: value, time: Date.now() };
  }
  addFromShops(value: Shop[]) {
    for (const shop of value) {
      this.add(shop);
    }
  }

  has(shopId: string) {
    return Object.hasOwn(this.cache, shopId);
  }
})();
