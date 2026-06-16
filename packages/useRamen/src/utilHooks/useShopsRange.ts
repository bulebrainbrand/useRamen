/**
 * @module
 * レンゲではない
 */

import type { FetchState } from "../coreHooks/useRamenLoad.ts";
import { useShops } from "../coreHooks/useShops.ts";
import type { Shop } from "../fetcher/index.ts";

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
): FetchState<Shop[]> {
  const pageIndex = Math.floor(start / length);
  const shopsOffset = start - pageIndex * length;

  const state1 = useShops(pageIndex + 1, length, prefecture, timeout, retry);
  const state2 = useShops(pageIndex + 2, length, prefecture, timeout, retry); // pageIndexは0-indexなのでuseShopsの求める1-indexのためにoffsetで+1,さらに次のページが欲しいので+1している

  if (state1.state !== "success") return state1;
  if (state2.state !== "success") return state2;

  const merged = [...state1.value.shops, ...state2.value.shops];
  return { state: "success", value: merged.slice(shopsOffset, shopsOffset + length) };
}
