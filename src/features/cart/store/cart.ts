import { makeAutoObservable } from 'mobx'
import { makePersistable, clearPersistedStore } from 'mobx-persist-store'
import { enableStaticRendering } from 'mobx-react-lite'
import { isServer, formatPrice } from '@/lib'

enableStaticRendering(isServer())

export class Cart {
  items: CartItem[] = []
  itemsIds = new Set<number>()

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  hydrate() {
    makePersistable(this, { name: 'cart', properties: ['items'], storage: window.localStorage })
  }

  *clear() {
    yield clearPersistedStore(this)
    this.items = []
  }

  add(product: ProductDto) {
    if (this.itemsIds.has(product.id)) return

    this.itemsIds.add(product.id)
    this.items.push({
      id: product.id,
      name: product.name,
      amount: 1,
      price: product.price,
      imgSrc: product.images[0]?.url
    })
  }

  isProductInCart(productId: number) {
    return this.itemsIds.has(productId)
  }

  del(productId: number) {
    this.items = this.items.filter((item) => item.id !== productId)
    this.itemsIds.delete(productId)
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

  get itemsCount(): number {
    return this.items.reduce((result, item) => result + item.amount, 0)
  }
}
