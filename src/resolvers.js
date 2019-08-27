import { getProducts } from './api';
import gql from 'graphql-tag';

const serverResolvers = {
  Query: {
    cart: () => getProducts().then(
      res => Object.values(res).map(product => ({
        __typename: 'Product',
        ...product,
      }))
    ),
  },
}

const clientResolvers = {
  Query: {
    productsByDate: (_, __, {cache}) => {
      const stuff = cache.readQuery({
        query: gql`query GetCartItems {
          cart {
            id
            name
            price
            dateOfArrival
          }
        }
        `
      });

      return Object.values(stuff.cart.reduce(
        (result, product) => {
          const {dateOfArrival, price} = product;
          if (!result[dateOfArrival]) {
            result[dateOfArrival] = {
              __typename: 'DateProducts',
              date: dateOfArrival,
              totalAmount: 0,
              products: [],
            };
          }
          result[dateOfArrival].totalAmount += price;
          result[dateOfArrival].products.push(product);
          return result;
        },
        {}
      ));
    },
  }
}

export default [serverResolvers, clientResolvers];
