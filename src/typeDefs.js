import gql from 'graphql-tag';

const server = gql`
  type Product {
    id: ID!
    name: String!,
    price: Float!
    dateOfArrival: String!
  }

  type Query {
    cart: [Product]!
  }
`;

const client = gql`
  type DateProducts {
    date: String
    totalAmount: Float
    products: [Product!]!
  }

  extend type Query {
    productsByDate: [DateProducts]!
  }
`;

export default [server, client];
