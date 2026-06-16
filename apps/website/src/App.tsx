import { useState } from "react";
import { useShops } from "useRamen";
export default function App() {
  return <ShopIterateLongComponent></ShopIterateLongComponent>;
}

function ShopIterateLongComponent() {
  const [index, setIndex] = useState(0);
  const onClick = () => setIndex(index + 1);
  const shopFetchState = useShops((index % 2) + 1, 50);
  if (shopFetchState.state === "loading") return <p>loading</p>;
  if (shopFetchState.state === "failed") return <p>failed fetch data</p>;
  return (
    <p onClick={onClick}>
      {shopFetchState.value.shops.map((value) => value.name).join("\n") + "です"}
    </p>
  );
}
