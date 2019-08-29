import React from "react";
import useProducts from "./useProducts";

const fromCartToGrouppedProducts = products =>
  Object.values(
    products.reduce((result, product) => {
      const { dateOfArrival, price, amount } = product;
      if (!result[dateOfArrival]) {
        result[dateOfArrival] = {
          date: dateOfArrival,
          totalAmount: 0,
          products: []
        };
      }
      result[dateOfArrival].totalAmount += price * amount;
      result[dateOfArrival].products.push(product);
      return result;
    }, {})
  ).map(({ totalAmount, ...rest }) => ({
    ...rest,
    totalAmount: totalAmount.toFixed(2)
  }));

export default function ProductsByDate() {
  const { products, loading, error } = useProducts();

  if (loading) return "Loading";
  if (error) return "Error";

  return (
    <ul>
      {fromCartToGrouppedProducts(products).map(
        ({ date, totalAmount, products }) => (
          <li key={date}>
            {date} - {totalAmount}
            <ul>
              {products.map(({ id, name }) => (
                <li key={id}>{name}</li>
              ))}
            </ul>
          </li>
        )
      )}
    </ul>
  );
}
