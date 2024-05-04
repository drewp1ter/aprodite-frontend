import { makeAutoObservable } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'
import { isServer } from '@/lib'
import { Product } from '../models'

enableStaticRendering(isServer())

export const PRODUCT_NOT_SELECTED = -1

export class Products {
  products: Product[] = []
  currentIndex: number = PRODUCT_NOT_SELECTED

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  selectProductById(productId: number) {
    this.currentIndex = this.products.findIndex((product) => product.id === productId)
  }

  get selectedProduct(): Product | undefined {
    return this.products[this.currentIndex]
  }

  get nextProductId(): number {
    const nextIndex = this.currentIndex + 1
    return this.products[nextIndex]?.id ?? this.products[this.currentIndex].id
  }

  get prevProductId(): number {
    const prevIndex = this.currentIndex - 1
    return this.products[prevIndex]?.id ?? this.products[this.currentIndex].id
  }

  get hasNextProduct(): boolean {
    const nextIndex = this.currentIndex + 1
    return !!this.products[nextIndex]
  }

  get hasPrevProduct(): boolean {
    const prevIndex = this.currentIndex - 1
    return !!this.products[prevIndex]
  }

  hydrate(products: ProductDto[]) {
    let isUpdated = false
    for (let i = 0; i < products.length; i++) {
      if (products[i].id !== this.products[i]?.id) {
        isUpdated = true
        break
      }
    }

    if (isUpdated) this.products = products.map((product) => Product.createFromDto(product))
  }
}
