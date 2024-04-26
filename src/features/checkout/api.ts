import { fetchApi } from '@/lib'

export async function createOrder(order: Partial<CreateOrderDto>): Promise<boolean> {
  const res = await fetchApi(`/orders`, {
    cache: 'no-cache',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  })
  return res.ok
}
