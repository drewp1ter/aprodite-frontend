import { setValueToField } from '@/lib'

export class Order implements CreateOrderRequestDto {
  readonly name: string;
  readonly phone: string;
  readonly paymentType: PaymentType;
  readonly address: Address;
  readonly comment: string;
  readonly items: OrderItem[];

  constructor(partial: Partial<Order>) {
    this.name = partial.name ?? ''
    this.phone = partial.phone ?? ''
    this.comment = partial.comment ?? ''
    this.paymentType = partial.paymentType ?? 'online'
    this.address = partial.address ?? { city: '', address: '' }
    this.items = partial.items ?? []
  }

  addItems(items: OrderItem[]) {
    this.items.push(...items)
  }

  static createFromFormData(formData: FormData) {
    const tmp = {}
    for (const [key, value] of formData.entries()) {
      setValueToField(tmp, key, value)
    }
    
    return new Order(tmp)
  }
}