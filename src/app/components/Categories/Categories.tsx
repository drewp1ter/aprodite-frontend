import clsx from 'clsx'
import { Category } from '..'
import { getCategoryProductsRoute } from '@/routes'
import * as api from '../../api'
import styles from './Categories.module.scss'

export interface Props {
  className?: string
}

export async function Categories({ className }: Props) {
  let categories: CategoryDto[] = []

  try {
    categories = await api.fetchCategories()
  } catch (e) {
    console.error(e)
  }

  return (
    <div className={clsx(styles.categories, className)}>
      {categories.map((category) => (
        <Category
          key={category.id}
          className={styles.category}
          title={category.name}
          imgSrc={category.images.at(-1)?.url || ''}
          url={getCategoryProductsRoute(category.id)}
        />
      ))}
    </div>
  )
}
