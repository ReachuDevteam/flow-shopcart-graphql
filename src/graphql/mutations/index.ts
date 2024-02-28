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

export async function executeUpdateItemToCartMutation(variables: {
  cartId: string;
  cartItemId: string;
  shippingId?: string | undefined | null;
  qty?: number | null | undefined;
}) {
  const UPDATE_ITEM_TO_CART_MUTATION = gql`
    mutation UpdateItemToCart(
      $cartId: String!
      $cartItemId: String!
      $shippingId: String
      $qty: Int
    ) {
      updateItemToCart(
        cartId: $cartId
        cartItemId: $cartItemId
        shipping_id: $shippingId
        qty: $qty
      ) {
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
    mutation: UPDATE_ITEM_TO_CART_MUTATION,
    variables,
  });

  return data.updateItemToCart;
}

export async function executeCreateCheckoutMutation(variables: {
  cartId: string;
}) {
  const CREATE_CHECKOUT_MUTATION = gql`
    mutation CreateCheckout($cartId: String!) {
      createCheckout(cartId: $cartId) {
        createdAt
        updatedAt
        id
        deletedAt
        success_url
        cancel_url
        payment_method
        email
        status
        checkout_url
        origin_payment_id
        total_price
        total_tax
        total_line_items_price
        billing_address {
          id
          first_name
          last_name
          phone_code
          phone
          company
          address1
          address2
          city
          province
          province_code
          country
          country_code
          zip
        }
        shipping_address {
          id
          first_name
          last_name
          phone_code
          phone
          company
          address1
          address2
          city
          province
          province_code
          country
          country_code
          zip
        }
        total_amount_shipping
        availablePaymentMethods {
          name
        }
        discount_code
        total_discount
        cart {
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
    }
  `;

  const { data } = await client.mutate({
    mutation: CREATE_CHECKOUT_MUTATION,
    variables,
  });

  return data.createCheckout;
}

type AddressArgs = {
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  company?: string | null;
  country?: string | null;
  country_code?: string | null;
  email?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  phone?: number | null;
  phone_code?: string | null;
  province_code?: string | null;
  province?: string | null;
  zip?: string | null;
};
export async function executeUpdateCheckoutMutation(variables: {
  checkoutId: string;
  email?: string | null;
  successUrl?: string | null;
  cancelUrl?: string | null;
  paymentMethod?: string | null;
  shippingAddress?: AddressArgs | null;
  billingAddress?: AddressArgs | null;
  status?: string | null;
}) {
  const UPDATE_CHECKOUT_MUTATION = gql`
    mutation UpdateCheckout(
      $checkoutId: String!
      $email: String
      $successUrl: String
      $cancelUrl: String
      $paymentMethod: String
      $shippingAddress: AddressArgs
      $billingAddress: AddressArgs
      $status: String
    ) {
      updateCheckout(
        checkoutId: $checkoutId
        email: $email
        success_url: $successUrl
        cancel_url: $cancelUrl
        payment_method: $paymentMethod
        shipping_address: $shippingAddress
        billing_address: $billingAddress
        status: $status
      ) {
        createdAt
        updatedAt
        id
        deletedAt
        success_url
        cancel_url
        payment_method
        email
        status
        checkout_url
        origin_payment_id
        total_price
        total_tax
        total_line_items_price
        billing_address {
          id
          first_name
          last_name
          phone_code
          phone
          company
          address1
          address2
          city
          province
          province_code
          country
          country_code
          zip
        }
        shipping_address {
          id
          first_name
          last_name
          phone_code
          phone
          company
          address1
          address2
          city
          province
          province_code
          country
          country_code
          zip
        }
        total_amount_shipping
        availablePaymentMethods {
          name
        }
        discount_code
        total_discount
        cart {
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
    }
  `;

  const { data } = await client.mutate({
    mutation: UPDATE_CHECKOUT_MUTATION,
    variables,
  });

  return data.updateCheckout;
}

export async function executeCheckoutInitPaymentKlarnaMutation(variables: {
  checkoutId: string;
  countryCode: string;
  href: string;
  email: string;
}) {
  const CHECKOUT_INIT_PAYMENT_KLARNA_MUTATION = gql`
    mutation CheckoutInitPaymentKlarna(
      $checkoutId: String!
      $countryCode: String!
      $href: String!
      $email: String!
    ) {
      checkoutInitPaymentKlarna(
        checkoutId: $checkoutId
        country_code: $countryCode
        href: $href
        email: $email
      ) {
        order_id
        status
        purchase_country
        purchase_currency
        locale
        billing_address {
          given_name
          family_name
          email
          street_address
          postal_code
          city
          country
        }
        shipping_address {
          given_name
          family_name
          email
          street_address
          postal_code
          city
          country
        }
        order_amount
        order_tax_amount
        total_line_items_price
        order_lines {
          type
          name
          quantity
          unit_price
          tax_rate
          total_amount
          total_discount_amount
          total_tax_amount
          merchant_data
        }
        merchant_urls {
          terms
          checkout
          confirmation
          push
        }
        html_snippet
        started_at
        last_modified_at
        options {
          allow_separate_shipping_address
          date_of_birth_mandatory
          require_validate_callback_success
          phone_mandatory
          auto_capture
        }
        shipping_options {
          id
          name
          price
          tax_amount
          tax_rate
          preselected
        }
        merchant_data
        selected_shipping_option {
          id
          name
          price
          tax_amount
          tax_rate
          preselected
        }
      }
    }
  `;

  const { data } = await client.mutate({
    mutation: CHECKOUT_INIT_PAYMENT_KLARNA_MUTATION,
    variables,
  });

  return data.checkoutInitPaymentKlarna;
}

export async function executeCheckoutInitPaymentStripeMutation(variables: {
  email: string;
  paymentMethod: string;
  successUrl: string;
  checkoutId: string;
}) {
  const CHECKOUT_INIT_PAYMENT_STRIPE_MUTATION = gql`
    mutation CheckoutInitPaymentStripe(
      $email: String!
      $paymentMethod: String!
      $successUrl: String!
      $checkoutId: String!
    ) {
      checkoutInitPaymentStripe(
        email: $email
        payment_method: $paymentMethod
        success_url: $successUrl
        checkoutId: $checkoutId
      ) {
        checkout_url
        order_id
      }
    }
  `;
  const { data } = await client.mutate({
    mutation: CHECKOUT_INIT_PAYMENT_STRIPE_MUTATION,
    variables,
  });

  return data.checkoutInitPaymentStripe;
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
