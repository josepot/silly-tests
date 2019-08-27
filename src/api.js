import generateData from './generateProductsData';

export const getProducts = () => Promise.resolve(generateData());
