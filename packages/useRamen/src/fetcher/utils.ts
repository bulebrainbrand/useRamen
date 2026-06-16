import type { FetchError, FetchSuccess } from "./types.ts";

export const Ok = <T>(value: T): FetchSuccess<T> => ({ ok: true, value });

export const Err = <T>(error: T): FetchError<T> => ({ ok: false, error });

export const toFetchOption = (timeout: number = 5000, retry: number = 2) => {
  return { timeout, retry };
};
