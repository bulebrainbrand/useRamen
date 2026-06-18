import { describe, it, expect } from "vite-plus/test";
import { toFetchOption } from "./utils.ts";
import type { FetchOption } from "ramen-core";

describe("toFetchOption", () => {
  it("return valid fetch option", () => {
    expect(toFetchOption(1000, 3)).toStrictEqual({ timeout: 1000, retry: 3 } satisfies FetchOption);
  });
  it("default retry is 2", () => {
    expect(toFetchOption(1000)).toStrictEqual({ timeout: 1000, retry: 2 } satisfies FetchOption);
  });
  it("default timeout is 5000", () => {
    expect(toFetchOption(undefined, 3)).toStrictEqual({
      timeout: 5000,
      retry: 3,
    } satisfies FetchOption);
  });
  it("return valid fetch option when every arg is undefined", () => {
    expect(toFetchOption()).toStrictEqual({ timeout: 5000, retry: 2 } satisfies FetchOption);
  });
});
