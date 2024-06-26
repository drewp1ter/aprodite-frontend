import { useState, useMemo, memo } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import { Button } from '@/app/ui'
import { withStopPropagation } from '@/lib'
import styles from './CartItem.module.scss'
import { CartItem as CartItemModel } from '../../models'

export interface Props {
  className?: string
  item: CartItemModel
  onIncrementAmount?: (itemId: number) => void
  onDecrementAmount?: (itemId: number) => void
}

export default memo(function CartItem({ className, item, onIncrementAmount, onDecrementAmount }: Props) {
  const [imgLoadStatus, setIsImgLoadStatus] = useState<false | 'success' | 'failure'>(false)

  const handleOnImgLoad = () => setIsImgLoadStatus('success')
  const handleOnImgError = () => setIsImgLoadStatus('failure')

  const img = useMemo(() => <Image src={item.imgSrc} fill alt={item.name} onLoad={handleOnImgLoad} onError={handleOnImgError} />, [])

  return (
    <div className={clsx(styles.cartItem, className)}>
      <div className={clsx(styles.productImg, imgLoadStatus === 'failure' && 'imgPlaceholder')} data-status={imgLoadStatus}>
        {img}
      </div>
      <div className={styles.productInfo}>
        <h3>{item.name}</h3>
        <div className={styles.price}>
          <h5>{item.priceFormated}</h5>
          <div className={styles.amount}>
            <Button className={styles.buttonDecrease} onClick={withStopPropagation(onDecrementAmount, item.productId)} />
            <b>{item.amount}</b>
            <Button className={styles.buttonIncrease} onClick={withStopPropagation(onIncrementAmount, item.productId)} />
          </div>
        </div>
      </div>
    </div>
  )
})
