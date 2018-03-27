
const convert = (warehouses) => {
  return {
    id: warehouses._id,
    stock: [warehouses.stock],
    address: warehouses.address,
    type: warehouses.type
  }
}
    

export { convert }
