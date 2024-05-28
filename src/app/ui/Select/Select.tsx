'use client'
import React, { useReducer } from 'react'
import clsx from 'clsx'
import styles from './Select.module.scss'
interface IProps<Option> {
  options?: Option[]
  className?: string
  value?: Option
  placeholder?: string
  required?: boolean
  onChange?: (option: Option) => void
  optionRender?: (option: Option) => React.ReactNode
}

type SelectT = <T = any>(props: IProps<T>) => React.ReactElement

export const Select: SelectT = ({ className, options, value, placeholder, onChange, optionRender }) => {
  const [isOpen, toggleIsOpen] = useReducer((value) => !value, false)

  const handleClckOutside: React.FocusEventHandler<HTMLDivElement> = (event) => {
    !event.currentTarget.contains(event.relatedTarget as Node) && isOpen && toggleIsOpen()
  }

  const handleOptionClick: React.MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation()
    const index = event.currentTarget.dataset.index!
    options && onChange && onChange(options[+index])
    isOpen && toggleIsOpen()
  }

  return (
    <div className={clsx(styles.selectContainer, className)} tabIndex={0} onBlur={handleClckOutside} data-opened={isOpen}>
      <div className={styles.select} onClick={toggleIsOpen}>
        {value ? (
          <span className={styles.value}>{optionRender ? optionRender(value) : (value as any)}</span>
        ) : (
          <span className={styles.placeholder}>{placeholder}</span>
        )}
        <i className={styles.arrow} />
      </div>

      {isOpen && (
        <ul className={styles.dropdown}>
          {options?.map((option, idx) => (
            <li key={idx} className={styles.option} onClick={handleOptionClick} data-index={idx}>
              {optionRender ? optionRender(option) : (option as any)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
