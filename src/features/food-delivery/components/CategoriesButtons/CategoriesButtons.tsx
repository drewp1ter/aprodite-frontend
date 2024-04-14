import clsx from 'clsx'
import Link from 'next/link'
import { Button, Label } from '@/compenents'
import styles from './CategoriesButtons.module.scss'

export interface Props {
  className?: string
}

export function CategoriesButtons({ className }: Props) {
  return (
    <div className={clsx(styles.categoriesButtons, className)}>
      <Label title="Все" position="bottom" align="center">
        <Link href="#">
          <Button.ForkKnife />
        </Link>
      </Label>
      <Label title="Пицца" position="bottom" align="center">
        <Link href="#">
          <Button.Pizza />
        </Link>
      </Label>
      <Label className={styles.longLabel} title="Морепродукты" position="bottom" align="center">
        <Link href="#">
          <Button.Fish />
        </Link>
      </Label>
      <Label title="Фастфуд" position="bottom" align="center">
        <Link href="#">
          <Button.Burger />
        </Link>
      </Label>
      <Label title="Напитки" position="bottom" align="center">
        <Link href="#">
          <Button.Cup />
        </Link>
      </Label>
    </div>
  )
}
