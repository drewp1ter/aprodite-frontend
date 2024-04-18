import { ComponentProps } from 'react'
import clsx from 'clsx'
import styles from './Button.module.scss'
import FilterIcon from './assets/filter-icon.svg'
import ForkKnifeIcon from './assets/fork-knife.svg'
import PizzaIcon from './assets/pizza.svg'
import FishIcon from './assets/fish.svg'
import BurgerIcon from './assets/burger.svg'
import CupIcon from './assets/cup.svg'

function Button({ children, className, ...rest }: ComponentProps<'button'>) {
  return (
    <button className={clsx(styles.button, className)} {...rest}>
      {children}
    </button>
  )
}

Button.Filter = function ({ className, ...rest }: Omit<ComponentProps<'button'>, 'children'>) {
  return (
    <button className={clsx(styles.filter, className)} {...rest}>
      <FilterIcon />
    </button>
  )
}

Button.ForkKnife = function ({ className, ...rest }: Omit<ComponentProps<'button'>, 'children'>) {
  return (
    <button className={clsx(styles.quad, className)} {...rest}>
      <ForkKnifeIcon />
    </button>
  )
}

Button.Pizza = function ({ className, ...rest }: Omit<ComponentProps<'button'>, 'children'>) {
  return (
    <button className={clsx(styles.quad, className)} {...rest}>
      <PizzaIcon />
    </button>
  )
}

Button.Fish = function ({ className, ...rest }: Omit<ComponentProps<'button'>, 'children'>) {
  return (
    <button className={clsx(styles.quad, className)} {...rest}>
      <FishIcon />
    </button>
  )
}

Button.Burger = function ({ className, ...rest }: Omit<ComponentProps<'button'>, 'children'>) {
  return (
    <button className={clsx(styles.quad, className)} {...rest}>
      <BurgerIcon />
    </button>
  )
}

Button.Cup = function ({ className, ...rest }: Omit<ComponentProps<'button'>, 'children'>) {
  return (
    <button className={clsx(styles.quad, className)} {...rest}>
      <CupIcon />
    </button>
  )
}

Button.Radio = function ({ className, children, ...rest }: Omit<ComponentProps<'input'>, 'type'>) {
  return (
    <label className={clsx(styles.radio, className)}>
      <input {...rest} type='radio' />
      {children}
      <span />
    </label>
  )
}

export default Button
