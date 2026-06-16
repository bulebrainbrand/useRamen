import type { FetchState } from "../coreHooks/useRamenLoad.ts";
import type { Shop } from "../fetcher/types.ts";
import { useShopsRange } from "./useShopsRange.ts";

export function useShopsSlice(
  start: number,
  end: number,
  prefecture?: string,
  timeout?: number,
  retry?: number,
): FetchState<Shop[]> {
  if (start < 0) throw new TypeError("start must be >= 0");
  if (end < 0) throw new TypeError("end must be >= 0");
  if (start > end) throw new TypeError("cannot start > end");
  const length = end - start;
  return useShopsRange(start, length, prefecture, timeout, retry);
}
