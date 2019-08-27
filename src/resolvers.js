import { getProducts } from './api';

export default {
  Query: {
    cart: () => getProducts().then(
      res => {
        const result = Object.values(res);
        return result;
      }
    ),
  },
}
