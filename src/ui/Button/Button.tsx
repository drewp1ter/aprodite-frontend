import { ComponentProps } from 'react'
import clsx from 'clsx'
import styles from './Button.module.scss'
import FilterIcon from './assets/filter-icon.svg'
import ForkKnifeIcon from './assets/fork-knife.svg'
import PizzaIcon from './assets/pizza.svg'
import FishIcon from './assets/fish.svg'
import BurgerIcon from './assets/burger.svg'
import CupIcon from './assets/cup.svg'

export interface Props extends ComponentProps<'button'> {
  loading?: boolean
}

function Button({ children, className, loading, ...rest }: Props) {
  return (
    <button className={clsx(styles.button, className, loading && styles.loading)} {...rest}>
      {children}
    </button>
  )
}

const ButtonFilter = function ({ className, ...rest }: Omit<ComponentProps<'button'>, 'children'>) {
  return (
    <button className={clsx(styles.filter, className)} {...rest}>
      <FilterIcon />
    </button>
  )
}

const ButtonForkKnife = function ({ className, ...rest }: Omit<ComponentProps<'button'>, 'children'>) {
  return (
    <button className={clsx(styles.quad, className)} {...rest}>
      <ForkKnifeIcon />
    </button>
  )
}

const ButtonPizza = function ({ className, ...rest }: Omit<ComponentProps<'button'>, 'children'>) {
  return (
    <button className={clsx(styles.quad, className)} {...rest}>
      <PizzaIcon />
    </button>
  )
}

const ButtonFish = function ({ className, ...rest }: Omit<ComponentProps<'button'>, 'children'>) {
  return (
    <button className={clsx(styles.quad, className)} {...rest}>
      <FishIcon />
    </button>
  )
}

const ButtonBurger = function ({ className, ...rest }: Omit<ComponentProps<'button'>, 'children'>) {
  return (
    <button className={clsx(styles.quad, className)} {...rest}>
      <BurgerIcon />
    </button>
  )
}

const ButtonCup = function ({ className, ...rest }: Omit<ComponentProps<'button'>, 'children'>) {
  return (
    <button className={clsx(styles.quad, className)} {...rest}>
      <CupIcon />
    </button>
  )
}

const ButtonRadio = function ({ className, children, ...rest }: Omit<ComponentProps<'input'>, 'type'>) {
  return (
    <label className={clsx(styles.radio, className)}>
      <input {...rest} type='radio' />
      <span />
      {children}
    </label>
  )
}

Button.displayName = 'Button'
ButtonFilter.displayName = 'ButtonFilter'
ButtonForkKnife.displayName = 'ButtonForkKnife'
ButtonPizza.displayName = 'ButtonPizza'
ButtonFish.displayName = 'ButtonFish'
ButtonBurger.displayName = 'ButtonBurger'
ButtonCup.displayName = 'ButtonCup'
ButtonRadio.displayName = 'ButtonRadio'

Button.Filter = ButtonFilter
Button.ForkKnife = ButtonForkKnife
Button.Pizza = ButtonPizza
Button.Fish = ButtonFish
Button.Burger = ButtonBurger
Button.Cup = ButtonCup
Button.Radio = ButtonRadio

export default Button
