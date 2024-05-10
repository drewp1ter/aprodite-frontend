import { fetchApi } from '@/lib'

export async function createOrder(order: Partial<CreateOrderRequestDto>): Promise<CreateOrderResponseDto> {
  const res = await fetchApi(`/orders`, {
    cache: 'no-cache',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  })
  if (!res.ok) throw new Error('Something went wrong...')
  return res.json()
}
