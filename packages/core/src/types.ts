export type Photo = {
  name: string;
  url: string;
  width: number;
  height: number;
  authorId?: string;
  author?: Author;
};

export type Shop = {
  id: string;
  name?: string;
  prefecture?: string;
  photos?: Photo[];
};

export type Author = {
  id: string;
  name: string;
  url: string;
};

export type Shops = {
  shops: Shop[];
  totalCount: number;
  pageInfo: pageInfo;
};

export type ShopResult = {
  shop: Shop;
};
export type AuthorResult = {
  author: Author;
};

type pageInfo = {
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number;
  currentPage: number;
  perPage: number;
};

export type FetchError<T> = {
  ok: false;
  error: T;
};

export type FetchSuccess<T> = {
  ok: true;
  value: T;
};

export type FetchResult<T = unknown, E = number> = FetchSuccess<T> | FetchError<E>;

export type FetchOption = {
  timeout: number;
  retry: number;
};
