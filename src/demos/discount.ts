import { executeAddDiscountMutation } from '../graphql/mutations';
import { v4 as uuidv4 } from 'uuid';

const discountDemo = async () => {
  console.log('\x1b[43m\x1b[31m%s\x1b[0m', 'INITIALIZING DISCOUNT DEMO');

  const discount = await createDiscount();

  console.log('\x1b[43m\x1b[31m%s\x1b[0m', 'DISCOUNT DEMO COMPLETED');
};

const createDiscount = async () => {
  const data = {
    code: `REACHU_CODE_${uuidv4()}`,
    percentage: 10,
    startDate: '02-25-2024',
    endDate: '03-25-2024',
    typeId: 1,
  };
  try {
    const result = await executeAddDiscountMutation(data);
    console.log('Result of createDiscount:', result);
    return result;
  } catch (error) {
    console.error('Error executing createDiscount:', error);
    throw error;
  }
};

export default discountDemo;
