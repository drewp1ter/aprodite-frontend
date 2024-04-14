import { Logo } from '@/compenents'
import { Category } from '../Category'
import { CategoriesButtons } from '../CategoriesButtons'
import { SearchBar } from '../SearchBar'
import pizza from './assets/1225.png'
import styles from './Page.module.scss'

export function Page() {
  return (
    <main className={styles.page}>
      <h1>Доставка еды</h1>
      <div className={styles.hero}>
        <SearchBar className={styles.searchBar} />
        <CategoriesButtons className={styles.categoriesButtons} />
      </div>
      <div className={styles.categories}>
        <Category className={styles.category} title="Пицца" imgSrc={pizza.src} url="" />
        <Category className={styles.category} title="Пицца" imgSrc={pizza.src} url="" />
        <Category className={styles.category} title="Пицца" imgSrc={pizza.src} url="" />
      </div>
      <Logo className={styles.logo} />
    </main>
  )
}
