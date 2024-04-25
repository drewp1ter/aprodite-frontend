import { makeObservable, action, computed, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'
import { isServer, formatPrice } from '@/utils'

enableStaticRendering(isServer())

export class Cart {
  items: CartItem[] = []

  constructor() {
    makeObservable(this, {
      items: observable,
      add: action,
      del: action,
      clear: action,
      increaseItemAmount: action,
      decreaseItemAmount: action,
      total: computed,
      isEmty: computed
    })

    this.add = this.add.bind(this)
    this.del = this.del.bind(this)
    this.clear = this.clear.bind(this)
    this.increaseItemAmount = this.increaseItemAmount.bind(this)
    this.decreaseItemAmount = this.decreaseItemAmount.bind(this)
  }

  add(product: ProductDto) {
    const existItem = this.items.find((item) => item.id === product.id)

    if (existItem) {
      existItem.amount++
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        amount: 1,
        price: product.price,
        imgSrc: product.images[0]?.url
      })
    }
  }

  del(productId: number) {
    this.items = this.items.filter((item) => item.id !== productId)
  }

  clear() {
    this.items = []
  }

  increaseItemAmount(productId: number) {
    const cartItem = this.items.find((item) => item.id === productId)
    if (cartItem) {
      cartItem.amount++
    }
  }

  decreaseItemAmount(productId: number) {
    const cartItem = this.items.find((item) => item.id === productId)
    if (cartItem && cartItem.amount > 1) {
      cartItem.amount--
    }
  }

  get total(): string {
    return formatPrice(this.items.reduce((result, item) => result + parseFloat(item.price) * item.amount, 0))
  }

  get isEmty(): boolean {
    return this.items.length === 0
  }
}
