
import { fetchApi } from "@/utils/fetchAbsolute"

export async function fetchCategories(): Promise<CategoryDto[]> {
  try {
    const res = await fetchApi('/categories')
    if (!res.ok) return []
    return res.json() as unknown as CategoryDto[]
  } catch (e) {
    console.error(e)
  }
  return []
}