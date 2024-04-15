'use client'
import clsx from 'clsx'
import styles from './ViewSelector.module.scss'
import GridIcon from './assets/grid.svg'
import ListIcon from './assets/list.svg'

enum Values {
  Grid = 'grid',
  List = 'list'
}

export type ViewType = `${Values}`

export interface Props {
  value?: ViewType | null
  className?: string
  onSelect?: (value: ViewType) => void
}

export function ViewSelector({ className, value, onSelect }: Props) {
  const handleClick: React.MouseEventHandler<HTMLOrSVGElement> = (event) => {
    onSelect && onSelect(event.currentTarget.dataset.value as ViewType)
  }

  return (
    <div className={clsx(styles.viewSelector, className)} data-selected={value}>
      <ListIcon className={styles.list} onClick={handleClick} data-value={Values.List} />
      <GridIcon className={styles.grid} onClick={handleClick} data-value={Values.Grid} />
    </div>
  )
}
