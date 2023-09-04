import Image from 'next/image'
import styles from './page.module.scss'
import { Money } from '@/components/money/Money'
import { Weight } from '@/components/weight/Weight'
import { List } from '@/components/list/List'
import { Control } from '@/components/control/Control'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.navbar}>
        <Weight />
        <Money />
      </div>
      <List />
      <Control />
    </main>
  )
}
