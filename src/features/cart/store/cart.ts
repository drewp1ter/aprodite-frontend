import { makeObservable, action, computed, observable, flow } from 'mobx'
import { makePersistable, clearPersistedStore } from 'mobx-persist-store'
import { enableStaticRendering } from 'mobx-react-lite'
import { isServer, formatPrice } from '@/lib'

enableStaticRendering(isServer())

export class Cart {
  items: CartItem[] = []

  constructor() {
    makeObservable(this, {
      items: observable,
      add: action.bound,
      del: action.bound,
      increaseItemAmount: action.bound,
      decreaseItemAmount: action.bound,
      total: computed,
      isEmty: computed,
      itemsCount: computed,
      hydrate: action.bound,
      clear: flow.bound
    })
  }

  hydrate() {
    makePersistable(this, { name: 'cart', properties: ['items'], storage: window.localStorage })
  }

  *clear() {
    yield clearPersistedStore(this)
    this.items = []
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
