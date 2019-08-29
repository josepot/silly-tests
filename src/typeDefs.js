import gql from "graphql-tag";

const server = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
    dateOfArrival: String!
  }

  type Query {
    cart: [Product]!
  }
`;

export default [server];
