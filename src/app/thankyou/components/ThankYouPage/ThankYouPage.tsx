'use client'
import styles from './ThankYouPage.module.scss'
import { useSearchParams } from 'next/navigation'

export function ThankYouPage() {
  const paymentType = useSearchParams().get('payment')

  let text
  if (paymentType === 'online') {
    text = (
      <>
        <h1>Заказ оплачен.</h1>
        <p>Наш администратор свяжется с вами для уточнения деталей доставки.</p>
      </>
    )
  }

  if (paymentType === 'cash') {
    text = (
      <>
        <h1>Заказ оформлен.</h1>
        <p>Наш администратор свяжется с вами для уточнения заказа.</p>
      </>
    )
  }

  return (
    <main className={styles.thankYouPage}>
      <noindex>{text}</noindex>
    </main>
  )
}
