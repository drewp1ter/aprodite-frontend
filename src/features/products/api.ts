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

export async function fetchProducts(categoryId: string): Promise<ProductDto[]> {
  try {
    const res = await fetchApi(`/categories/${categoryId}/products`, { next: { revalidate: 10 } })
    if (!res.ok) return []
    return res.json() as unknown as ProductDto[]
  } catch (e) {
    console.error(e)
    return []
  }
}
