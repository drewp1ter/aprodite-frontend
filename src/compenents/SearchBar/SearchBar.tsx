'use client'
import { useState } from 'react'
import clsx from 'clsx'
import { Button, SearchInput } from '@/compenents'
import styles from './SearchBar.module.scss'

export interface Props {
  className?: string
}

export function SearchBar({ className }: Props) {
  const [searchText, setSearchText] = useState('')

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchText(e.currentTarget.value)
  }

  return (
    <div className={clsx(styles.searchBar, className)}>
      <SearchInput className={styles.searchInput} value={searchText} onChange={handleInputChange} placeholder="Искать Еду" />
      <Button.Filter className={styles.filterButton} />
    </div>
  )
}
