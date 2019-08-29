import React from "react";
import ProductsLoader from "./ProductsLoader";

const fromCartToGrouppedProducts = cart =>
  Object.values(
    cart.reduce((result, product) => {
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

export function ProductsByDate({ products }) {
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

export default () => <ProductsLoader Component={ProductsByDate} />;
