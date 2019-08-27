import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';

function Products() {
  const { loading, error, data } = useQuery(gql`{
          cart @client {
            id
            name
            price
            dateOfArrival
          }
        }
      `);

  if (loading) return <p>Loading...</p>;
  if (error) {
    return <p>Error :(((</p>;
  }

  return (
    <>
    <ul>
      {
        data.cart.map(({id, name, price}) => (
          <li key={id}>{name} - {price}E</li>
        ))
      }
    </ul>
    <ProductsByDate />
    </>
  );
}

function ProductsByDate() {
  const { loading, error, data } = useQuery(gql`
    {
      productsByDate @client {
        date
        totalAmount
        products {
          id,
          name
        }
      }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) {
    return <p>Error :(((</p>;
  }

  return (
    <ul>
      {
        data.productsByDate.map(({date, totalAmount, products}) => (
          <li key={date}>
              {date} - {totalAmount}
            <ul>
              {
                products.map(({id, name}) => (
                  <li key={id}>{name}</li>
                ))
              }
            </ul>
          </li>
        ))
      }
    </ul>
  );
}

export default function App() {
  return (
    <>
      <Products />
    </>
  );
}
