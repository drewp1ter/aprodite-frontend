'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import clsx from 'clsx'
import { Button, SearchInput } from '@/ui'
import { getSearchProductsRoute } from '@/routes'
import styles from './SearchBar.module.scss'
export interface Props {
  className?: string
}

export function SearchBar({ className }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [query, setQuery] = useState(searchParams.get('query') || '')

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => setQuery(event.currentTarget.value)

  const handleSearchClick: React.MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation()
    router.push(getSearchProductsRoute(query))
  }

  const handleKeyDown:React.KeyboardEventHandler<HTMLElement> = (event) => {
    event.stopPropagation()
    
    if (event.key === 'Enter') {
      router.push(getSearchProductsRoute(query))
    }
  }

  return (
    <div className={clsx(styles.searchBar, className)}>
      <SearchInput className={styles.searchInput} value={query} onKeyDown={handleKeyDown} onChange={handleInputChange} placeholder="Искать Еду" />
      <Button.Filter className={styles.filterButton} onClick={handleSearchClick} />
    </div>
  )
}
