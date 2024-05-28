import { Logo, AutoSlider, SearchBar } from '@/app/ui'
import { Suspense } from 'react'
import { ProductsList } from '..'
import { CategoriesButtons } from '@/app/components'
import * as api from '../../api'
import styles from './ProductsPage.module.scss'

export interface Props {
  categoryId?: string
  images?: ImageDto[]
}

export async function ProductsPage({ categoryId, images }: Props) {
  let category
  
  if (categoryId) {
    try {
      category = await api.fetchCategory(categoryId)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <main className={styles.productsPage}>
      <h1>Доставка еды</h1>
      <div className={styles.hero}>
        <Suspense>
          <SearchBar className={styles.searchBar} />
        </Suspense>
        <CategoriesButtons className={styles.categoriesButtons} />
      </div>
      <h2>{category?.name || ''}</h2>
      <AutoSlider className={styles.autoSlider} images={images} />
      <ProductsList className={styles.productsList} category={category} />
      <Logo className={styles.logo} />
    </main>
  )
}
