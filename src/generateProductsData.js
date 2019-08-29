export default function() {
  const nProducts = Math.max(6, Math.floor(Math.random() * 15));
  const possibleDates = [
    "2019-09-10",
    "2019-09-12",
    "2019-09-14",
    "2019-09-17"
  ];

  const ids = Array(nProducts)
    .fill()
    .map((_, idx) => `id${idx}`);

  return ids
    .map((id, idx) => ({
      id,
      name: `Product #${idx + 1}`,
      price: Math.round(Math.random() * 20000) / 100,
      dateOfArrival:
        possibleDates[Math.floor(Math.random() * possibleDates.length)]
    }))
    .reduce(
      (acc, product) => ({
        ...acc,
        [product.id]: product
      }),
      {}
    );
}
