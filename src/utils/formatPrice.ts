export function formatPrice(price: string | number): string {
  const formatOptions = { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }
  if (typeof price === 'string') {
    return parseInt(price).toLocaleString('ru-RU', formatOptions)
  } else {
    return price.toLocaleString('ru-RU', formatOptions)
  }
}