import Image from 'next/image'
import { Logo, AutoSlider } from '@/compenents'
import { CategoriesButtons, SearchBar, ProductsList } from '..'
import slider from './assets/slider1.png'
import styles from './ProductsPage.module.scss'
import productImg from './assets/product.png'

export function ProductsPage() {
  return (
    <main className={styles.productsPage}>
      <h1>Доставка еды</h1>
      <div className={styles.hero}>
        <SearchBar className={styles.searchBar} />
        <CategoriesButtons className={styles.categoriesButtons} />
      </div>
      <h2>Пицца</h2>
      <AutoSlider className={styles.autoSlider}>
        <Image className={styles.slide} src={slider.src} alt="" fill />
        <Image className={styles.slide} src={slider.src} alt="" fill />
        <Image className={styles.slide} src={slider.src} alt="" fill />
      </AutoSlider>
      <ProductsList
        className={styles.productsList}
        products={[
          { name: 'Мидии в тайском стиле', imgSrc: productImg.src, createdAt: new Date(), updatedAt: new Date(), weight: 200, calories: 476, proteins: 23.5, fats: 20.8, carbonhydrates: 48.7, price: '1650', id: 1 },
          { name: 'Мидии в тайском стиле', imgSrc: productImg.src, createdAt: new Date(), updatedAt: new Date(), weight: 200, calories: 476, proteins: 23.5, fats: 20.8, carbonhydrates: 48.7, price: '1650', id: 2 },
          { name: 'Мидии в тайском стиле', imgSrc: productImg.src, createdAt: new Date(), updatedAt: new Date(), weight: 200, calories: 476, proteins: 23.5, fats: 20.8, carbonhydrates: 48.7, price: '1650', id: 3 },
          { name: 'Мидии в тайском стиле', imgSrc: productImg.src, createdAt: new Date(), updatedAt: new Date(), weight: 200, calories: 476, proteins: 23.5, fats: 20.8, carbonhydrates: 48.7, price: '1650', id: 4 }
        ]}
      />

      <Logo className={styles.logo} />
    </main>
  )
}
