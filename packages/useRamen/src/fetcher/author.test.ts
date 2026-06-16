import { describe, it, vi, expect, beforeEach } from "vite-plus/test";
import type { Author, FetchError, FetchSuccess } from "./types.ts";
vi.mock("./fetcher.ts", () => {
  return {
    fetchData: vi.fn(),
  };
});
import { fetchData } from "./fetcher.ts";
describe("test fetch author", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("when success return Author", async () => {
    const targetAuthor: Author = { id: "bob", name: "bob-name", url: "https://exapmle.com/bob" };
    vi.mocked(fetchData).mockReturnValue(
      Promise.resolve({
        ok: true,
        value: { author: targetAuthor },
      }),
    );
    const { fetchAuthor } = await import("./author.ts");
    const result = await fetchAuthor("bob", { timeout: 1, retry: 1 });
    expect(result.ok).toBe(true);
    expect((result as FetchSuccess<Author>).value).toBe(targetAuthor);
  });

  it("when failed return FetchFailed", async () => {
    vi.mocked(fetchData).mockReturnValue(
      Promise.resolve({
        ok: false,
        error: 0,
      }),
    );
    const { fetchAuthor } = await import("./author.ts");
    const result = await fetchAuthor("bob", { timeout: 1, retry: 1 });
    expect(result.ok).toBe(false);
    expect((result as FetchError<number>).error).toBe(0);
  });
  it("when request 2 times return same promise", async () => {
    vi.mocked(fetchData).mockReturnValue(
      Promise.resolve({
        ok: true,
        value: { author: { id: "bob", name: "bob-name", url: "https://exapmle.com/bob" } },
      }),
    );
    const { fetchAuthor } = await import("./author.ts");
    const promise1 = fetchAuthor("bob", { timeout: 1, retry: 1 });
    const promise2 = fetchAuthor("bob", { timeout: 1, retry: 1 });
    expect(promise1).toBe(promise2);
  });
  it("when request 2 times return cache", async () => {
    vi.mocked(fetchData).mockReturnValue(
      Promise.resolve({
        ok: true,
        value: { author: { id: "bob", name: "bob-name", url: "https://exapmle.com/bob" } },
      }),
    );
    const { fetchAuthor } = await import("./author.ts");
    await fetchAuthor("bob", { timeout: 1, retry: 1 }); // should add cache when resolve promise
    await fetchAuthor("bob", { timeout: 1, retry: 1 }); // should return cache
    expect(vi.mocked(fetchData)).toHaveBeenCalledOnce();
  });
});
