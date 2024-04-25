'use client'
import { observer } from 'mobx-react-lite'
import { useCartStore } from '@/features/cart/store'
import { Steps, Label, Input, Button, Textarea } from '@/ui'
import styles from './Checkout.module.scss'
import * as images from './images'

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

export const CheckoutPage = observer(function CheckoutPage() {
  const { itemsCount, total } = useCartStore()

  const formAction = (formData: FormData) => {
    for (const entry of formData.entries()) {
      console.log(entry)
    }
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
      <form className={styles.content} action={formAction}>
        <fieldset className={styles.fieldset}>
          <div className={styles.nameAndPhone}>
            <Label title="Имя *">
              <Input name="name" />
            </Label>
            <Label title="Телефон *">
              <Input name="phone" />
            </Label>
          </div>
          <Label className={styles.fieldsRow} title="Город *">
            <Input name="city" />
          </Label>
          <Button className={styles.geoButton}>Определить мое местоположение</Button>
          <Label className={styles.fieldsRow} title="Адрес *">
            <Textarea name="address" className={styles.textarea} rows={3} />
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
            <Button.Radio name="group1">Оплата при доставке</Button.Radio>
            <Button.Radio checked name="group1">
              Банковская карта <img src={images.CARDS} alt='banks' />
            </Button.Radio>
          </div>
          <div className={styles.cards}>
            <img src={images.VISA} alt="visa" />
            <img src={images.MASTER_CARD} alt="mastercard" />
            <img src={images.PAYPAL} alt="paypal" />
            <img src={images.MIR} alt="mir" />
          </div>
        </fieldset>
        <div className={styles.summary}>
          <h6>Ваш заказ</h6>
          <div className={styles.total}>
            <div>
              <span>В корзине</span>
              <span>Итого</span>
            </div>
            <div>
              <span>
                {itemsCount} товар{getItemsAmountSuffix(itemsCount)}
              </span>
              <span>{total}</span>
            </div>
          </div>
          <Button type="submit">Подтвердить заказ</Button>
        </div>
      </form>
    </main>
  )
})
