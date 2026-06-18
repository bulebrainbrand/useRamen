import type { FetchOption, FetchResult, Shop } from "../types.ts";
import { fetchShopsRange } from "./shopsRange.ts";

export const fetchShopsSlice = async (
  { start, end, prefecture }: { start: number; end: number; prefecture?: string },
  fetchOption: FetchOption,
): Promise<FetchResult<Shop[], [number | false, number | false]>> => {
  if (start < 0) throw new TypeError("start must be >= 0");
  if (end < 0) throw new TypeError("end must be >= 0");
  if (start > end) throw new TypeError("cannot start > end");
  const length = end - start;
  return fetchShopsRange({ start, length, prefecture }, fetchOption);
};
