import { useRamenLoad } from "./useRamenLoad.ts";
import { fetchShops } from "../primitiveFuncWapper/index.ts";

export function useShops(
  page: number,
  perPage?: number,
  prefecture?: string,
  timeout?: number,
  retry?: number,
) {
  return useRamenLoad(fetchShops, [page, perPage, prefecture, timeout, retry]);
}
