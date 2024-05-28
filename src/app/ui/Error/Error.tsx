import { PropsWithChildren } from 'react'
import clsx from "clsx"
import styles from './Error.module.scss'

export interface Props extends PropsWithChildren {
  className?: string
  error: string
}

export function Error({ error, className, children }: Props) {
  return (
    <div className={clsx(styles.error, className)} data-error={error}>
      {children}
    </div>
  )
}