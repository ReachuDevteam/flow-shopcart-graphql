import {
  executeCreateCartMutation,
  executeUpdateCartMutation,
  executeCreateItemToCartMutation,
  executeUpdateItemToCartMutation,
  executeCreateCheckoutMutation,
  executeUpdateCheckoutMutation,
  executeCheckoutInitPaymentKlarnaMutation,
  executeCheckoutInitPaymentStripeMutation,
} from '../graphql/mutations';
import {
  executeGetCartQuery,
  executeChannelGetProductsQuery,
  executeChannelGetProductQuery,
} from '../graphql/queries';

import { v4 as uuidv4 } from 'uuid';

const shopCartDemo = async () => {
  console.log(
    '\x1b[43m\x1b[31m%s\x1b[0m',
    `INITIALIZING SHOP CART DEMO -- ${process.env.DEMO_PAYMENT}`
  );

  /*######################### RETURN PRODUCTS  [CHANNEL] ######################### */
  const channelProducts = await getChannelProducts('NOK', 'medium');

  /*######################### RETURN PRODUCT [CHANNEL] ######################### */
  const PRODUCT_ID_FOR_TESTING = 67758;
  const _channelProduct = channelProducts.find(
    (product: Record<string, any>) => +product.id === PRODUCT_ID_FOR_TESTING
  );
  const channelProduct = await getChannelProduct(
    +_channelProduct.id,
    'NOK',
    'medium'
  );

  /*######################### CREATE SHOP CART ######################### */
  const createCart = await createShopCart();

  /*######################### GET SHOP CART ######################### */
  const getCart = await getShopCart(createCart.cart_id);

  /*######################### UPDATE SHOP CART ######################### */

  const updateCart = await updateShopCart(getCart.cart_id, 'NO');

  /*######################### ADD ITEM SHOP CART ######################### */

  const itemToCart = await addItemToShopCart(getCart.cart_id, channelProduct);

  /*######################### UPDATE ITEM SHOP CART [ADD SHIPPING COUNTRY] ######################### */

  const { id: shippingId } =
    channelProduct.productShipping[0].shippingCountry.find(
      (sc: Record<string, any>) => sc.country === 'NO'
    );
  console.info('shippingId', shippingId);

  await updateItemInShopCart({
    cartId: itemToCart.cart_id,
    cartItemId: itemToCart.line_items[0].id,
    shippingId,
  });

  /*######################### UPDATE ITEM SHOP CART [UPDATE qty] ######################### */

  await updateItemInShopCart({
    cartId: itemToCart.cart_id,
    cartItemId: itemToCart.line_items[0].id,
    qty: 3,
  });

  /*######################### CREATE CHECKOUT ######################### */

  const checkout = await createCheckout(itemToCart.cart_id);

  if (process.env.DEMO_PAYMENT === 'KLARNA') {
    /*#########################  UPDATE CHECKOUT FOR KLARNA ######################### */

    const checkoutInfo = {
      checkoutId: checkout.id,
      email: 'devmiguelopz@gmail.com',
      paymentMethod: 'klarna',
      billingAddress: {
        address1: 'Karl Johans gate 47',
        address2: '',
        city: 'Oslo',
        company: 'Norsk Selskap',
        country: 'Norway',
        country_code: 'NO',
        email: 'devmiguelopz@gmail.com',
        first_name: 'Dev',
        last_name: 'Miguel',
        phone: 98765432,
        phone_code: '+47',
        province: 'Oslo',
        province_code: '03',
        zip: '0162',
      },
      shippingAddress: {
        address1: 'Karl Johans gate 47',
        address2: '',
        city: 'Oslo',
        company: 'Norsk Selskap',
        country: 'Norway',
        country_code: 'NO',
        email: 'devmiguelopz@gmail.com',
        first_name: 'Dev',
        last_name: 'Miguel',
        phone: 98765432,
        phone_code: '+47',
        province: 'Oslo',
        province_code: '03',
        zip: '0162',
      },
    };
    await consumeUpdateCheckoutMutation(checkoutInfo);

    /*#########################  PAYMENT FOR KLARNA ######################### */

    try {
      const klarnaPayment = await initPaymentKlarna({
        checkoutId: checkout.id,
        countryCode: 'NO',
        href: 'https://www.example.com/confirmation.html',
        email: 'devmiguelopz@gmail.com',
      });
    } catch {}
  }

  if (process.env.DEMO_PAYMENT === 'STRIPE') {
    /*#########################  UPDATE CHECKOUT FOR STRIPE ######################### */

    const checkoutInfo = {
      checkoutId: checkout.id,
      email: 'devmiguelopz@gmail.com',
      paymentMethod: 'stripe',
      successUrl: 'http://localhost:3000/success',
      cancelUrl: 'http://localhost:3000/cancel',
      billingAddress: {
        address1: 'Karl Johans gate 47',
        address2: '',
        city: 'Oslo',
        company: 'Norsk Selskap',
        country: 'Norway',
        country_code: 'NO',
        email: 'devmiguelopz@gmail.com',
        first_name: 'Dev',
        last_name: 'Miguel',
        phone: 98765432,
        phone_code: '+47',
        province: 'Oslo',
        province_code: '03',
        zip: '0162',
      },
      shippingAddress: {
        address1: 'Karl Johans gate 47',
        address2: '',
        city: 'Oslo',
        company: 'Norsk Selskap',
        country: 'Norway',
        country_code: 'NO',
        email: 'devmiguelopz@gmail.com',
        first_name: 'Dev',
        last_name: 'Miguel',
        phone: 98765432,
        phone_code: '+47',
        province: 'Oslo',
        province_code: '03',
        zip: '0162',
      },
    };
    await consumeUpdateCheckoutMutation(checkoutInfo);

    /*#########################  PAYMENT FOR STRIPE ######################### */

    const stripePayment = await initPaymentStripe({
      checkoutId: checkout.id,
      paymentMethod: 'NO',
      successUrl: 'http://localhost:3000',
      email: 'devmiguelopz@gmail.com',
    });
  }

  console.log(
    '\x1b[43m\x1b[31m%s\x1b[0m',
    `INITIALIZING SHOP CART DEMO COMPLETED -- ${process.env.DEMO_PAYMENT}`
  );
};

const createShopCart = async () => {
  const customerSessionId = uuidv4();
  const currency = 'NOK';
  try {
    const result = await executeCreateCartMutation({
      customerSessionId,
      currency,
    });
    console.log('Result of createCart:', result);
    return result;
  } catch (error) {
    console.error('Error executing createCart:', error);
    throw error;
  }
};

const getShopCart = async (cartId: string) => {
  try {
    const result = await executeGetCartQuery({
      cartId,
    });
    console.log('Result of getCart:', result);
    return result;
  } catch (error) {
    console.error('Error executing getCart:', error);
    throw error;
  }
};

const getChannelProducts = async (
  currency?: string,
  imageSize: 'large' | 'medium' | 'thumbnail' | 'full' = 'large'
) => {
  try {
    const result = await executeChannelGetProductsQuery({
      currency,
      imageSize,
    });
    console.log('Result of getChannelProducts:', result);
    return result;
  } catch (error) {
    console.error('Error executing getChannelProducts:', error);
    throw error;
  }
};

const getChannelProduct = async (
  productId: number,
  currency?: string,
  imageSize: 'large' | 'medium' | 'thumbnail' | 'full' = 'large'
) => {
  try {
    const result = await executeChannelGetProductQuery({
      productId,
      currency,
      imageSize,
    });
    console.log('Result of getChannelProduct:', result);
    return result;
  } catch (error) {
    console.error('Error executing getChannelProduct:', error);
    throw error;
  }
};

const updateShopCart = async (cartId: string, shippingCountry: string) => {
  try {
    const result = await executeUpdateCartMutation({
      cartId,
      shippingCountry,
    });
    console.log('Result of updateCart:', result);
    return result;
  } catch (error) {
    console.error('Error executing updateCart:', error);
    throw error;
  }
};

const addItemToShopCart = async (
  cartId: string,
  product: {
    id: string;
    price: {
      amount: string;
      currencyCode: string;
      baseAmount: string;
      compareAt: string;
    };
  }
) => {
  const lineItems = [
    {
      quantity: 2,
      product_id: +product.id,
      price_data: {
        currency: product.price.currencyCode,
        tax: 0,
        unit_price: +product.price.amount,
      },
    },
  ];

  try {
    const result = await executeCreateItemToCartMutation({ cartId, lineItems });
    console.log('Result of createItemToCart:', result);
    return result;
  } catch (error) {
    console.error('Error executing createItemToCart:', error);
  }
};

const updateItemInShopCart = async ({
  cartId,
  cartItemId,
  shippingId = null,
  qty = null,
}: {
  cartId: string;
  cartItemId: string;
  shippingId?: string | undefined | null;
  qty?: number | null | undefined;
}) => {
  const variables = {
    cartId,
    cartItemId,
    shippingId,
    qty,
  };

  try {
    const result = await executeUpdateItemToCartMutation(variables);
    console.log('Result of updateItemToCart:', result);
    return result;
  } catch (error) {
    console.error('Error executing updateItemToCart:', error);
    throw error;
  }
};

const createCheckout = async (cartId: string) => {
  try {
    const result = await executeCreateCheckoutMutation({ cartId });
    console.log('Result of createCheckout:', result);
    return result;
  } catch (error) {
    console.error('Error executing createCheckout:', error);
    throw error;
  }
};

type AddressInput = {
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
async function consumeUpdateCheckoutMutation(variables: {
  checkoutId: string;
  email?: string | null;
  successUrl?: string | null;
  cancelUrl?: string | null;
  paymentMethod?: string | null;
  shippingAddress?: AddressInput | null;
  billingAddress?: AddressInput | null;
  status?: string | null;
}) {
  try {
    const result = await executeUpdateCheckoutMutation(variables);
    console.log('Checkout updated successfully:', result);
    return result;
  } catch (error) {
    console.error('Error updating checkout:', error);
    throw error;
  }
}

async function initPaymentKlarna(variables: {
  checkoutId: string;
  countryCode: string;
  href: string;
  email: string;
}) {
  try {
    const result = await executeCheckoutInitPaymentKlarnaMutation(variables);
    console.log('Payment initialized with Klarna:', result);
    return result;
  } catch (error) {
    console.error('Error initializing payment with Klarna:', error);
    throw error;
  }
}

async function initPaymentStripe(variables: {
  email: string;
  paymentMethod: string;
  successUrl: string;
  checkoutId: string;
}) {
  try {
    const result = await executeCheckoutInitPaymentStripeMutation(variables);
    console.log('Stripe payment initialized:', result);
    return result;
  } catch (error) {
    console.error('Error initializing Stripe payment:', error);
    throw error;
  }
}

export default shopCartDemo;
