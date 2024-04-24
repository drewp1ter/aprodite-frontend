import Image from 'next/image'
import { Logo, AutoSlider, SearchBar } from '@/compenents'
import { ProductsList } from '..'
import { CategoriesButtons } from '@/features/home/components'
import * as api from '../../api'
import slider from './assets/slider1.png'
import styles from './Page.module.scss'

export interface Props {
  categoryId: string
}

export async function Page({ categoryId }: Props) {
  const category = await api.fetchCategory(categoryId)

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
      />
      <Logo className={styles.logo} />
    </main>
  )
}

