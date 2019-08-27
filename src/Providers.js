import React from "react";
import { ApolloProvider } from '@apollo/react-hooks';
import apolloClient from './apolloClient';

export default function Providers({ children }) {
  return (
    <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
  );
}
