export const validateFilters = (
  filter: string,
  minPrice: number | null,
  maxPrice: number | null,
) => {
  let errors = {}

  if (minPrice === null || isNaN(minPrice)) {
    errors = { ...errors, minPrice: 'El precio mínimo no es válido.' }
  }

  if (maxPrice === null || isNaN(maxPrice)) {
    errors = { ...errors, maxPrice: 'El precio máximo no es válido.' }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
