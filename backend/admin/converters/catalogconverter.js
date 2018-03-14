
const convert = (catalog) => {
  return {
    id: catalog._id,
    name: catalog.name
  }
}


export { convert }

