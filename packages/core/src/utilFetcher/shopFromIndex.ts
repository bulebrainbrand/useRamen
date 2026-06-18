import { fetchShops } from "../fetcher/shops.ts";
import type { FetchOption, FetchResult, Shop } from "../types.ts";
import { match } from "../utils.ts";

export const fetchShopFromIndex = async (
  shopOption: { index: number; prefecture?: string },
  fetchOption: FetchOption,
): Promise<FetchResult<Shop>> => {
  const query = {
    page: shopOption.index + 1,
    perPage: 1,
    prefecture: shopOption.prefecture,
  };
  const result = await fetchShops(query, fetchOption);
  return match(result, {
    ok(value) {
      return value.shops[0];
    },
    err(error) {
      return error;
    },
  });
};
