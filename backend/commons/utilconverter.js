/**
 * Converts a collection using a converter.
 * @returns A list of the converter items, empty collection if there are not items passed.
 * @param {Array} collection The collection to be converted.
 * @param {Function} converter The converter to be used.
 */

const convertAll = (collection, converter) => {
  if (!collection || collection.length === 0) {
    return []
  }
  return collection.map(item => converter(item))
}

export { convertAll }
