import type { Shop, Shops } from "../fetcher/types.ts";
import { AuthorCache } from "./authorCache.ts";
import { ShopCache } from "./shopCache.ts";
import { ShopsCache, type ShopsId } from "./shopsCache.ts";

export const CacheManager = {
  addShopsCache(shopsId: ShopsId, shops: Shops) {
    ShopsCache.add(shopsId, shops);
    ShopCache.addFromShops(shops.shops);
    for (const shop of shops.shops) AuthorCache.addFromPhotos(shop.photos ?? []);
  },
  addShopCache(shop: Shop) {
    ShopCache.add(shop);
    AuthorCache.addFromPhotos(shop.photos ?? []);
  },
} as const;

export * from "./shopCache.ts";
export * from "./authorCache.ts";
