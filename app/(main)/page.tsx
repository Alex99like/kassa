'use client'

import Image from 'next/image'
import styles from './page.module.scss'
import { Money } from '@/components/money/Money'
import { Weight } from '@/components/weight/Weight'
import { List } from '@/components/list/List'
import { Control } from '@/components/control/Control'
import { Note } from '@/components/modals/Note'
import { useAppSelector } from '@/hooks/useAppSelector'

export default function Home() {
  const { modal } = useAppSelector(state => state.root)

  return (
    <main className={styles.main}>
      {modal && <Note />}
      <div className={styles.navbar}>
        <Weight />
        <Money />
      </div>
      <List />
      <Control />
    </main>
  )
}
