import { makeAutoObservable } from 'mobx'
import { Products } from '@/features/products/store'

class Store {
  products: Products

  constructor() {
    makeAutoObservable(this)
    this.products = new Products()
  }
}

export default Store