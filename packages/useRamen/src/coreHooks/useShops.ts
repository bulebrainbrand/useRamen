import { useMemo } from "react";
import { useRamenLoad } from "./useRamenLoad.ts";
import { fetchShops } from "../fetcher/shops.ts";
import { toFetchOption } from "../fetcher/utils.ts";

export function useShops(
  page: number,
  perPage?: number,
  prefecture?: string,
  timeout?: number,
  retry?: number,
) {
  const args = useMemo(
    () => [{ page, perPage, prefecture }, toFetchOption(timeout, retry)] as const,
    [page, perPage, prefecture, timeout, retry],
  );
  return useRamenLoad(fetchShops, args);
}
