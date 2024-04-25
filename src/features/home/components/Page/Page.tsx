import { Logo, AutoSlider, SearchBar } from '@/ui'
import { Categories, CategoriesButtons } from '..'
import * as api from '../../api'
import styles from './Page.module.scss'

export async function Page() {
  const categories = await api.fetchCategories()

  const categoriesImages = categories
    .reduce<ImageDto[][]>((result, category) => {
      if (category.images.length && result.length < 11) result.push(category.images)
      return result
    }, [])
    .flat()

  return (
    <main className={styles.page}>
      <h1>Доставка еды</h1>
      <AutoSlider className={styles.autoSlider} images={categoriesImages} />
      <div className={styles.hero}>
        <SearchBar className={styles.searchBar} />
        <CategoriesButtons className={styles.categoriesButtons} />
      </div>
      <Categories className={styles.categories} />
      <Logo className={styles.logo} />
    </main>
  )
}
