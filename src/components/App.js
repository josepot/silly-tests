import React from "react";
import { Provider as ProductsAmountProvider } from "../products-amount";
import ProductsList from "./ProductsList";
import ProductsByDate from "./ProductsByDate";

export default function App() {
  return (
    <>
      <ProductsAmountProvider>
        <ProductsList />
        <ProductsByDate />
      </ProductsAmountProvider>
    </>
  );
}
