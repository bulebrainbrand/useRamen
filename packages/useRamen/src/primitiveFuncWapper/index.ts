import * as Ramen from "ramen-core";
import { toFetchOption } from "../utils.ts";
export const fetchShop = (shopId: string, timeout?: number, retry?: number) => {
  return Ramen.fetchShop(shopId, toFetchOption(timeout, retry));
};

export const fetchShops = (
  page: number,
  perPage?: number,
  prefecture?: string,
  timeout?: number,
  retry?: number,
) => {
  return Ramen.fetchShops({ page, perPage, prefecture }, toFetchOption(timeout, retry));
};

export const fetchAuthor = (authorId: string, timeout?: number, retry?: number) => {
  return Ramen.fetchAuthor(authorId, toFetchOption(timeout, retry));
};

export const fetchShopFromIndex = (
  index: number,
  prefecture?: string,
  timeout?: number,
  retry?: number,
) => {
  return Ramen.fetchShopFromIndex({ index, prefecture }, toFetchOption(timeout, retry));
};

export const fetchShopsRange = (
  start: number,
  length: number,
  prefecture?: string,
  timeout?: number,
  retry?: number,
) => {
  return Ramen.fetchShopsRange({ start, length, prefecture }, toFetchOption(timeout, retry));
};

export const fetchShopsSlice = (
  start: number,
  end: number,
  prefecture?: string,
  timeout?: number,
  retry?: number,
) => {
  return Ramen.fetchShopsSlice({ start, end, prefecture }, toFetchOption(timeout, retry));
};
