import { fetchApi } from '@/utils/fetchAbsolute'

export async function fetchCategory(categoryId: string): Promise<Pick<CategoryDto, 'id' | 'name'>> {
  try {
    const res = await fetchApi(`/categories/${categoryId}`)
    if (!res.ok) throw new Error()
    return res.json() as unknown as Pick<CategoryDto, 'id' | 'name'>
  } catch (e) {
    console.error(e)
    return { id: 0, name: '' }
  }
}

export async function fetchProducts(categoryId: string): Promise<ProductDto[]> {
  try {
    const res = await fetchApi(`/categories/${categoryId}/products`)
    if (!res.ok) return []
    return res.json() as unknown as ProductDto[]
  } catch (e) {
    console.error(e)
    return []
  }
}

export async function fetchCategoryAndProducts(categoryId: string): Promise<{ category: Pick<CategoryDto, 'id' | 'name'>; products: ProductDto[] }> {
  const [category, products] = await Promise.all([fetchCategory(categoryId), fetchProducts(categoryId)])
  return { category, products }
}
