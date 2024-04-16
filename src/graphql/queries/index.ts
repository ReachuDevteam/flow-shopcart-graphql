import { gql } from '@apollo/client/core';
import client from '../client';

export async function executeGetCartQuery(variables: { cartId: string }) {
  const GET_CART_QUERY = gql`
    query GetCart($cartId: String!) {
      Cart {
        GetCart(cart_id: $cartId) {
          cart_id
          customer_session_id
          shipping_country
          line_items {
            id
            supplier
            image {
              id
              url
              width
              height
            }
            sku
            barcode
            brand
            product_id
            title
            variant_id
            variant_title
            variant {
              option
              value
            }
            quantity
            price {
              amount
              currency_code
              tax
              discount
              compare_at
            }
            shipping {
              id
              name
              description
              price {
                amount
                currency_code
              }
            }
          }
          total_amount
          currency
          available_shipping_countries
        }
      }
    }
  `;

  const { data } = await client.query({
    query: GET_CART_QUERY,
    variables,
  });

  return data.Cart.GetCart;
}

export async function executeChannelGetProductsQuery(variables?: {
  currency?: string;
  imageSize: 'large' | 'medium' | 'thumbnail' | 'full';
}) {
  const CHANNEL_GET_PRODUCTS_QUERY = gql`
    query GetProducts($currency: String, $imageSize: ImageSize) {
      Channel {
        GetProducts(currency: $currency, image_size: $imageSize) {
          id
          title
          description
          tags
          sku
          quantity
          price {
            amount
            currency_code
            compare_at
          }
          variants {
            id
            barcode
            quantity
            sku
            title
          }
          barcode
          options {
            id
            name
            order
            values
          }
          categories {
            id
            name
          }
          images {
            id
            url
            width
            height
            order
          }
          product_shipping {
            id
            name
            description
            custom_price_enabled
            default
            shipping_country {
              id
              amount
              country
              currency_code
            }
          }
          supplier
          imported_product
          referral_fee
          options_enabled
          digital
          origin
          return {
            return_right
            return_label
            return_cost
            supplier_policy
            return_address {
              same_as_business
              same_as_warehouse
              country
              timezone
              address
              address_2
              post_code
              return_city
            }
          }
        }
      }
    }
  `;

  const { data } = await client.query({
    query: CHANNEL_GET_PRODUCTS_QUERY,
    variables,
  });

  return data.Channel.GetProducts;
}

export async function executeChannelGetProductQuery(variables: {
  productId: number;
  currency?: string;
  sku?: string;
  barcode?: string;
  imageSize?: 'large' | 'medium' | 'thumbnail' | 'full';
}) {
  const CHANNEL_GET_PRODUCT_QUERY = gql`
    query GetProduct(
      $currency: String
      $imageSize: ImageSize
      $sku: String
      $barcode: String
      $productId: Int
    ) {
      Channel {
        GetProduct(
          currency: $currency
          image_size: $imageSize
          sku: $sku
          barcode: $barcode
          product_id: $productId
        ) {
          id
          title
          description
          tags
          sku
          quantity
          price {
            amount
            currency_code
            compare_at
          }
          variants {
            id
            barcode
            quantity
            sku
            title
          }
          barcode
          options {
            id
            name
            order
            values
          }
          categories {
            id
            name
          }
          images {
            id
            url
            width
            height
            order
          }
          product_shipping {
            id
            name
            description
            custom_price_enabled
            default
            shipping_country {
              id
              amount
              country
              currency_code
            }
          }
          supplier
          imported_product
          referral_fee
          options_enabled
          digital
          origin
          return {
            return_right
            return_label
            return_cost
            supplier_policy
            return_address {
              same_as_business
              same_as_warehouse
              country
              timezone
              address
              address_2
              post_code
              return_city
            }
          }
        }
      }
    }
  `;

  const { data } = await client.query({
    query: CHANNEL_GET_PRODUCT_QUERY,
    variables,
  });

  return data.Channel.GetProduct;
}

export async function executeCheckoutGetAvailablePaymentMethodsQuery() {
  const CHECKOUT_GET_AVAILABLE_PAYMENT_METHODS_QUERY = gql`
    query GetAvailablePaymentMethods {
      Payment {
        GetAvailablePaymentMethods {
          name
        }
      }
    }
  `;

  const { data } = await client.query({
    query: CHECKOUT_GET_AVAILABLE_PAYMENT_METHODS_QUERY,
  });

  return data.Payment.GetAvailablePaymentMethods;
}
