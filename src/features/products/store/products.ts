import { makeObservable, action, observable } from 'mobx'
import { enableStaticRendering} from 'mobx-react-lite'
import { isServer } from '@/utils'

enableStaticRendering(isServer())

export class Products {
  products: ProductDto[] = []
  selectedProduct: ProductDto | null = null

  constructor() {
    makeObservable(this, {
      products: observable,
      selectedProduct: observable,
      selectProduct: action,
      hydrate: action
    })
  }

  selectProduct(productId: number) {
    this.selectedProduct = this.products.find(product => product.id === productId) ?? null
  }

  hydrate({ products }: Pick<Products, 'products'>) {
    this.products = products
  }
}
