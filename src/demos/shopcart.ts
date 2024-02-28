import { executeCreateCartMutation } from '../graphql/mutations';
import { v4 as uuidv4 } from 'uuid';

const shopCartDemo = async () => {
  console.log('\x1b[43m\x1b[31m%s\x1b[0m', 'INITIALIZING SHOP CART DEMO');

  const cart = await createShopCart();

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

export default shopCartDemo;
