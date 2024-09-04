import 'dotenv/config';
import { shopCartDemo, shippingCartDemo } from './demos';

async function runDemo() {
  switch (process.env.DEMO_ENV) {
    case 'SHOPCART':
      await shopCartDemo();
      break;
    case 'SHIPPING':
      await shippingCartDemo();
      break;
    default:
      console.log('No environment value has been specified.');
      break;
  }
}

runDemo();
