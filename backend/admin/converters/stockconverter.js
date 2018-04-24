
const convert = (stock) => {
  return {
    id: stock._id,
    product: stock.product,
    stock: stock.stock
  }
}

export { convert }
