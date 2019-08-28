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

  extend type Product {
    count: Int!
  }

  extend type Query {
    productsByDate: [DateProducts]!
  }

  type Mutation {
    changeProductAmount(productId: ID!, amount: Int): [Product]!
  }
`;

export default [server, client];
