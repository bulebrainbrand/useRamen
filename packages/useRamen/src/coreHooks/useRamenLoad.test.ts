import { renderHook, waitFor } from "@testing-library/react";
import { Fetcher, FetchState, useRamenLoad } from "./useRamenLoad.ts";
import { vi, expect, it, Mock, describe } from "vite-plus/test";
import { FetchResult } from "ramen-core";
describe("useRamenLoad test", () => {
  describe("when success", () => {
    it("state should be 'success' and expect value to be returned func value", async () => {
      const mockedFunc: Mock<() => Promise<FetchResult<string, never>>> = vi.fn(() =>
        Promise.resolve({ ok: true, value: "fetched value" }),
      );

      const arg: [] = [];
      const { result } = renderHook(() => useRamenLoad(mockedFunc, arg));
      expect(result.current).toEqual({ state: "loading" } satisfies FetchState<string, never>);
      await waitFor(() => {
        expect(result.current).toEqual({ state: "success", value: "fetched value" });
      });
      expect(mockedFunc).toHaveBeenCalledWith();
    });
  });
  describe("when failed", () => {
    it("state should be 'failed' and expect error to be returned func error", async () => {
      const mockedFunc: Mock<() => Promise<FetchResult<never, number>>> = vi.fn(() =>
        Promise.resolve({ ok: false, error: 404 }),
      );

      const arg: [] = [];
      const { result } = renderHook(() => useRamenLoad(mockedFunc, arg));
      expect(result.current).toEqual({ state: "loading" } satisfies FetchState<never, number>);
      await waitFor(() => {
        expect(result.current).toEqual({ state: "failed", error: 404 } satisfies FetchState<
          never,
          number
        >);
      });
      expect(mockedFunc).toHaveBeenCalledWith();
    });
  });
  describe("reaction check", () => {
    it("when change args,refetch", async () => {
      const fetcher = vi.fn((id: string) => {
        if (id === "shop-1") return Promise.resolve({ ok: true, value: "shop-1-data" } as const);
        return Promise.resolve({ ok: true, value: "shop-2-data" } as const);
      });

      const { result, rerender } = renderHook((arg) => useRamenLoad(fetcher, arg), {
        initialProps: ["shop-1"] as [string],
      });

      await waitFor(() => {
        expect(result.current).toEqual({ state: "success", value: "shop-1-data" });
      });
      rerender(["shop-2"]);
      expect(result.current).toEqual({ state: "loading" });

      await waitFor(() => {
        expect(result.current).toEqual({ state: "success", value: "shop-2-data" });
      });

      expect(fetcher).toHaveBeenCalledTimes(2);
    });

    it("when change arg (as pointer) but same value, do not refetch", async () => {
      const fetcher = vi.fn((_id: string) => Promise.resolve({ ok: true, value: "data" } as const));

      const { result, rerender } = renderHook((arg) => useRamenLoad(fetcher, arg), {
        initialProps: ["shop-1"] as [string],
      });

      await waitFor(() => {
        expect(result.current).toEqual({ state: "success", value: "data" });
      });

      rerender(["shop-1"]);

      await waitFor(() => {
        expect(fetcher).toHaveBeenCalledTimes(1);
      });
    });
    it("non throw when resolve after unmount", async () => {
      let resolvePromise: (v: any) => void;
      const fetcher = vi.fn(
        () =>
          new Promise((resolve) => {
            resolvePromise = resolve;
          }),
      );
      const arg = ["shop-1"] as const;
      const { unmount } = renderHook(() =>
        useRamenLoad(fetcher as Fetcher<string, unknown, [string]>, arg),
      );

      unmount();
      resolvePromise!({ ok: true, value: "data" });

      await new Promise((r) => setTimeout(r, 0));
      expect(fetcher).toHaveBeenCalledTimes(1);
    });
  });
});
