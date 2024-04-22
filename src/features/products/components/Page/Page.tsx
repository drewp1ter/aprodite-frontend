import Image from 'next/image'
import { Logo, AutoSlider, SearchBar } from '@/compenents'
import { ProductsList } from '..'
import { CategoriesButtons } from '@/features/home/components'
import slider from './assets/slider1.png'
import * as api from '../../api'
import styles from './Page.module.scss'

interface Params {
  categoryId: string
}

interface Props {
  params: Params
}

export async function Page({ params }: Props) {
  const { category, products } = await api.fetchCategoryAndProducts(params.categoryId)
  return (
    <main className={styles.productsPage}>
      <h1>Доставка еды</h1>
      <div className={styles.hero}>
        <SearchBar className={styles.searchBar} />
        <CategoriesButtons className={styles.categoriesButtons} />
      </div>
      <h2>{category.name}</h2>
      <AutoSlider className={styles.autoSlider}>
        <Image className={styles.slide} src={slider.src} alt="" fill />
        <Image className={styles.slide} src={slider.src} alt="" fill />
        <Image className={styles.slide} src={slider.src} alt="" fill />
      </AutoSlider>
      <ProductsList
        className={styles.productsList}
        products={products}
      />

      <Logo className={styles.logo} />
    </main>
  )
}
