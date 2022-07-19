export const paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  const newItems = [...items];
  return newItems.splice(startIndex, pageSize);
};
