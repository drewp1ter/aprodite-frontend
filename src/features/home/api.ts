import { RequestError } from '@/lib'
import { fetchApi } from '@/lib/fetchAbsolute'

export async function fetchCategories(): Promise<CategoryDto[]> {
  const res = await fetchApi('/categories', { next: { revalidate: 600 } })
  const body = await res.json()
  if (!res.ok) {
    throw new RequestError({ message: body.message, code: res.status })
  }
  
  return body
}
