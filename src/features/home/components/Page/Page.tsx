import Image from 'next/image'
import { Logo, AutoSlider, SearchBar } from '@/ui'
import { Categories, CategoriesButtons } from '..'
import slider from './assets/slider1.png'
import styles from './Page.module.scss'

export function Page() {
  return (
    <main className={styles.page}>
      <h1>Доставка еды</h1>
      <AutoSlider className={styles.autoSlider}>
        <Image className={styles.slide} src={slider.src} alt="" fill />
        <Image className={styles.slide} src={slider.src} alt="" fill />
        <Image className={styles.slide} src={slider.src} alt="" fill />
      </AutoSlider>  
      <div className={styles.hero}>
        <SearchBar className={styles.searchBar} />
        <CategoriesButtons className={styles.categoriesButtons} />
      </div>
      <Categories className={styles.categories} />
      <Logo className={styles.logo} />
    </main>
  )
}
