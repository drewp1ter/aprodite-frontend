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
      <SearchBar className={styles.searchBar} />
      <CategoriesButtons className={styles.categoriesButtons} />
      <Category className={styles.category} title="Пицца" imgSrc={pizza.src} url="" />
      <Category className={styles.category} title="Пицца" imgSrc={pizza.src} url="" />
      <Category className={styles.category} title="Пицца" imgSrc={pizza.src} url="" />
      <Logo className={styles.logo} />
    </main>
  )
}
