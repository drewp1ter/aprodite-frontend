import { forwardRef, ComponentProps } from 'react'
import clsx from 'clsx'
import styles from './Input.module.scss'

export const Input = forwardRef<HTMLInputElement, ComponentProps<'input'>>(function ({ className, ...rest }, ref) {
  return <input ref={ref} className={clsx(styles.input, className)} {...rest} />
})

Input.displayName = 'Input'