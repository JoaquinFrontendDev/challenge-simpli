interface ProductQuery {
  name?: RegExp
  price?: {
    $gte?: number
    $lte?: number
  }
}

export const productQueryBuilder = (
  filterValue: string | undefined,
  minPrice: string | undefined,
  maxPrice: string | undefined,
): ProductQuery => {
  function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  const query: ProductQuery = {}

  if (filterValue != null) {
    query.name = new RegExp(escapeRegExp(filterValue), 'i')
  }

  if (minPrice != null || maxPrice != null) {
    query.price = {}
    if (minPrice != null) {
      query.price.$gte = Number(minPrice)
    }
    if (maxPrice != null) {
      query.price.$lte = Number(maxPrice)
    }
  }

  return query
}
