import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  gql,
} from '@apollo/client/core';

type _ApolloClient = any;

const generateDynamicId = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

  const dynamicId = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;

  return dynamicId;
};

const getApolloClient = (apiKey: string, baseUrl: string) => {
  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Authorization: apiKey,
      },
    }));

    return forward(operation);
  });

  const httpLink = new HttpLink({
    uri: baseUrl,
  });

  const link = ApolloLink.from([authLink, httpLink]);

  const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache({
      addTypename: false,
    }),
  });

  return client;
};

const getProducts = async (apolloClient: _ApolloClient) => {
  const { data } = await apolloClient.query({
    query: gql`
      query Products {
        Channel {
          Products {
            id
            title
            brand
            description
            tags
            sku
            quantity
            price {
              amount
              currency_code
              amount_incl_taxes
              tax_amount
              tax_rate
              compare_at
              compare_at_incl_taxes
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
                country
                price {
                  amount
                  currency_code
                  amount_incl_taxes
                  tax_amount
                  tax_rate
                }
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
    `,
  });
  return data.Channel.Products;
};

const createCart = async (
  apolloClient: _ApolloClient,
  {
    customer_session_id,
    currency,
  }: { customer_session_id: string; currency: string }
) => {
  const variables = { customerSessionId: customer_session_id, currency };

  const { data } = await apolloClient.mutate({
    mutation: gql`
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
                discount
                compare_at
                compare_at_incl_taxes
                amount_incl_taxes
                tax_amount
                tax_rate
              }
              shipping {
                id
                name
                description
                price {
                  amount
                  currency_code
                  amount_incl_taxes
                  tax_amount
                  tax_rate
                }
              }
              available_shippings {
                id
                name
                description
                country_code
                price {
                  amount
                  currency_code
                  amount_incl_taxes
                  tax_amount
                  tax_rate
                }
              }
            }
            subtotal
            shipping
            currency
            available_shipping_countries
          }
        }
      }
    `,
    variables,
  });
  return data.Cart.CreateCart;
};

const updateCart = async (
  apolloClient: _ApolloClient,
  { cart_id, shipping_country }: { cart_id: string; shipping_country: string }
) => {
  const variables = { cartId: cart_id, shippingCountry: shipping_country };
  const { data } = await apolloClient.mutate({
    mutation: gql`
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
                discount
                compare_at
                compare_at_incl_taxes
                amount_incl_taxes
                tax_amount
                tax_rate
              }
              shipping {
                id
                name
                description
                price {
                  amount
                  currency_code
                  amount_incl_taxes
                  tax_amount
                  tax_rate
                }
              }
              available_shippings {
                id
                name
                description
                country_code
                price {
                  amount
                  currency_code
                  amount_incl_taxes
                  tax_amount
                  tax_rate
                }
              }
            }
            subtotal
            shipping
            currency
            available_shipping_countries
          }
        }
      }
    `,
    variables,
  });
  return data.Cart.UpdateCart;
};

const addItemToCart = async (
  apolloClient: _ApolloClient,
  {
    cart_id,
    line_items,
  }: {
    cart_id: string;
    line_items: {
      quantity: number;
      product_id: number;
    }[];
  }
) => {
  const variables = { cartId: cart_id, lineItems: line_items };
  const { data } = await apolloClient.mutate({
    mutation: gql`
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
                discount
                compare_at
                compare_at_incl_taxes
                amount_incl_taxes
                tax_amount
                tax_rate
              }
              shipping {
                id
                name
                description
                price {
                  amount
                  currency_code
                  amount_incl_taxes
                  tax_amount
                  tax_rate
                }
              }
              available_shippings {
                id
                name
                description
                country_code
                price {
                  amount
                  currency_code
                  amount_incl_taxes
                  tax_amount
                  tax_rate
                }
              }
            }
            subtotal
            shipping
            currency
            available_shipping_countries
          }
        }
      }
    `,
    variables,
  });
  return data.Cart.AddItem;
};

const getLineItemsBySupplier = async (
  apolloClient: _ApolloClient,
  { cart_id }: { cart_id: string }
) => {
  const variables = { cartId: cart_id };
  const { data } = await apolloClient.query({
    query: gql`
      query GetLineItemsBySupplier($cartId: String!) {
        Cart {
          GetLineItemsBySupplier(cart_id: $cartId) {
            supplier {
              id
              name
            }
            available_shippings {
              id
              name
              description
              country_code
              price {
                amount
                currency_code
                amount_incl_taxes
                tax_amount
                tax_rate
              }
            }
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
                discount
                compare_at
                compare_at_incl_taxes
                amount_incl_taxes
                tax_amount
                tax_rate
              }
              shipping {
                id
                name
                description
                price {
                  amount
                  currency_code
                  amount_incl_taxes
                  tax_amount
                  tax_rate
                }
              }
            }
          }
        }
      }
    `,
    variables,
  });
  return data.Cart.GetLineItemsBySupplier;
};

const updateShippingsBySupplier = async (
  apolloClient: _ApolloClient,
  {
    cart_id,
    data,
  }: {
    cart_id: string;
    data: {
      supplier_id: number;
      shipping_id: string;
    }[];
  }
) => {
  const variables = { cartId: cart_id, data };
  const { data: _data } = await apolloClient.mutate({
    mutation: gql`
      mutation UpdateShippingsBySupplier(
        $cartId: String!
        $data: [DataUpdateShippingsBySupplier!]!
      ) {
        Cart {
          UpdateShippingsBySupplier(cart_id: $cartId, data: $data) {
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
                discount
                compare_at
                compare_at_incl_taxes
                amount_incl_taxes
                tax_amount
                tax_rate
              }
              shipping {
                id
                name
                description
                price {
                  amount
                  currency_code
                  amount_incl_taxes
                  tax_amount
                  tax_rate
                }
              }
              available_shippings {
                id
                name
                description
                country_code
                price {
                  amount
                  currency_code
                  amount_incl_taxes
                  tax_amount
                  tax_rate
                }
              }
            }
            subtotal
            shipping
            currency
            available_shipping_countries
          }
        }
      }
    `,
    variables,
  });
  return _data.Cart.UpdateShippingsBySupplier;
};

const createCheckout = async (
  apolloClient: _ApolloClient,
  { cart_id }: { cart_id: string }
) => {
  const variables = { cartId: cart_id };

  const { data } = await apolloClient.mutate({
    mutation: gql`
      mutation CreateCheckout($cartId: String!) {
        Checkout {
          CreateCheckout(cart_id: $cartId) {
            buyer_accepts_purchase_conditions
            buyer_accepts_terms_conditions
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
            available_payment_methods {
              name
            }
            discount_code
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
                  discount
                  compare_at
                  compare_at_incl_taxes
                  amount_incl_taxes
                  tax_amount
                  tax_rate
                }
                shipping {
                  id
                  name
                  description
                  price {
                    amount
                    currency_code
                    amount_incl_taxes
                    tax_amount
                    tax_rate
                  }
                }
                available_shippings {
                  id
                  name
                  description
                  country_code
                  price {
                    amount
                    currency_code
                    amount_incl_taxes
                    tax_amount
                    tax_rate
                  }
                }
              }
              subtotal
              shipping
              currency
              available_shipping_countries
            }
            totals {
              currency_code
              subtotal
              shipping
              total
              taxes
              tax_rate
              discounts
            }
          }
        }
      }
    `,
    variables,
  });
  return data.Checkout.CreateCheckout;
};

const shippingCartDemo = async () => {
  console.log('Shipping Cart Demo');
  // API key and base URL for the ReachU GraphQL API
  const apiKey = 'B72QBGP-B0DM8TV-KPCG6VK-WA5NF4E';
  const baseUrl = 'https://graph-ql.reachu.io';

  // Configuration for the target country and currency
  const countryCode = 'GB'; // Country code for Great Britain
  const currencyCode = 'GBP'; // Currency code for British Pound Sterling

  // Initialize the Apollo Client with the API key and base URL to interact with the ReachU API
  const apolloClient = await getApolloClient(apiKey, baseUrl);

  // Fetch the list of products available through the API
  const products = await getProducts(apolloClient);

  // Filter products based on specific criteria:
  // - Products must have at least 100 units available in stock (quantity >= 100)
  // - Products must have at least one available shipping option (product_shipping.length > 0)
  // - Products must not have any variants (variants.length === 0)
  // - The product price must be listed in GBP (price.currency_code === 'GBP')
  const filteredProducts = products.filter(
    (product: {
      quantity: number;
      product_shipping: Record<string, any>[];
      variants: Record<string, any>[];
      price: {
        currency_code: string;
      };
    }) =>
      product.quantity >= 100 &&
      product.product_shipping.length > 0 &&
      product.variants.length === 0 &&
      product.price.currency_code === 'GBP'
  );

  // Group the filtered products by their supplier to manage them separately
  const groupedBySupplier = filteredProducts.reduce(
    (acc: Record<string, any>, product: { supplier: string }) => {
      // If the supplier doesn't exist in the accumulator, initialize it as an empty array
      if (!acc[product.supplier]) {
        acc[product.supplier] = [];
      }
      // Add the product to the supplier's list of products
      acc[product.supplier].push(product);
      return acc;
    },
    {}
  );

  // Select exactly 2 products from each of 3 different suppliers
  // The goal is to have 6 products in total, evenly distributed across 3 suppliers
  const productsBySupplier: Record<string, any>[] = [];
  let selectedSuppliers = 0;

  // Iterate over the grouped products by supplier
  for (const supplier in groupedBySupplier) {
    // Ensure the supplier has products and we haven't selected more than 3 suppliers
    if (groupedBySupplier[supplier].length > 0 && selectedSuppliers < 3) {
      // Add up to 2 products from this supplier to the final selection
      productsBySupplier.push(...groupedBySupplier[supplier].slice(0, 2));
      selectedSuppliers++; // Increment the count of selected suppliers
    }
    // Stop selecting once we have products from 3 different suppliers
    if (selectedSuppliers >= 3) break;
  }

  // Create a new shopping cart with the selected currency and a unique customer session ID
  let cart = await createCart(apolloClient, {
    currency: currencyCode,
    customer_session_id: `demo-${generateDynamicId()}`, // Generate a unique session ID for the cart
  });

  // Update the cart to specify the shipping country (important for determining shipping options)
  cart = await updateCart(apolloClient, {
    cart_id: cart.cart_id,
    shipping_country: countryCode, // Set the shipping country to Great Britain
  });

  // Map the selected products into line items for adding to the cart
  const lineItems = productsBySupplier.map((product) => ({
    quantity: 1, // Quantity of each product to be added to the cart
    product_id: product.id, // The unique ID of each product
  }));

  // Add the selected line items to the cart
  const productsAddedToCart = await addItemToCart(apolloClient, {
    cart_id: cart.cart_id,
    line_items: lineItems, // Add the products to the cart as line items
  });

  // Fetch the list of line items grouped by supplier from the cart
  // This allows us to see which products are in the cart and their associated suppliers
  const lineItemsBySupplier = await getLineItemsBySupplier(apolloClient, {
    cart_id: cart.cart_id,
  });

  // For each supplier, find the appropriate shipping option based on the country code
  // This prepares us to set the correct shipping method for each supplier's products
  const shippingAndSupplier = lineItemsBySupplier.map(
    (lineItem: {
      supplier: { id: number };
      available_shippings: { id: string; country_code: string }[];
    }) => {
      // Find the available shipping option that matches the target country
      const available_shipping = lineItem.available_shippings.find(
        (_available_shipping) =>
          _available_shipping.country_code === countryCode
      );
      // Return an object that maps the supplier ID to the selected shipping ID
      return {
        supplier_id: lineItem.supplier.id,
        shipping_id: (available_shipping as { id: string }).id, // Ensure the shipping ID is captured correctly
      };
    }
  );

  // Update the cart with the selected shipping options for each supplier
  // This ensures that each group of products from different suppliers has the correct shipping method
  await updateShippingsBySupplier(apolloClient, {
    cart_id: cart.cart_id,
    data: shippingAndSupplier, // Pass the mapping of supplier to shipping IDs
  });

  // Finally, create a checkout session for the cart
  // This step prepares the cart for payment and completes the shopping flow
  await createCheckout(apolloClient, { cart_id: cart.cart_id });

  console.log('Demo completed successfully!');

  return;
};

export default shippingCartDemo;
