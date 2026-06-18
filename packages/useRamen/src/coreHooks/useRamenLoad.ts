import { useEffect, useState } from "react";
import type { FetchResult } from "ramen-core";
import type { Primitive } from "../utils.ts";

export type Fetcher<T, E, Arg extends Array<Primitive>> = (
  ...arg: Arg
) => Promise<FetchResult<T, E>>;

export type FetchState<T, E> =
  | {
      state: "loading";
    }
  | { state: "failed"; error: E }
  | { state: "success"; value: T };

export function useRamenLoad<T, E, Arg extends Array<Primitive>>(
  fetcher: Fetcher<T, E, Arg>,
  args: Readonly<Arg>,
) {
  const [fetchState, setFetchState] = useState<FetchState<T, E>>({ state: "loading" });
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
  }, [fetcher, ...args]);
  return fetchState;
}
