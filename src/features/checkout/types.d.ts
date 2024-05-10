interface Address {
  city: string
  address: string
}

type PaymentType = 'cash' | 'online'

interface OrderItem {
  productId: number
  amount: number
}

interface CreateOrderRequestDto {
  name: string
  phone: string
  comment: string
  paymentType: PaymentType
  address: Address
  items: OrderItem[]
}

interface CreateOrderResponseDto {
  redirectUrl: string
}
