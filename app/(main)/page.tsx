import Image from 'next/image'
import styles from './page.module.scss'
import { Money } from '@/components/money/Money'
import { Weight } from '@/components/weight/Weight'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.navbar}>
        <Weight />
        <Money />
      </div>
    </main>
  )
}
