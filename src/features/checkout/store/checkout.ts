import { makeAutoObservable, runInAction } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'
import { isServer, RequestError } from '@/lib'
import * as api from '../api'
import { Order } from '../models'

enableStaticRendering(isServer())

export class Checkout {
  state: RequestState = 'init'
  error: string = ''
  formErrors: Record<string, string> = {}

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async createOrder(order: Order): Promise<CreateOrderResponseDto | null> {
    if (this.state === 'pending') return null
    this.state = 'pending'
    this.clearErrors()

    try {
      const result = await api.createOrder(order)

      runInAction(() => {
        this.state = 'done'
      })

      return result
    } catch (e: unknown) {
      runInAction(() => {
        this.state = 'error'

        if (e instanceof RequestError) {
          this.error = e.message

          e.errors && Object.entries(e.errors).forEach(([key, value]) => {
            const [fieldName, _validatorName] = key.split('.')
            this.formErrors[fieldName] = value
          })
        }

        if (e instanceof Error) {
          this.error = e.message
        }
      })
      return null
    }
  }

  clearErrors() {
    this.error = ''
    this.formErrors = {}
  }

  clearError(fieldName: string) {
    if (this.formErrors[fieldName]) {
      delete this.formErrors[fieldName]
    }
  } 

  get isLoading() {
    return this.state === 'pending'
  }
}
