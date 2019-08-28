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

export const GET_CART_ITEMS = gql`query GetCartItems {
          cart @client {
            id
            name
            price
            dateOfArrival
            count
          }
        }
        `

const clientResolvers = {
  Product: {
    count: ({count}) => count === undefined ? 1 : count,
  },
  Query: {
    productsByDate: (_, __, {cache}) => {
      const stuff = cache.readQuery({
        query: GET_CART_ITEMS
      });

      return Object.values(stuff.cart.reduce(
        (result, product) => {
          const {dateOfArrival, price, count} = product;
          if (!result[dateOfArrival]) {
            result[dateOfArrival] = {
              __typename: 'DateProducts',
              date: dateOfArrival,
              totalAmount: 0,
              products: [],
            };
          }
          result[dateOfArrival].totalAmount += (price * count * 100);
          result[dateOfArrival].products.push(product);
          return result;
        },
        {}
      )).map(({totalAmount, ...rest}) => ({
        ...rest,
        totalAmount: (totalAmount * 100) / 1000,
      }));
    },
  },
  Mutation: {
    changeProductAmount: (_, {productId, amount}, {client}) => {
      const data = client.readQuery({
        query: GET_CART_ITEMS,
      });
      const cart =
        amount < 1
          ? data.cart.filter(({id}) => id !== productId)
          : data.cart.map(product =>
              product.id === productId
                ? {...product, count: amount}
                : product
          );

      client.writeQuery({query: GET_CART_ITEMS, data: {...data, cart}})
      return cart;
    }
  },
}

export default [serverResolvers, clientResolvers];
