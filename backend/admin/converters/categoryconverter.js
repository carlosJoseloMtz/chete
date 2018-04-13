
const convert = (category) => {
  return {
    id: category._id,
    name: category.name,
    description: category.description,
    catalog: category.catlog,
    products: category.products
  }
}

export { convert }
