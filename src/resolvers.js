import { getProducts } from "./api";

const serverResolvers = {
  Query: {
    cart: () =>
      getProducts().then(res =>
        Object.values(res).map(product => ({
          __typename: "Product",
          ...product
        }))
      )
  }
};

const clientResolvers = {};

export default [serverResolvers, clientResolvers];
