import type { FetchResult } from "../types.ts";
import { CacheManager } from "../cache/index.ts";
import { ConcurrentPromiseManager } from "../concurrentPromiseManager.ts";
import { SHOPS_URL } from "./contants.ts";
import { fetchData } from "./fetcher.ts";
import type { FetchOption, Shops } from "../types.ts";
import { ShopsCache } from "../cache/shopsCache.ts";
import { Ok } from "../utils.ts";

const shopsFetchManager = new ConcurrentPromiseManager<FetchResult<Shops>>();

const shopsOptionToId = (shopsOption: ShopsOption) => {
  return `${shopsOption.page}$|$${shopsOption.perPage}$|$${shopsOption.prefecture}`;
};

export interface ShopsOption {
  page: number;
  perPage?: number;
  prefecture?: string;
}

export const fetchShops = (
  shopsOption: ShopsOption,
  fetchOption: FetchOption,
): Promise<FetchResult<Shops>> => {
  const page = shopsOption.page;
  const perPage = shopsOption.perPage ?? 10;
  const prefecture = shopsOption.prefecture ?? "";
  if (perPage <= 0 || perPage > 100 || !Number.isInteger(perPage)) {
    throw new TypeError(`'perPage' is expect 1 < n <= 100 but actual ${perPage}`);
  }
  const shopOptionId = shopsOptionToId(shopsOption);
  if (ShopsCache.has(shopOptionId)) return Promise.resolve(Ok(ShopsCache.get(shopOptionId)!));
  if (shopsFetchManager.has(shopOptionId)) return shopsFetchManager.get(shopOptionId)!;
  const url = generateShopsURL(page, perPage, prefecture);
  const promise = fetchData<Shops>(url, fetchOption).then((value) => {
    if (value.ok) {
      CacheManager.addShopsCache(shopOptionId, value.value);
    }
    return value;
  });
  shopsFetchManager.register(shopOptionId, promise);
  return promise;
};

const generateShopsURL = (page: number, perPage: number, prefecture: string): string => {
  const url = new URL(SHOPS_URL);
  url.searchParams.set("perPage", String(perPage));
  url.searchParams.set("page", String(page));
  url.searchParams.set("prefecture", prefecture);
  return url.toJSON();
};
