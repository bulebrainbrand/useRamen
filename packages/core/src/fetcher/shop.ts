import { ShopCache } from "../cache/shopCache.ts";
import { SHOP_URL } from "./contants.ts";
import type { FetchOption, FetchResult, Shop, ShopResult } from "../types.ts";
import { ConcurrentPromiseManager } from "../concurrentPromiseManager.ts";
import { fetchData } from "./fetcher.ts";
import { Ok } from "../utils.ts";
import { CacheManager } from "../cache/index.ts";

const shopFetchManager = new ConcurrentPromiseManager<FetchResult<Shop>>();

export const fetchShop = async (
  shopId: string,
  option: FetchOption,
): Promise<FetchResult<Shop, number>> => {
  if (ShopCache.has(shopId)) {
    return { ok: true, value: ShopCache.get(shopId)! };
  }
  return updateShopCache(shopId, option);
};

const updateShopCache = async (
  shopId: string,
  option: FetchOption,
): Promise<FetchResult<Shop, number>> => {
  if (shopFetchManager.has(shopId)) return shopFetchManager.get(shopId)!;
  const url = generateShopURL(shopId);
  const promise = fetchData<ShopResult>(url, option)
    .then((result) => (result.ok ? Ok(result.value.shop) : result)) // Promise<FetchResult<ShopResult>> -> Promise<FetchResult<Shop>>
    .then((result) => {
      if (result.ok) {
        CacheManager.addShopCache(result.value);
      }
      return result;
    });
  shopFetchManager.register(shopId, promise);
  return promise;
};

const generateShopURL = (id: string): string => {
  return SHOP_URL + id;
};
