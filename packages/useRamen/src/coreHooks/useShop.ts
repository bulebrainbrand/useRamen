import { fetchShop } from "../primitiveFuncWapper/index.ts";
import { useRamenLoad } from "./useRamenLoad.ts";

export function useShop(id: string, timeout?: number, retry?: number) {
  return useRamenLoad(fetchShop, [id, timeout, retry]);
}
