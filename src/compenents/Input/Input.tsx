import { forwardRef } from 'react'
import clsx from 'clsx'
import styles from './Input.module.scss'

export const Input = forwardRef<HTMLInputElement, JSX.IntrinsicElements['input']>(({ className, ...rest }, ref) => {
  return <input ref={ref} className={clsx(styles.input, className)} {...rest} />
})