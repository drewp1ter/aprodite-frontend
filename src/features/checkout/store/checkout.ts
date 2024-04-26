import { makeObservable, flow, computed, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'
import { isServer } from '@/lib'
import * as api from '../api'

enableStaticRendering(isServer())

export class Checkout {
  state: RequestState = 'init'
  error: string = ''

  constructor() {
    makeObservable(this, {
      state: observable,
      error: observable,
      createOrder: flow.bound,
      isLoading: computed
    })
  }

  *createOrder(order: Partial<CreateOrderDto>): Generator<Promise<boolean>> {
    if (this.state === 'pending') return false
    this.state = 'pending'
    try {
      const result = yield api.createOrder(order)
      this.state = 'done'
      return result
    } catch (e: any) {
      this.state = 'error'
      this.error = e.message
      return Promise.resolve(false)
    }
  }

  get isLoading() {
    return this.state === 'pending'
  }
}
