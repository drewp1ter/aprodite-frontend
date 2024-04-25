import { fetchApi } from '@/lib'

export async function fetchCategory(categoryId: string): Promise<Pick<CategoryDto, 'id' | 'name'>> {
  try {
    const res = await fetchApi(`/categories/${categoryId}`, { next: { revalidate: 600 } })
    if (!res.ok) throw new Error()
    return res.json() as unknown as Pick<CategoryDto, 'id' | 'name'>
  } catch (e) {
    console.error(e)
    return { id: 0, name: '' }
  }
}

export async function fetchProductsByCategoryId(categoryId: string): Promise<ProductDto[]> {
  try {
    const res = await fetchApi(`/categories/${categoryId}/products`, { next: { revalidate: 10 } })
    if (!res.ok) return []
    return res.json() as unknown as ProductDto[]
  } catch (e) {
    console.error(e)
    return []
  }
}

export async function fetchProductsByQuery(query: string): Promise<ProductDto[]> {
  try {
    const res = await fetchApi(`/products/?query=${query}`, { next: { revalidate: 10 } })
    if (!res.ok) return []
    return res.json() as unknown as ProductDto[]
  } catch (e) {
    console.error(e)
    return []
  }
}