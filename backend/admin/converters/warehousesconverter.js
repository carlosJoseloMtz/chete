const convert = (warehouses) => {
  return {
    id: warehouses._id,
    stock: [ warehouses.stock ],
    address: [warehouses.adress],
    type: warehouses.type
  }
}
export { convert }
