import React from "react";
import { useQuery } from "@apollo/react-hooks";
import GET_CART_ITEMS from "../queries/GetCartItems";
import { useProductAmounts } from "../products-amount";

export default function ProductsLoader({ Component }) {
  const { loading, error, data } = useQuery(GET_CART_ITEMS);
  const productAmounts = useProductAmounts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const products = data.cart
    .map(product => ({
      ...product,
      amount:
        productAmounts[product.id] === undefined
          ? 1
          : productAmounts[product.id]
    }))
    .filter(({ amount }) => amount > 0);

  return <Component products={products} />;
}
