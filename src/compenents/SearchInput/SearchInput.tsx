import { forwardRef } from 'react'
import clsx from 'clsx'
import SearchIcon from './assets/search.svg'
import styles from './SearchInput.module.scss'

export const SearchInput = forwardRef<HTMLInputElement, JSX.IntrinsicElements['input']>(({ className, ...rest }, ref) => {
  return (
    <div className={clsx(styles.searchInput, className)}>
      <SearchIcon className={styles.searchIcon} />
      <input ref={ref} {...rest} />
    </div>
  )
})
