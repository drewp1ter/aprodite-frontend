import { makeAutoObservable, runInAction } from 'mobx'
import * as api from '../api'

export class Products {
  status: RequestStatus
  errorMessage: string
  products: ProductDto[]

  constructor() {
    makeAutoObservable(this)
    this.errorMessage = ''
    this.status = 'initial'
    this.products = []
  }

  findProduct(productId: number): ProductDto | undefined {
    return this.products.find(product => product.id === productId)
  }

  async fetchProducts(categoryId: string) {
    console.log('adasfa')
    if (this.status === 'request') return
    this.status = 'request'
    try {
      const products = await api.fetchProducts(categoryId)
      runInAction(() => {
        this.products = products
        this.status = 'success'
        this.errorMessage = ''
      })
    } catch (e: any) {
      runInAction(() => {
        this.status = 'failure'
        this.errorMessage = e.message
      })
    }
  }
}
