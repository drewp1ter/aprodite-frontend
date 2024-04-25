import { PropsWithChildren, Children } from 'react'
import clsx from 'clsx'
import styles from './Steps.module.scss'

export interface Props extends PropsWithChildren {
  className?: string
  currentStep: number
}

export function Steps({ className, currentStep, children }: Props) {
  return (
    <div className={clsx(styles.steps, className)}>
      {Children.map(children, (child, idx) => (
        <div className={styles.step} data-active={currentStep === idx}>
          <div>{idx + 1}</div>
          {child}
        </div>
      ))}
    </div>
  )
}
