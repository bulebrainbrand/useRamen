import { useRamenLoad, type FetchState } from "../coreHooks/useRamenLoad.ts";
import { fetchShopsSlice } from "../primitiveFuncWapper/index.ts";
import { type Shop } from "ramen-core";

export function useShopsSlice(
  start: number,
  end: number,
  prefecture?: string,
  timeout?: number,
  retry?: number,
): FetchState<Shop[], [number | false, number | false]> {
  return useRamenLoad(fetchShopsSlice, [start, end, prefecture, timeout, retry]);
}
