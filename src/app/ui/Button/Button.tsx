import { ComponentProps } from 'react'
import clsx from 'clsx'
import * as Assets from './assets'
import styles from './Button.module.scss'

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
      <Assets.FilterIcon />
    </button>
  )
}

const ButtonForkKnife = function ({ className, ...rest }: Omit<ComponentProps<'button'>, 'children'>) {
  return (
    <button className={clsx(styles.quad, className)} {...rest}>
      <Assets.ForkKnifeIcon />
    </button>
  )
}

const ButtonPizza = function ({ className, ...rest }: Omit<ComponentProps<'button'>, 'children'>) {
  return (
    <button className={clsx(styles.quad, className)} {...rest}>
      <Assets.PizzaIcon />
    </button>
  )
}

const ButtonFish = function ({ className, ...rest }: Omit<ComponentProps<'button'>, 'children'>) {
  return (
    <button className={clsx(styles.quad, className)} {...rest}>
      <Assets.FishIcon />
    </button>
  )
}

const ButtonBurger = function ({ className, ...rest }: Omit<ComponentProps<'button'>, 'children'>) {
  return (
    <button className={clsx(styles.quad, className)} {...rest}>
      <Assets.BurgerIcon />
    </button>
  )
}

const ButtonCup = function ({ className, ...rest }: Omit<ComponentProps<'button'>, 'children'>) {
  return (
    <button className={clsx(styles.quad, className)} {...rest}>
      <Assets.CupIcon />
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
