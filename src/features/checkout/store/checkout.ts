import { makeAutoObservable, runInAction } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'
import { isServer } from '@/lib'
import * as api from '../api'
import { Order } from '../models'

enableStaticRendering(isServer())

export class Checkout {
  state: RequestState = 'init'
  error: string = ''

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async createOrder(order: Order): Promise<CreateOrderResponseDto | null> {
    if (this.state === 'pending') return null
    this.state = 'pending'
    try {
      const result = await api.createOrder(order)
      runInAction(() => {
        this.state = 'done'
      })
      return result
    } catch (e: any) {
      runInAction(() => {
        this.state = 'error'
        this.error = e.message
      })
      return null
    }
  }

  get isLoading() {
    return this.state === 'pending'
  }
}
