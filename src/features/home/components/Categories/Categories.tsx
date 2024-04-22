import clsx from 'clsx'
import { Category } from '..'
import { getCategoryProductsRoute } from '@/routes'
import * as api from '../../api'
import styles from './Categories.module.scss'

export interface Props {
  className?: string
}

export async function Categories({ className }: Props) {
  const categories = await api.fetchCategories()

  return (
    <div className={clsx(styles.categories, className)}>
      {categories.map((category) => (
        <Category
          key={category.id}
          className={styles.category}
          title={category.name}
          imgSrc={category.images[0]?.url}
          url={getCategoryProductsRoute(category.id)}
        />
      ))}
    </div>
  )
}
