import React from 'react';
import {useQuery, useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Counter from './Counter';
import {GET_CART_ITEMS} from './resolvers';

const PRODUCTS_BY_DATE = gql`
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
  `;

const CHANGE_PRODUCT_AMOUNT = gql`
  mutation ChangeProductAmount($id: ID!, $amount: Int!) {
    changeProductAmount(productId: $id, amount: $amount) @client
  }
`;

function MutatingCounter({id, count}) {
  const [changeAmount] = useMutation(CHANGE_PRODUCT_AMOUNT, {
    refetchQueries: [{query: PRODUCTS_BY_DATE}]
  });
  return <Counter
    onUpVote={() => changeAmount({variables: {
      id,
      amount: count + 1
    }})}
    onDownVote={() => changeAmount({variables: {
      id,
      amount: count - 1
    }})}
    count={count}
  />
}

function Products() {
  const { loading, error, data } = useQuery(GET_CART_ITEMS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
    <ul>
      {
        data.cart.map(({id, name, price, count}) => (
          <li key={id}>{name} - {price}E - <MutatingCounter id={id} count={count} /></li>
        ))
      }
    </ul>
    <ProductsByDate />
    </>
  );
}

function ProductsByDate() {
  const { loading, error, data } = useQuery(PRODUCTS_BY_DATE);

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
