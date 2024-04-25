import { makeObservable, action, computed, observable } from 'mobx'
import { enableStaticRendering} from 'mobx-react-lite'
import { isServer } from '@/lib'

enableStaticRendering(isServer())

export class Products {
  products: ProductDto[] = []
  currentIndex: number = 0

  constructor() {
    makeObservable(this, {
      products: observable,
      selectedProduct: computed,
      currentIndex: observable,
      selectProductById: action,
      hydrate: action
    })

    this.selectNextProduct = this.selectNextProduct.bind(this)
    this.selectPrevProduct = this.selectPrevProduct.bind(this)
    this.selectProductById = this.selectProductById.bind(this)
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
