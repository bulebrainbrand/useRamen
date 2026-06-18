import type { Shops } from "../types.ts";

export type ShopsId = string;

export const ShopsCache = new (class {
  cache: Partial<Record<string, { time: number; data: Shops }>> = {};
  get(shopsId: ShopsId): Shops | undefined {
    return this.cache[shopsId]?.data;
  }
  add(id: ShopsId, value: Shops): void {
    this.cache[id] = { data: value, time: Date.now() };
  }

  has(shopsId: ShopsId) {
    return Object.hasOwn(this.cache, shopsId);
  }
})();
