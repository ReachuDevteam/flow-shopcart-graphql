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

export async function executeUpdateCartMutation(variables: {
  cartId: string;
  shippingCountry: string;
}) {
  const UPDATE_CART_MUTATION = gql`
    mutation UpdateCart($cartId: String!, $shippingCountry: String!) {
      updateCart(cartId: $cartId, shipping_country: $shippingCountry) {
        cart_id
        customer_session_id
        shippingCountry
        line_items {
          id
          supplier
          product_image {
            id
            url
            width
            height
          }
          product_id
          product_title
          variant_id
          variant_title
          variant {
            option
            value
          }
          quantity
          price {
            amount
            currencyCode
            tax
            discount
            compareAt
          }
          shipping {
            id
            name
            description
            price {
              amount
              currencyCode
            }
          }
        }
        total_amount
        currency
        available_shipping_countries
      }
    }
  `;

  const { data } = await client.mutate({
    mutation: UPDATE_CART_MUTATION,
    variables,
  });

  return data.updateCart;
}

type PriceData = {
  currency: string;
  tax: number;
  unit_price: number;
};

type LineItemInput = {
  variant_id?: number;
  quantity: number;
  product_id: number;
  price_data: PriceData;
};
export async function executeCreateItemToCartMutation(variables: {
  cartId: string;
  lineItems: LineItemInput[];
}) {
  const CREATE_ITEM_TO_CART_MUTATION = gql`
    mutation CreateItemToCart($cartId: String!, $lineItems: [LineItemInput!]!) {
      createItemToCart(cartId: $cartId, line_items: $lineItems) {
        cart_id
        customer_session_id
        shippingCountry
        line_items {
          id
          supplier
          product_image {
            id
            url
            width
            height
          }
          product_id
          product_title
          variant_id
          variant_title
          variant {
            option
            value
          }
          quantity
          price {
            amount
            currencyCode
            tax
            discount
            compareAt
          }
          shipping {
            id
            name
            description
            price {
              amount
              currencyCode
            }
          }
        }
        total_amount
        currency
        available_shipping_countries
      }
    }
  `;

  const { data } = await client.mutate({
    mutation: CREATE_ITEM_TO_CART_MUTATION,
    variables: {
      cartId: variables.cartId,
      lineItems: variables.lineItems,
    },
  });

  return data.createItemToCart;
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
