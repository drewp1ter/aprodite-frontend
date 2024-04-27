import { makeAutoObservable } from 'mobx'
import { enableStaticRendering} from 'mobx-react-lite'
import { isServer } from '@/lib'

enableStaticRendering(isServer())

export class Products {
  products: ProductDto[] = []
  currentIndex: number = 0

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  selectProductById(productId: number) {
    this.currentIndex = this.products.findIndex(product => product.id === productId)
  }

  selectNextProduct() {
    if (this.products.length > this.currentIndex + 1) this.currentIndex++
  }

  selectPrevProduct() {
    if (0 < this.currentIndex) this.currentIndex--
  }

  get selectedProduct() {
    return this.products[this.currentIndex]
  }

  hydrate({ products }: Pick<Products, 'products'>) {
    this.products = products
  }
}
