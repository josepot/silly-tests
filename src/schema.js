import { makeExecutableSchema } from 'graphql-tools/dist/makeExecutableSchema';
import gql from 'graphql-tag';
import resolvers from './resolvers';

const typeDefs = gql`
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

export default makeExecutableSchema({typeDefs, resolvers});
