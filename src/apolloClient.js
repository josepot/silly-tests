import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

export default new ApolloClient({
  cache: new InMemoryCache(),
  typeDefs: typeDefs,
  resolvers: resolvers
});
