import { makeAutoObservable } from 'mobx'
import { makePersistable, clearPersistedStore, stopPersisting, isHydrated } from 'mobx-persist-store'
import { enableStaticRendering } from 'mobx-react-lite'
import { isServer, formatPrice } from '@/lib'
import { CartItem } from '../models'

enableStaticRendering(isServer())

export class Cart {
  items: CartItem[] = []
  itemsProductsIds = new Set<number>()

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
    stopPersisting(this)
  }

  *hydrate() {
    if (isHydrated(this)) return
    yield makePersistable(this, { name: 'cartStore', properties: ['items'], storage: window.localStorage })
    this.items.map(item => this.itemsProductsIds.add(item.productId))
  }

  *clear() {
    yield clearPersistedStore(this)
    this.items = []
  }

  add(product: ProductDto) {
    if (this.itemsProductsIds.has(product.id)) return

    this.itemsProductsIds.add(product.id)
    this.items.push(CartItem.createFromProduct(product))
  }

  isProductInCart(productId: number) {
    return this.itemsProductsIds.has(productId)
  }

  del(productId: number) {
    this.items = this.items.filter((item) => item.productId !== productId)
    this.itemsProductsIds.delete(productId)
  }

  increaseItemAmount(productId: number) {
    const cartItem = this.items.find((item) => item.productId === productId)
    if (cartItem) {
      cartItem.amount++
    }
  }

  decreaseItemAmount(productId: number) {
    const cartItem = this.items.find((item) => item.productId === productId)
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
