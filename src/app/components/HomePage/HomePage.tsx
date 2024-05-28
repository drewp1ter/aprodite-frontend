import { Suspense } from 'react'
import { Logo, AutoSlider, SearchBar } from '@/app/ui'
import { Categories, CategoriesButtons } from '..'
import { getCategsOrProductsImages } from '@/lib'
import * as api from '../../api'
import styles from './HomePage.module.scss'

export async function HomePage() {
  let categories: CategoryDto[] = []

  try {
    categories = await api.fetchCategories()
  } catch (e) {
    console.error(e)
  }

  const categoriesImages = getCategsOrProductsImages(categories)

  return (
    <main className={styles.page}>
      <h1>Доставка еды</h1>
      <AutoSlider className={styles.autoSlider} images={categoriesImages} />
      <div className={styles.hero}>
        <Suspense>
          <SearchBar className={styles.searchBar} />
        </Suspense>
        <CategoriesButtons className={styles.categoriesButtons} />
      </div>
      <Categories className={styles.categories} />
      <Logo className={styles.logo} />
    </main>
  )
}
