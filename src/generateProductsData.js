export default function() {
  const nProducts = Math.max(6, Math.floor(Math.random() * 15));
  const possibleDates = ['2019-09-10','2019-09-12','2019-09-14','2019-09-17']

  const ids = Array(nProducts)
    .fill()
    .map((_, idx) => `id${idx}`)

  const getRelations = (idx) => {
    const idsCopy = [...ids];
    idsCopy.splice(idx, 1);
    const nRelations = Math.floor(Math.random() * (nProducts / 2));
    const result = [];
    for (let i = 0; i < nRelations; i++) {
      result.push(idsCopy.splice(
        Math.floor(Math.random() * idsCopy.length),
        1
      )[0])
    }
    return result;
  };

  return ids
    .map((id, idx) => ({
      id,
      name: `Product #${idx + 1}`,
      price: Math.round(Math.random() * 20000) / 100,
      dateOfArrival: possibleDates[Math.floor(Math.random() * possibleDates.length)],
      // related: getRelations(idx),
    }))
    .reduce((acc, product) => ({
      ...acc,
      [product.id]: product,
    }), {});
}
