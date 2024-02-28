import {
  executeCreateCartMutation,
  executeUpdateCartMutation,
  executeCreateItemToCartMutation,
} from '../graphql/mutations';
import {
  executeGetCartQuery,
  executeChannelGetProductsQuery,
  executeChannelGetProductQuery,
} from '../graphql/queries';

import { v4 as uuidv4 } from 'uuid';

const shopCartDemo = async () => {
  console.log('\x1b[43m\x1b[31m%s\x1b[0m', 'INITIALIZING SHOP CART DEMO');

  /*######################### RETURN PRODUCTS  [CHANNEL] ######################### */
  const channelProducts = await getChannelProducts('NOK');

  /*######################### RETURN PRODUCT [CHANNEL] ######################### */

  const channelProduct = await getChannelProduct(+channelProducts[0].id, 'NOK');

  /*######################### CREATE SHOP CART ######################### */
  const createCart = await createShopCart();

  /*######################### GET SHOP CART ######################### */
  const getCart = await getShopCart(createCart.cart_id);

  /*######################### UPDATE SHOP CART ######################### */

  const updateCart = await updateShopCart(getCart.cart_id, 'NOK');

  const itemToCart = await addItemToShopCart(getCart.cart_id, channelProduct);

  /*######################### ADD ITEM SHOP CART ######################### */

  console.log('\x1b[43m\x1b[31m%s\x1b[0m', 'SHOP CART DEMO COMPLETED');
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

const getChannelProducts = async (currency?: string) => {
  try {
    const result = await executeChannelGetProductsQuery({
      currency,
    });
    console.log('Result of getChannelProducts:', result);
    return result;
  } catch (error) {
    console.error('Error executing getChannelProducts:', error);
    throw error;
  }
};

const getChannelProduct = async (productId: number, currency?: string) => {
  try {
    const result = await executeChannelGetProductQuery({
      productId,
      currency,
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
  } catch (error) {
    console.error('Error executing createItemToCart:', error);
  }
};

export default shopCartDemo;
