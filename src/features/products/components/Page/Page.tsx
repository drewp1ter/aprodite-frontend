import { Logo, AutoSlider, SearchBar } from '@/ui'
import { ProductsList } from '..'
import { CategoriesButtons } from '@/features/home/components'
import * as api from '../../api'
import styles from './Page.module.scss'

export interface Props {
  categoryId: string
}

export async function Page({ categoryId }: Props) {
  const category = await api.fetchCategory(categoryId)
  const products = await api.fetchProducts(categoryId)

  const productsImages = products
    .reduce<ImageDto[][]>((result, product) => {
      if (product.images.length && result.length <= 10) result.push(product.images)
      return result
    }, [])
    .flat()

  return (
    <main className={styles.productsPage}>
      <h1>Доставка еды</h1>
      <div className={styles.hero}>
        <SearchBar className={styles.searchBar} />
        <CategoriesButtons className={styles.categoriesButtons} />
      </div>
      <h2>{category.name}</h2>
      <AutoSlider className={styles.autoSlider} images={productsImages} />
      <ProductsList className={styles.productsList} />
      <Logo className={styles.logo} />
    </main>
  )
}
