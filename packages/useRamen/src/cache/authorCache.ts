import type { Author, Photo } from "../fetcher/types.ts";

export const AuthorCache = new (class {
  cache: Partial<Record<string, { time: number; data: Author }>> = {};

  get(authorId: string): Author | undefined {
    return this.cache[authorId]?.data;
  }
  add(author: Author): void {
    this.cache[author.id] = { data: author, time: Date.now() };
  }

  addFromPhoto(photo: Photo) {
    if (photo.author) this.add(photo.author);
  }

  addFromPhotos(photos: Photo[]) {
    for (const photo of photos) {
      this.addFromPhoto(photo);
    }
  }
})();
