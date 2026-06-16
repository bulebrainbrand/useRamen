import { useEffect, useState } from "react";
import type { FetchResult } from "../fetcher/index.ts";

export type Fetcher<T, Arg extends Array<unknown>> = (...arg: Arg) => Promise<FetchResult<T>>;

export type FetchState<T> =
  | {
      state: "loading";
    }
  | { state: "failed"; error: number }
  | { state: "success"; value: T };

export function useRamenLoad<T, Arg extends Array<unknown>>(
  fetcher: Fetcher<T, Arg>,
  args: Readonly<Arg>,
) {
  const [fetchState, setFetchState] = useState<FetchState<T>>({ state: "loading" });
  useEffect(() => {
    let cancelled = false;
    setFetchState({ state: "loading" });
    void fetcher(...args).then((result) => {
      if (cancelled) return;

      if (result.ok) {
        setFetchState({ state: "success", value: result.value });
      } else {
        setFetchState({ state: "failed", error: result.error });
      }
    });
    return () => {
      cancelled = true;
    };
  }, [fetcher, args]);
  return fetchState;
}
