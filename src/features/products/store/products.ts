import { makeAutoObservable } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'
import { isServer } from '@/lib'
import { Product } from '../models'

enableStaticRendering(isServer())

export class Products {
  products: Product[] = []
  currentIndex: number = 0

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  selectProductById(productId: number) {
    this.currentIndex = this.products.findIndex((product) => product.id === productId)
  }

  selectNextProduct() {
    if (this.products.length > this.currentIndex + 1) this.currentIndex++
  }

  selectPrevProduct() {
    if (0 < this.currentIndex) this.currentIndex--
  }

  get selectedProduct(): Product | undefined {
    return this.products[this.currentIndex]
  }

  hydrate(products: ProductDto[]) {
    this.products = products.map((product) => Product.createFromDto(product))
  }
}
