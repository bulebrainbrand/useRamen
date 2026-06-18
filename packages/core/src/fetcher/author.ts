import { AuthorCache } from "../cache/authorCache.ts";
import { ConcurrentPromiseManager } from "../concurrentPromiseManager.ts";
import { AUTHOR_URL } from "./contants.ts";
import { fetchData } from "./fetcher.ts";
import type { Author, AuthorResult, FetchOption, FetchResult } from "../types.ts";
import { Ok } from "../utils.ts";
const authorFetchManager = new ConcurrentPromiseManager<FetchResult<Author>>();
export const fetchAuthor = (
  authorId: string,
  fetchOption: FetchOption,
): Promise<FetchResult<Author>> => {
  if (AuthorCache.get(authorId)) {
    return Promise.resolve(Ok(AuthorCache.get(authorId)!));
  }
  return updateAuthorCache(authorId, fetchOption);
};

const updateAuthorCache = (
  authorId: string,
  fetchOption: FetchOption,
): Promise<FetchResult<Author>> => {
  if (authorFetchManager.has(authorId)) return authorFetchManager.get(authorId)!;
  const url = generateAuthorURL(authorId);
  const promise = fetchData<AuthorResult>(url, fetchOption)
    .then((result) => (result.ok ? Ok(result.value.author) : result))
    .then((result) => {
      if (result.ok) AuthorCache.add(result.value);
      return result;
    });
  authorFetchManager.register(authorId, promise);
  return promise;
};

const generateAuthorURL = (id: string): string => {
  return AUTHOR_URL + id;
};
