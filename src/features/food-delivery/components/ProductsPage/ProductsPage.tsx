import Image from 'next/image'
import { Logo, AutoSlider } from '@/compenents'
import { CategoriesButtons } from '../CategoriesButtons'
import { SearchBar } from '../SearchBar'
import { Product } from '../Product'
import slider from './assets/slider1.png'
import productImg from './assets/product.png'
import styles from './ProductsPage.module.scss'

export function ProductsPage() {
  return (
    <main className={styles.productsPage}>
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
      <div className={styles.products}>
        <Product
          // className={styles.productCompact}
          title="Мидии в тайском стиле"
          imgSrc={productImg.src}
          calories={476}
          carbonhydrates={48.7}
          fats={20.8}
          proteins={23.5}
          weight={200}
          price={1650}
        />
      </div>
      <Logo className={styles.logo} />
    </main>
  )
}
