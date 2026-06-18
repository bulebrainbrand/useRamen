import { type FetchState } from "../coreHooks/index.ts";
import { useRamenLoad } from "../coreHooks/useRamenLoad.ts";
import { type Shop } from "ramen-core";
import { fetchShopFromIndex } from "../primitiveFuncWapper/index.ts";
/**
 *
 * @param index - zero-index
 * @param prefecture - filter e.g. "神奈川県"
 * @param timeout - fetch timeout number
 * @param retry - fetch retry times
 * @returns {FetchState<Shop>}
 *
 * @example
 * show next shop on click
 * ```ts
 * import { useShopFromIndex } from "useRamen"
 * import { useState } from "react"
 * function ShopIterateComponent (){
 *   const [ index, setIndex ] = useState(0)
 *   const onClick = () => setIndex(index + 1)
 *   const shopFetchState = useShopFromIndex(index)
 *   if(shopFetchState.state === "loading")return <p>loading</p>
 *   if(shopFetchState.state === "failed")return <p>failed fetch data</p>
 *   return <p onClick={onClick}>{shopFetchState.value.name}</p>
 * }
 * ```
 */
export function useShopFromIndex(
  index: number,
  prefecture?: string,
  timeout?: number,
  retry?: number,
): FetchState<Shop, number> {
  return useRamenLoad(fetchShopFromIndex, [index, prefecture, timeout, retry]);
}
