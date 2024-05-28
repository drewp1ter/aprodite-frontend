import { RequestError, fetchApi } from '@/lib'

export async function fetchCategory(categoryId: string): Promise<Pick<CategoryDto, 'id' | 'name'>> {
  const res = await fetchApi(`/categories/${categoryId}`, { next: { revalidate: 600 } })
  const body = await res.json()
  if (!res.ok) {
    throw new RequestError({ message: body.message, code: res.status })
  }
  
  return body
}

export async function fetchProductsByCategoryId(categoryId: string): Promise<ProductDto[]> {
  const res = await fetchApi(`/categories/${categoryId}/products`, { next: { revalidate: 10 } })
  const body = await res.json()
  if (!res.ok) {
    throw new RequestError({ message: body.message, code: res.status })
  }
  
  return body
}

export async function fetchProductsByQuery(query: string): Promise<ProductDto[]> {
  const res = await fetchApi(`/products/?query=${query}`, { next: { revalidate: 10 } })
  const body = await res.json()
  if (!res.ok) {
    throw new RequestError({ message: body.message, code: res.status })
  }
  
  return body
}
