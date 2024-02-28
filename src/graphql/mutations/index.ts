import { gql } from '@apollo/client/core';
import client from '../client';

export async function executeCreateCartMutation(variables: {
  customerSessionId: string;
  currency: string;
}) {
  const CREATE_CART_MUTATION = gql`
    mutation CreateCart($customerSessionId: String!, $currency: String!) {
      createCart(customerSessionId: $customerSessionId, currency: $currency) {
        cart_id
        currency
      }
    }
  `;

  const { data } = await client.mutate({
    mutation: CREATE_CART_MUTATION,
    variables,
  });

  return data.createCart;
}

/*######################### DISCOUNT ######################### */

export async function executeAddDiscountMutation(variables: {
  code: string;
  percentage: number;
  startDate: string;
  endDate: string;
  typeId: number;
}) {
  const ADD_DISCOUNT_MUTATION = gql`
    mutation AddDiscount(
      $code: String!
      $percentage: Int!
      $startDate: String!
      $endDate: String!
      $typeId: Int!
    ) {
      addDiscount(
        code: $code
        percentage: $percentage
        startDate: $startDate
        endDate: $endDate
        typeId: $typeId
      ) {
        id
        discountCount
        code
        percentage
        startDate
        endDate
        discountType {
          id
          type
        }
        discountProduct {
          id
          product {
            id
            title
            sku
            revenue
          }
        }
      }
    }
  `;

  const { data } = await client.mutate({
    mutation: ADD_DISCOUNT_MUTATION,
    variables,
  });

  return data.addDiscount;
}
