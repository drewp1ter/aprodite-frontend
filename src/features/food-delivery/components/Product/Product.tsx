import Image from 'next/image'
import clsx from 'clsx'
import { Button } from '@/compenents'
import CartIcon from './assets/cart.svg'
import styles from './Product.module.scss'

export interface Props {
  className?: string
  title: string
  price: number
  weight?: number
  calories?: number
  proteins?: number
  fats?: number
  carbonhydrates?: number
  imgSrc: string
}

export function Product(props: Props) {
  return (
    <div className={clsx(styles.product, props.className)}>
      <div className={styles.imgContainer}>
        <Image fill src={props.imgSrc} alt="" />
      </div>
      <div className={styles.title}>
        <h3>{props.title}</h3>
        <b>{props.price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 })}</b>
      </div>
      <div className={styles.footer}>
        <div className={styles.info}>
          <div>
            <small>Вес</small>
            <small>{props.weight} Г</small>
          </div>
          <div>
            <small>Ккал</small>
            <small>{props.calories}</small>
          </div>
          <div>
            <small>Б / Ж / У</small>
            <small>
              {props.proteins} Г / {props.fats} Г / {props.carbonhydrates} Г
            </small>
          </div>
        </div>
        <Button className={styles.button}>
          <CartIcon />
        </Button>
      </div>
    </div>
  )
}
