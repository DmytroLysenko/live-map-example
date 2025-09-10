export const getStringPrice = (price: number) =>
  `$${price.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
