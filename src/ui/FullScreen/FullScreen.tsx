import { PropsWithChildren } from 'react'
import clsx from 'clsx'
import styles from './FullScreen.module.scss'

export interface Props extends PropsWithChildren {
  className?: string
  isOpen?: boolean
}

export function FullScreen({ className, children, isOpen }: Props) {
  if (!isOpen) return null
  return (
    <div className={clsx(styles.fullScreen, className)}>
      {children}
    </div>  
  )
}