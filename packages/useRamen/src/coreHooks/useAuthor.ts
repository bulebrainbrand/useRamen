import { useMemo } from "react";
import { useRamenLoad } from "./useRamenLoad.ts";
import { fetchAuthor } from "../fetcher/author.ts";
import { toFetchOption } from "../fetcher/utils.ts";

export function useAuthor(id: string, timeout?: number, retry?: number) {
  const args = useMemo(() => [id, toFetchOption(timeout, retry)] as const, [id, timeout, retry]);
  return useRamenLoad(fetchAuthor, args);
}
