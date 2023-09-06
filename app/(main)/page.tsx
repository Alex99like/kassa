'use client'

import styles from './page.module.scss'
import { Money } from '@/components/money/Money'
import { Weight } from '@/components/weight/Weight'
import { List } from '@/components/list/List'
import { Control } from '@/components/control/Control'
import { Note } from '@/components/note/Note'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useEffect } from 'react'
import axios from 'axios'
import { useActions } from '@/hooks/useActions'

export default function Home() {
  const { setNotes } = useActions()
  const { modal } = useAppSelector(state => state.root)

  useEffect(() => {
    axios.get(`api/note`).then(res => {
      const { data } = res;
      setNotes({ notes: data.notes })
    })
  }, [])

  return (
  <>
    <main className={styles.main}>
      <Note />
      <div className={styles.navbar}>
        <Weight />
        <Money />
      </div>
      <List />
      <Control />
    </main>
  </>  
  )
}
