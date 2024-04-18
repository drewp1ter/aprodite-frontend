import { Steps, Label, Input, Button, Textarea } from '@/compenents'
import styles from './Checkout.module.scss'
import * as images from './images'

export function CheckoutPage() {
  return (
    <main className={styles.checkoutPage}>
      <div className={styles.head}>
        <h1>Оформление заказа</h1>
        <Steps className={styles.steps} currentStep={1}>
          <b>Корзина</b>
          <b>Оформление заказа</b>
        </Steps>
      </div>
      <div className={styles.content}>
        <fieldset className={styles.fieldset}>
          <div className={styles.nameAndPhone}>
            <Label title="Имя *">
              <Input />
            </Label>
            <Label title="Телефон *">
              <Input />
            </Label>
          </div>
          <Label className={styles.fieldsRow} title="Город *">
            <Input />
          </Label>
          <Button className={styles.geoButton}>Определить мое местоположение</Button>
          <Label className={styles.fieldsRow} title="Адрес  *">
            <Textarea rows={3} />
          </Label>
          <Label className={styles.fieldsRow} title="Детали">
            <Textarea rows={3} placeholder="Примечания к вашему заказу, например, особые пожелания отделу доставки." />
          </Label>
          <div className={styles.radioButtons}>
            <Button.Radio name="group1">Оплата при доставке</Button.Radio>
            <Button.Radio name="group1">
              Банковская карта <img src={images.CARDS} />
            </Button.Radio>
          </div>
          <div className={styles.cards}>
            <img src={images.VISA} />
            <img src={images.MASTER_CARD} />
            <img src={images.PAYPAL} />
            <img src={images.MIR} />
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
              <span>2 товара</span>
              <span>1580 ₽</span>
            </div>
          </div>
          <Button>Подтвердить заказ</Button>
        </div>
      </div>
    </main>
  )
}
