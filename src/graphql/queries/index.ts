import { gql } from '@apollo/client/core';
import client from '../client';

export async function executeGetCartQuery(variables: { cartId: string }) {
  const GET_CART_QUERY = gql`
    query GetCart($cartId: String!) {
      getCart(cartId: $cartId) {
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

  const { data } = await client.query({
    query: GET_CART_QUERY,
    variables,
  });

  return data.getCart;
}

export async function executeChannelGetProductsQuery(variables?: {
  currency?: string;
}) {
  const CHANNEL_GET_PRODUCTS_QUERY = gql`
    query ChannelGetProducts($currency: String) {
      channelGetProducts(currency: $currency) {
        id
        title
        description
        tags
        sku
        quantity
        price {
          amount
          currencyCode
          baseAmount
          compareAt
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
        subcategories {
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
        productShipping {
          id
          name
          description
          customPriceEnabled
          default
          shippingCountry {
            id
            amount
            country
            currencyCode
            originalData {
              amount
              currencyCode
              baseAmount
            }
          }
        }
        supplier
        importedProduct
        referralFee
        optionsEnabled
        digital
        origin
        return {
          return_right
          return_label
          return_cost
          supplier_policy
          return_address {
            sameAsBusiness
            sameAsWarehouse
            country
            timezone
            address
            address2
            postCode
            returnCity
          }
        }
      }
    }
  `;

  const { data } = await client.query({
    query: CHANNEL_GET_PRODUCTS_QUERY,
    variables,
  });

  return data.channelGetProducts;
}

export async function executeChannelGetProductQuery(variables: {
  productId: number;
  currency?: string;
}) {
  const CHANNEL_GET_PRODUCT_QUERY = gql`
    query ChannelGetProduct($productId: Int, $currency: String) {
      channelGetProduct(productId: $productId, currency: $currency) {
        id
        title
        description
        tags
        sku
        quantity
        price {
          amount
          currencyCode
          baseAmount
          compareAt
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
        subcategories {
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
        productShipping {
          id
          name
          description
          customPriceEnabled
          default
          shippingCountry {
            id
            amount
            country
            currencyCode
            originalData {
              amount
              currencyCode
              baseAmount
            }
          }
        }
        supplier
        importedProduct
        referralFee
        optionsEnabled
        digital
        origin
        return {
          return_right
          return_label
          return_cost
          supplier_policy
          return_address {
            sameAsBusiness
            sameAsWarehouse
            country
            timezone
            address
            address2
            postCode
            returnCity
          }
        }
      }
    }
  `;

  const { data } = await client.query({
    query: CHANNEL_GET_PRODUCT_QUERY,
    variables,
  });

  return data.channelGetProduct;
}
1;
