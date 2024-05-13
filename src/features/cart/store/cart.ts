import { makeAutoObservable, runInAction } from 'mobx'
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

  async hydrate() {
    if (isHydrated(this)) return
    
    await makePersistable(this, {
      name: 'cartStorage',
      properties: [
        { key: 'items', serialize: (items) => JSON.stringify(items), deserialize: (json) => JSON.parse(json).map((item: any) => new CartItem(item)) }
      ],
      storage: window.localStorage
    })

    runInAction(() => {
      this.items.map((item) => this.itemsProductsIds.add(item.productId))
    })
  }

  async clear() {
    await clearPersistedStore(this)
    runInAction(() => {
      this.items = []
    })
  }

  add(product: ProductDto) {
    if (this.itemsProductsIds.has(product.id)) return

    this.itemsProductsIds.add(product.id)
    this.items.push(CartItem.createFromProduct(product))
  }

  isProductInCart(productId?: number): boolean {
    return this.itemsProductsIds.has(productId ?? -1)
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
