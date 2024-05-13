import { Spinner } from '@/ui'
import styles from './loading.module.scss'

export default function Loading() {
  return (
    <main className={styles.loading}><Spinner /></main>
  )
}