import React from "react";
import Counter from "./Counter";
import { useSetProductAmount } from "../products-amount";
import useProducts from "./useProducts";

export default function ProductsList() {
  const { products, loading, error } = useProducts();
  const productSetter = useSetProductAmount();

  if (loading) return "Loading";
  if (error) return "Error";

  return (
    <>
      <ul>
        {products.map(({ id, name, price, amount }) => (
          <li key={id}>
            {name} - {price}E -{" "}
            <Counter
              count={amount}
              onUpVote={() => productSetter(id, amount + 1)}
              onDownVote={() => productSetter(id, amount - 1)}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
