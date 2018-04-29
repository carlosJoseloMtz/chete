
const convert = (product) => {
  return {
    id: product._id,
    approved: product.approved,
    price: product.price,
    discounts: product.discounts,
    description: product.description,
    stock: product.stock,
    catalog: product.catalog,
    code: product.code,
    name: product.name,
    image: product.image
  }
}

export { convert }
