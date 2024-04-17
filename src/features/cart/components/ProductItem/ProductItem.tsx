'use client'
import clsx from 'clsx'
import Image from 'next/image'
import { Button } from '@/compenents'
import TrashIcon from './assets/trash.svg'
import styles from './ProductItem.module.scss'

export interface Props {
  className?: string
  title: string
  price: string
  imgSrc: string
  onAmountChange?: (amount: number) => void
  amount?: number
}

export function ProductItem({ className, title, price, imgSrc, amount, onAmountChange }: Props) {
  return (
    <div className={clsx(styles.productItem, className)}>
      <div className={styles.productImg}>
        <Image src={imgSrc} fill alt="" />
      </div>
      <div className={styles.productInfo}>
        <TrashIcon />
        <h3>{title}</h3>
        <div className={styles.price}>
          <h5>{price}</h5>
          <div className={styles.amount}>
            <Button className={styles.buttonDecrease} />
            <b>{amount}</b>
            <Button className={styles.buttonIncrease} />
          </div>
        </div>
      </div>
    </div>
  )
}
