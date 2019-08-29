import gql from "graphql-tag";

export default gql`
  query GetCartItems {
    cart @client {
      id
      name
      price
      dateOfArrival
    }
  }
`;
