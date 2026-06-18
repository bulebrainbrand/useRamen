# UseRamen

react hook for fetching Ramen

## Usage

```ts
import { useShop } from "useramen"
export default function ShopName({id}:{id:string}){
    const result = useShop(id)
    if(result.state === "loading")return <p>loading</p>
    if(result.state === "failed")return <p>failed</p>
    return <p>{result.value.name}</p>
}
```
