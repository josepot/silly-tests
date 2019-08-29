import React from "react";
import Counter from "./Counter";
import ProductsLoader from "./ProductsLoader";
import { useSetProductAmount } from "../products-amount";

function Products({ products }) {
  const productSetter = useSetProductAmount();
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

export default () => <ProductsLoader Component={Products} />;
