import clsx from 'clsx'
import { PropsWithChildren } from 'react'
import styles from './Label.module.scss'

export interface Props extends PropsWithChildren {
  className?: string
  title: string
  position?: 'top' | 'bottom'
  align?: 'left' | 'center' | 'right'
}

export function Label({ className, children, title, position = 'top', align = 'left' }: Props) {
  return (
    <label className={clsx(styles.label, className)} data-position={position} data-align={align} data-title={title}>
      {children}
    </label>
  )
}
