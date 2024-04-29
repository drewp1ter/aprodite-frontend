import { formatPrice } from '@/lib'
export class CartItem implements ICartItem {
  productId: number = -1
  name: string = ''
  price: string = ''
  amount: number = 1
  imgSrc: string = ''

  constructor(partial: Partial<CartItem>) {
    Object.assign(this, partial)
  }

  get priceFormated(): string {
    return formatPrice(this.price)
  }

  static createFromProduct(product: ProductDto) {
    return new CartItem({ productId: product.id, name: product.name, price: product.price, imgSrc: product.images[0]?.url })
  }
}
