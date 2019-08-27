import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';

function Products() {
  const { loading, error, data } = useQuery(gql`
    {
      cart {
        id
        name
        price
      }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <ul>
      {
        data.cart.map(({id, name}) => (
          <li key={id}>{name}</li>
        ))
      }
    </ul>
  );
}

export default function App() {
  return <Products />;
}
