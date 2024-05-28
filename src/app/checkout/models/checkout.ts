import { makeAutoObservable, runInAction } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'
import { isServer, RequestError } from '@/lib'
import { toast } from 'react-toastify'
import * as api from '../api'
import { Order } from '../models'

enableStaticRendering(isServer())

export class Checkout {
  state: RequestState = 'init'
  formErrors: Record<string, string> = {}

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async createOrder(order: Order): Promise<CreateOrderResponseDto | null> {
    if (this.state === 'pending') return null
    this.state = 'pending'
    this.clearFormErrors()

    try {
      const result = await api.createOrder(order)

      runInAction(() => {
        this.state = 'succeeded'
      })

      return result
    } catch (e: unknown) {
      runInAction(() => {
        this.state = 'failed'

        if (e instanceof RequestError) {
          toast.error(e.message)

          e.errors && Object.entries(e.errors).forEach(([key, value]) => {
            const [fieldName, _validatorName] = key.split('.')
            this.formErrors[fieldName] = value
          })

          return
        }

        if (e instanceof Error) {
          toast.error(e.message)
        }
      })
      return null
    }
  }

  clearFormErrors(fieldName?: string) {
    if (fieldName && this.formErrors[fieldName]) {
      delete this.formErrors[fieldName]
    } else {
      this.formErrors = {}
    }
  } 

  get isLoading() {
    return this.state === 'pending'
  }

  get isFail() {
    return this.state === 'failed'
  }
}
