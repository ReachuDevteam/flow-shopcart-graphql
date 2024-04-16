import { gql } from '@apollo/client/core';
import client from '../client';

export async function executeCreateCartMutation(variables: {
  customerSessionId: string;
  currency: string;
}) {
  const CREATE_CART_MUTATION = gql`
    mutation CreateCart($customerSessionId: String!, $currency: String!) {
      Cart {
        CreateCart(
          customer_session_id: $customerSessionId
          currency: $currency
        ) {
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

  const { data } = await client.mutate({
    mutation: CREATE_CART_MUTATION,
    variables,
  });

  return data.Cart.CreateCart;
}

export async function executeUpdateCartMutation(variables: {
  cartId: string;
  shippingCountry: string;
}) {
  const UPDATE_CART_MUTATION = gql`
    mutation UpdateCart($cartId: String!, $shippingCountry: String!) {
      Cart {
        UpdateCart(cart_id: $cartId, shipping_country: $shippingCountry) {
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

  const { data } = await client.mutate({
    mutation: UPDATE_CART_MUTATION,
    variables,
  });

  return data.Cart.UpdateCart;
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
    mutation AddItem($cartId: String!, $lineItems: [LineItemInput!]!) {
      Cart {
        AddItem(cart_id: $cartId, line_items: $lineItems) {
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

  const { data } = await client.mutate({
    mutation: CREATE_ITEM_TO_CART_MUTATION,
    variables: {
      cartId: variables.cartId,
      lineItems: variables.lineItems,
    },
  });

  return data.Cart.AddItem;
}

export async function executeUpdateItemToCartMutation(variables: {
  cartId: string;
  cartItemId: string;
  shippingId?: string | undefined | null;
  qty?: number | null | undefined;
}) {
  const UPDATE_ITEM_TO_CART_MUTATION = gql`
    mutation UpdateItem(
      $cartId: String!
      $cartItemId: String!
      $qty: Int
      $shippingId: String
    ) {
      Cart {
        UpdateItem(
          cart_id: $cartId
          cart_item_id: $cartItemId
          qty: $qty
          shipping_id: $shippingId
        ) {
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

  const { data } = await client.mutate({
    mutation: UPDATE_ITEM_TO_CART_MUTATION,
    variables,
  });

  return data.Cart.UpdateItem;
}

export async function executeCreateCheckoutMutation(variables: {
  cartId: string;
}) {
  const CREATE_CHECKOUT_MUTATION = gql`
    mutation CreateCheckout($cartId: String!) {
      Checkout {
        CreateCheckout(cart_id: $cartId) {
          created_at
          updated_at
          id
          deleted_at
          success_url
          cancel_url
          payment_method
          email
          status
          checkout_url
          origin_payment_id
          total_amount
          total_taxes_amount
          total_cart_amount
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
          total_shipping_amount
          available_payment_methods {
            name
          }
          discount_code
          total_discount
          cart {
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
    }
  `;

  const { data } = await client.mutate({
    mutation: CREATE_CHECKOUT_MUTATION,
    variables,
  });

  return data.Checkout.CreateCheckout;
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
  status?: string | null;
  email?: string | null;
  successUrl?: string | null;
  cancelUrl?: string | null;
  paymentMethod?: string | null;
  shippingAddress?: AddressArgs | null;
  billingAddress?: AddressArgs | null;
}) {
  const UPDATE_CHECKOUT_MUTATION = gql`
    mutation UpdateCheckout(
      $checkoutId: String!
      $status: String
      $email: String
      $successUrl: String
      $cancelUrl: String
      $paymentMethod: String
      $shippingAddress: AddressArgs
      $billingAddress: AddressArgs
    ) {
      Checkout {
        UpdateCheckout(
          checkout_id: $checkoutId
          status: $status
          email: $email
          success_url: $successUrl
          cancel_url: $cancelUrl
          payment_method: $paymentMethod
          shipping_address: $shippingAddress
          billing_address: $billingAddress
        ) {
          created_at
          updated_at
          id
          deleted_at
          success_url
          cancel_url
          payment_method
          email
          status
          checkout_url
          origin_payment_id
          total_amount
          total_taxes_amount
          total_cart_amount
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
          total_shipping_amount
          available_payment_methods {
            name
          }
          discount_code
          total_discount
          cart {
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
    }
  `;

  const { data } = await client.mutate({
    mutation: UPDATE_CHECKOUT_MUTATION,
    variables,
  });

  return data.Checkout.UpdateCheckout;
}

export async function executeCheckoutInitPaymentKlarnaMutation(variables: {
  checkoutId: string;
  countryCode: string;
  href: string;
  email: string;
}) {
  const CHECKOUT_INIT_PAYMENT_KLARNA_MUTATION = gql`
    mutation Payment(
      $checkoutId: String!
      $countryCode: String!
      $href: String!
      $email: String!
    ) {
      Payment {
        CreatePaymentKlarna(
          checkout_id: $checkoutId
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
    }
  `;

  const { data } = await client.mutate({
    mutation: CHECKOUT_INIT_PAYMENT_KLARNA_MUTATION,
    variables,
  });

  return data.Payment.CreatePaymentKlarna;
}

export async function executeCheckoutInitPaymentStripeMutation(variables: {
  email: string;
  paymentMethod: string;
  successUrl: string;
  checkoutId: string;
}) {
  const CHECKOUT_INIT_PAYMENT_STRIPE_MUTATION = gql`
    mutation CreatePaymentStripe(
      $checkoutId: String!
      $successUrl: String!
      $paymentMethod: String!
      $email: String!
    ) {
      Payment {
        CreatePaymentStripe(
          checkout_id: $checkoutId
          success_url: $successUrl
          payment_method: $paymentMethod
          email: $email
        ) {
          checkout_url
          order_id
        }
      }
    }
  `;
  const { data } = await client.mutate({
    mutation: CHECKOUT_INIT_PAYMENT_STRIPE_MUTATION,
    variables,
  });

  return data.Payment.CreatePaymentStripe;
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
