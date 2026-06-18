import type { FetchOption, FetchResult } from "../types.ts";
import { Err, Ok } from "../utils.ts";

export const fetchData = async <T>(
  url: string,
  option: FetchOption,
): Promise<FetchResult<T, number>> => {
  for (let i = option.retry - 1; i >= 0; i--) {
    try {
      const abort = new AbortController();
      const timeoutId = setTimeout(() => abort.abort(), option.timeout);
      const res = await fetch(url, { signal: abort.signal });
      clearTimeout(timeoutId);
      if (res.ok) return Ok((await res.json()) as T); // Use as,don't validate
      if (i === 0) return Err(res.status);
    } catch (error) {
      console.error("fetch:", url, error);
    }
  }
  return Err(0);
};
