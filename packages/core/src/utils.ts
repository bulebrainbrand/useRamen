import type { FetchError, FetchResult, FetchSuccess } from "./types.ts";

export const Ok = <T>(value: T): FetchSuccess<T> => ({ ok: true, value });

export const Err = <T>(error: T): FetchError<T> => ({ ok: false, error });

export const match = <T, E, ToT = T, ToE = E>(
  result: FetchResult<T, E>,
  func: { ok: (value: T) => ToT; err: (error: E) => ToE },
): FetchSuccess<ToT> | FetchError<ToE> => {
  if (result.ok) {
    return Ok(func.ok(result.value));
  } else {
    return Err(func.err(result.error));
  }
};
