import { useMemo } from "react";
import { fetchShop } from "../fetcher/shop.ts";
import { useRamenLoad } from "./useRamenLoad.ts";
import { toFetchOption } from "../fetcher/utils.ts";

export function useShop(id: string, timeout?: number, retry?: number) {
  const args = useMemo(() => [id, toFetchOption(timeout, retry)] as const, [id, timeout, retry]);
  return useRamenLoad(fetchShop, args);
}
