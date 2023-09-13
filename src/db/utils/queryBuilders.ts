// utils/queryBuilders.ts

interface ProductQuery {
  name?: RegExp
  price?: {
    $gte?: number
    $lte?: number
  }
}

export const buildNameQuery = (filter: string): ProductQuery => {
  if (filter) {
    return { name: new RegExp(filter, 'i') }
  }
  return {}
}

export const buildPriceQuery = (
  minPrice?: string,
  maxPrice?: string,
): ProductQuery => {
  const query: ProductQuery = { price: {} }

  if (minPrice || maxPrice) {
    query.price = {}

    if (minPrice) {
      query.price.$gte = Number(minPrice)
    }

    if (maxPrice) {
      query.price.$lte = Number(maxPrice)
    }

    if (!query.price.$gte && !query.price.$lte) {
      delete query.price
    }
  }

  return query
}
