import { useQuery } from "@apollo/react-hooks";
import GET_CART_ITEMS from "../queries/GetCartItems";
import { useProductAmounts } from "../products-amount";

export default () => {
  const { loading, error, data } = useQuery(GET_CART_ITEMS);
  const productAmounts = useProductAmounts();

  if (loading || error) return { loading, error };

  const products = data.cart
    .map(product => ({
      ...product,
      amount:
        productAmounts[product.id] === undefined
          ? 1
          : productAmounts[product.id]
    }))
    .filter(({ amount }) => amount > 0);

  return { loading, error, products };
};
