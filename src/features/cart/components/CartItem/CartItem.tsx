'use client'
import clsx from 'clsx'
import Image from 'next/image'
import { Button } from '@/ui'
import { withStopPropagation } from '@/lib'
import TrashIcon from './assets/trash.svg'
import styles from './CartItem.module.scss'

export interface Props {
  className?: string
  item: CartItem
  onIncrementAmount?: (itemId: number) => void
  onDecrementAmount?: (itemId: number) => void
  onDelete?: (itemId: number) => void
}

export function CartItem({ className, item, onIncrementAmount, onDecrementAmount, onDelete }: Props) {
  return (
    <div className={clsx(styles.cartItem, className)}>
      <div className={styles.productImg}>
        <Image src={item.imgSrc} fill alt={item.name} />
      </div>
      <div className={styles.productInfo}>
        <TrashIcon onClick={withStopPropagation(onDelete, item.id)} />
        <h3>{item.name}</h3>
        <div className={styles.price}>
          <h5>{item.price}</h5>
          <div className={styles.amount}>
            <Button className={styles.buttonDecrease} onClick={withStopPropagation(onDecrementAmount, item.id)} />
            <b>{item.amount}</b>
            <Button className={styles.buttonIncrease} onClick={withStopPropagation(onIncrementAmount, item.id)} />
          </div>
        </div>
      </div>
    </div>
  )
}