import clsx from 'clsx'
import styles from './Spinner.module.scss'

export interface Props {
  className?: string
}

export function Spinner({ className }: Props) {
  return <span className={clsx(styles.spinner, className)}></span>
}