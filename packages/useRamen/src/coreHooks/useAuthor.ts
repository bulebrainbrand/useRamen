import { useRamenLoad } from "./useRamenLoad.ts";
import { fetchAuthor } from "../primitiveFuncWapper/index.ts";

export function useAuthor(id: string, timeout?: number, retry?: number) {
  return useRamenLoad(fetchAuthor, [id, timeout, retry]);
}
