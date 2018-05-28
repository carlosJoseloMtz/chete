
const convert = (productcatalog) => {
  return {
    id: productcatalog._id,
    name: productcatalog.name,
    description: productcatalog.description,
    products: productcatalog.products,
    category: productcatalog.category,
    online: productcatalog.online
  }
}

export { convert }
