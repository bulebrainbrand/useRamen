import { fetchShops } from "../fetcher/shops.ts";
import type { FetchOption, FetchResult, Shop } from "../types.ts";
import { Err, Ok } from "../utils.ts";

export const fetchShopsRange = async (
  { start, length, prefecture }: { start: number; length: number; prefecture?: string },
  fetchOption: FetchOption,
): Promise<FetchResult<Shop[], [number | false, number | false]>> => {
  const pageIndex = Math.floor(start / length);
  const shopsOffset = start - pageIndex * length;

  const result1 = await fetchShops(
    { page: pageIndex + 1, perPage: length, prefecture },
    fetchOption,
  );
  const result2 = await fetchShops(
    { page: pageIndex + 2, perPage: length, prefecture },
    fetchOption,
  ); // pageIndexは0-indexなのでuseShopsの求める1-indexのためにoffsetで+1,さらに次のページが欲しいので+1している

  if (result1.ok && result2.ok)
    return Ok(
      [...result1.value.shops, ...result2.value.shops].slice(shopsOffset, shopsOffset + length),
    );
  return Err([result1.ok ? false : result1.error, result2.ok ? false : result2.error]);
};
