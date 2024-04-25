import clsx from 'clsx'
import Link from 'next/link'
import { Button, Label } from '@/ui'
import styles from './CategoriesButtons.module.scss'

export interface Props {
  className?: string
}

export function CategoriesButtons({ className }: Props) {
  return (
    <div className={clsx(styles.categoriesButtons, className)}>
      <Label className={styles.button} title="Все" position="bottom" align="center">
        <Link href="#">
          <Button.ForkKnife />
        </Link>
      </Label>
      <Label className={styles.button} title="Пицца" position="bottom" align="center">
        <Link href="#">
          <Button.Pizza />
        </Link>
      </Label>
      <Label className={clsx(styles.longLabel, styles.button)} title="Морепродукты" position="bottom" align="center">
        <Link href="#">
          <Button.Fish />
        </Link>
      </Label>
      <Label className={styles.button} title="Фастфуд" position="bottom" align="center">
        <Link href="#">
          <Button.Burger />
        </Link>
      </Label>
      <Label className={styles.button} title="Напитки" position="bottom" align="center">
        <Link href="#">
          <Button.Cup />
        </Link>
      </Label>
    </div>
  )
}
