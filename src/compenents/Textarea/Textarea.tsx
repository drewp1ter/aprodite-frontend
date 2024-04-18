import { forwardRef, ComponentProps } from 'react'
import clsx from 'clsx'
import styles from './Textarea.module.scss'

export const Textarea = forwardRef<HTMLTextAreaElement, ComponentProps<'textarea'>>(({ className, children, ...rest }, ref) => {
  return <textarea ref={ref} className={clsx(styles.textarea, className)} {...rest}>{children}</textarea>
})