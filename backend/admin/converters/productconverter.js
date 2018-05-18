import environment from '../../commons/environment-configuration'
const convert = (product) => {
  var x = product.image
  x.thumbnailSrc = x.thumbnailSrc !== ''? `${environment.media}${x.thumbnailSrc}`: ''
  x.mainImageSrc = x.mainImageSrc !== ''? `${environment.media}${x.mainImageSrc}`: ''
  product.image = x
  for (let p in x.gallery) {
    x.gallery[p] = x.gallery[p] !== ''? `${environment.media}${x.gallery[p]}`: ''

  }
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
