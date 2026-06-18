/**
 * @module
 * レンゲではない
 */

import { useRamenLoad, type FetchState } from "../coreHooks/useRamenLoad.ts";
import { type Shop } from "ramen-core";
import { fetchShopsRange } from "../primitiveFuncWapper/index.ts";

/**
 *
 * @param start - zero index
 * @param length - same Array length. e.g. if set 2,return [Shop,Shop]
 * @param timeout
 * @param retry
 */
export function useShopsRange(
  start: number,
  length: number,
  prefecture?: string,
  timeout?: number,
  retry?: number,
): FetchState<Shop[], [number | false, number | false]> {
  return useRamenLoad(fetchShopsRange, [start, length, prefecture, timeout, retry]);
}
