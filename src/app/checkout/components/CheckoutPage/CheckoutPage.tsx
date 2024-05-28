'use client'
import { useRef, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useCartStore } from '@/app/cart/models'
import { Steps, Label, Input, Button, Textarea, Error, Select } from '@/app/ui'
import { Order } from '../../models'
import { useCheckoutStore } from '../../models'
import styles from './Checkout.module.scss'
import * as images from './images'
import { useRouter } from 'next/navigation'
import { formatPrice } from '@/lib'

export interface Props {
  deliveryPrices: DeliveryPriceDto[]
}

interface ObtainingMethod {
  value: 'delivery' | 'pickup'
  label: string
}

const OBTAINING_METHODS: ObtainingMethod[] = [
  { value: 'delivery', label: 'Доставка' },
  { value: 'pickup', label: 'Самовывоз' }
]

export const CheckoutPage = observer(function CheckoutPage({ deliveryPrices }: Props) {
  const cartStore = useCartStore()
  const checkoutStore = useCheckoutStore()
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const [selectedDeliveryPrice, setSelectedDeliveryPrice] = useState<DeliveryPriceDto | undefined>(() => deliveryPrices[0])
  const [obtainingMethod, setObtainingMethod] = useState<ObtainingMethod>(OBTAINING_METHODS[0])
  const deliveryPrice = obtainingMethod.value === 'delivery' ? selectedDeliveryPrice?.price ?? 0 : 0

  const formAction = async (formData: FormData) => {
    const order = Order.createFromFormData(formData)
    order.addItems(cartStore.items)

    const response = await checkoutStore.createOrder(order)
    response?.redirectUrl && router.push(response.redirectUrl)
  }

  const handleClearErrorOnChange: React.ChangeEventHandler<HTMLElement> = (event) => {
    const name = event.currentTarget.getAttribute('name') ?? ''
    checkoutStore.clearFormErrors(name)
  }

  useEffect(() => {
    cartStore.isEmty && router.push('/')
  }, [cartStore.isEmty])

  return (
    <main className={styles.checkoutPage}>
      <div className={styles.head}>
        <h1>Оформление заказа</h1>
        <Steps className={styles.steps} currentStep={1}>
          <b>Корзина</b>
          <b>Оформление заказа</b>
        </Steps>
      </div>
      <form ref={formRef} className={styles.content} action={formAction}>
        <div className={styles.fieldset}>
          <div className={styles.nameAndPhone}>
            <Label title="Имя *">
              <Error error={checkoutStore.formErrors.name}>
                <Input autoComplete="name" name="name" onChange={handleClearErrorOnChange} />
              </Error>
            </Label>
            <Label title="Телефон *">
              <Error error={checkoutStore.formErrors.phone}>
                <Input autoComplete="tel" name="phone" onChange={handleClearErrorOnChange} />
              </Error>
            </Label>
          </div>
          <Label className={styles.fieldsRow} title="Способ полуения">
            <Select<ObtainingMethod>
              value={obtainingMethod}
              onChange={setObtainingMethod}
              options={OBTAINING_METHODS}
              optionRender={(option) => option.label}
            />
          </Label>

          {obtainingMethod.value === 'delivery' && (
            <Label className={styles.fieldsRow} title="Населённый пункт *">
              <Select<DeliveryPriceDto>
                value={selectedDeliveryPrice}
                onChange={setSelectedDeliveryPrice}
                options={deliveryPrices}
                optionRender={(option) => option.name}
              />
              <input type="hidden" value={selectedDeliveryPrice?.name} name="address.city" />
            </Label>
          )}

          <Label className={styles.fieldsRow} title={obtainingMethod.value === 'delivery' ? 'Адрес *' : 'Адрес получения'}>
            <Textarea
              disabled={obtainingMethod.value === 'pickup'}
              defaultValue={obtainingMethod.value === 'pickup' ? 'г. Белореченск, ул. Мира, 65/1' : ''}
              autoComplete="address-line1"
              name="address.address"
              className={styles.textarea}
              rows={3}
            />
          </Label>
          <Label className={styles.fieldsRow} title="Детали">
            <Textarea
              name="comment"
              className={styles.textarea}
              rows={3}
              placeholder="Примечания к вашему заказу, например, особые пожелания отделу доставки."
            />
          </Label>
          <div className={styles.radioButtons}>
            <Button.Radio value="cash" name="paymentType">
              Оплата при доставке
            </Button.Radio>
            <Button.Radio defaultChecked value="online" name="paymentType">
              Банковская карта <img src={images.CARDS} alt="banks" />
            </Button.Radio>
          </div>
          <div className={styles.cards}>
            <img src={images.VISA} alt="visa" />
            <img src={images.MASTER_CARD} alt="mastercard" />
            <img src={images.PAYPAL} alt="paypal" />
            <img src={images.MIR} alt="mir" />
          </div>
        </div>
        <div className={styles.summary}>
          <h6>Ваш заказ</h6>
          <div className={styles.total}>
            <div>
              <span>В корзине</span>
              <span>Доставка</span>
              <span>Итого</span>
            </div>
            <div>
              <span>
                {cartStore.itemsCount} товар{getItemsAmountSuffix(cartStore.itemsCount)}
              </span>
              <span>{formatPrice(deliveryPrice)}</span>
              <span>{formatPrice(cartStore.total + deliveryPrice)}</span>
            </div>
          </div>
          <Button disabled={checkoutStore.isLoading} loading={checkoutStore.isLoading} type="submit">
            Подтвердить заказ
          </Button>
        </div>
      </form>
    </main>
  )
})

function getItemsAmountSuffix(amount: number) {
  const _amount = amount > 20 ? Number(amount.toString().at(-1)) : amount

  switch (_amount) {
    case 1:
      return ''
    case 2:
    case 3:
    case 4:
      return 'а'
    default:
      return 'ов'
  }
}
