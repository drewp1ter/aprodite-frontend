'use client'
import { useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import { Button } from '@/compenents'
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
        <Image src={imgSrc} width={124} height={114} alt="" />
      </div>
      <div className={styles.productInfo}>
        <h3>{title}</h3>
        <h5>{price}</h5>
        <div className={styles.amount}>
          <Button className={styles.buttonDecrease} />
          <h5>{amount}</h5>
          <Button className={styles.buttonIncrease} />
        </div>
      </div>
    </div>
  )
}
