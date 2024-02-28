import 'dotenv/config';
import { discountDemo, shopCartDemo } from './demos';

async function runDemo() {
  switch (process.env.DEMO_ENV) {
    case 'SHOPCART':
      await shopCartDemo();
      break;
    case 'DISCOUNT':
      await discountDemo();
      break;
    default:
      console.log('No environment value has been specified.');
      break;
  }
}

runDemo();
