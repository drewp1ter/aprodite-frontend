export function getCategoryProductsRoute(categoryId: number) {
  return `/categories/${categoryId}/products`
}

export function getCartRoute() {
  return '/cart'
}

export function getCheckOutRoute() {
  return '/checkout'
}

export function getSearchProductsRoute(query: string) {
  return `/products?query=${query}`
}