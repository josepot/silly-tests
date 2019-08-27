import generateData from './generateProductsData';

const wait = ms => new Promise(res => setTimeout(res, ms));

export const getProducts = () => wait(2000).then(generateData);
