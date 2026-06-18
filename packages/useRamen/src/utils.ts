export const toFetchOption = (timeout: number = 5000, retry: number = 2) => {
  return { timeout, retry };
};

export type Primitive = number | string | boolean | null | undefined;
