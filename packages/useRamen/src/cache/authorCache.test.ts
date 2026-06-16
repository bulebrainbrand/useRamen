import { describe, expect, beforeEach, vi, it } from "vite-plus/test";
import type { Author, Photo } from "../fetcher/types.ts";

describe("test authotCache", () => {
  beforeEach(() => {
    vi.resetModules();
  });
  it("return cache data", async () => {
    const { AuthorCache } = await import("./authorCache.ts");
    const targetAuthor: Author = { id: "bob", name: "bob bob", url: "https://example.com/bob" };
    AuthorCache.add(targetAuthor);
    expect(AuthorCache.get("bob")).toBe(targetAuthor);
  });
  it("if not exists cache,return undefined", async () => {
    const { AuthorCache } = await import("./authorCache.ts");
    expect(AuthorCache.get("non-added-name")).toBeUndefined();
  });
  it("add from photo,cache author", async () => {
    const { AuthorCache } = await import("./authorCache.ts");
    const targetAuthor: Author = { id: "bob", name: "bob bob", url: "https://example.com/bob" };
    const photo: Photo = {
      name: "cool-image",
      url: "https://example.com/image/cool-image",
      width: 480,
      height: 480,
      author: targetAuthor,
    };
    AuthorCache.addFromPhoto(photo);
    expect(AuthorCache.get("bob")).toBe(targetAuthor);
  });
  it("add from photos,cache author", async () => {
    const { AuthorCache } = await import("./authorCache.ts");
    const targetAuthor: Author = { id: "bob", name: "bob bob", url: "https://example.com/bob" };
    const photos: Photo[] = [
      {
        name: "cool-image",
        url: "https://example.com/image/cool-image",
        width: 480,
        height: 480,
        author: targetAuthor,
      },
    ];
    AuthorCache.addFromPhotos(photos);
    expect(AuthorCache.get("bob")).toBe(targetAuthor);
  });
  it("not throw when author is undefined", async () => {
    const { AuthorCache } = await import("./authorCache.ts");
    const photos: Photo[] = [
      {
        name: "cool-image",
        url: "https://example.com/image/cool-image",
        width: 480,
        height: 480,
      },
    ];
    AuthorCache.addFromPhotos(photos);
  });
});
