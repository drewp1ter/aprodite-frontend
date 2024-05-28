import { fetchApi, RequestError } from '@/lib'
import { HTTP_BAD_REQUEST, HTTP_SERVICE_UNAVAILABLE } from '@/constants'

export async function createOrder(order: Partial<CreateOrderRequestDto>): Promise<CreateOrderResponseDto> {
  const res = await fetchApi(`/orders`, {
    cache: 'no-cache',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  })

  const body = await res.json()

  if (res.ok) {
    return body
  }

  if (res.status === HTTP_BAD_REQUEST || res.status === HTTP_SERVICE_UNAVAILABLE) {
    throw new RequestError({ code: res.status, message: body.message, errors: body.errors })
  }

  throw new Error('Что то пошло не так...')
}

export async function getDeliveryPrices(): Promise<DeliveryPriceDto[]> {
  const res = await fetchApi('/delivery-prices', { next: { revalidate: 600 } })

  const body = await res.json()

  if (res.ok) {
    return body
  }

  if (res.status === HTTP_BAD_REQUEST || res.status === HTTP_SERVICE_UNAVAILABLE) {
    throw new RequestError({ code: res.status, message: body.message, errors: body.errors })
  }

  throw new Error('Что то пошло не так...')
}
