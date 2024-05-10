'use client'
import { useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { useCartStore } from '@/features/cart/store'
import { Steps, Label, Input, Button, Textarea } from '@/ui'
import { Order } from '../../models'
import { useCheckoutStore } from '../../store'
import styles from './Checkout.module.scss'
import * as images from './images'
import { useRouter } from 'next/navigation'

export const CheckoutPage = observer(function CheckoutPage() {
  const cartStore = useCartStore()
  const { createOrder, isLoading } = useCheckoutStore()
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  const formAction = async (formData: FormData) => {
    const order = Order.createFromFormData(formData)
    order.addItems(cartStore.items)

    const response = await createOrder(order)

    response?.redirectUrl && router.push(response.redirectUrl)
  }

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
              <Input autoComplete="name" name="name" />
            </Label>
            <Label title="Телефон *">
              <Input autoComplete="tel" name="phone" />
            </Label>
          </div>
          <Label className={styles.fieldsRow} title="Город *">
            <Input autoComplete="address-level1" name="address.city" />
          </Label>
          <Button className={styles.geoButton}>Определить мое местоположение</Button>
          <Label className={styles.fieldsRow} title="Адрес *">
            <Textarea autoComplete="address-line1" name="address.address" className={styles.textarea} rows={3} />
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
              <span>Итого</span>
            </div>
            <div>
              <span>
                {cartStore.itemsCount} товар{getItemsAmountSuffix(cartStore.itemsCount)}
              </span>
              <span>{cartStore.total}</span>
            </div>
          </div>
          <Button disabled={isLoading} loading={isLoading} type="submit">
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
