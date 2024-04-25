
import { fetchApi } from "@/lib/fetchAbsolute"

export async function fetchCategories(): Promise<CategoryDto[]> {
  try {
    const res = await fetchApi('/categories', { next: { revalidate: 600 } })
    if (!res.ok) return []
    return res.json() as unknown as CategoryDto[]
  } catch (e) {
    console.error(e)
  }
  return []
}