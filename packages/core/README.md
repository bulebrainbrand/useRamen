# ramen-core

util functions for [ramen-api](https://github.com/yusukebe/ramen-api)

## usage

```ts
import { fetchShop } from "ramen-core";

console.log(await fetchShop("<shopName>", { timeout: 5000 }));
```
