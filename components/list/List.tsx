'use client'

import styles from './List.module.scss'
import { formatDate } from '@/utils/formatDate'
import { FiEdit } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'
import { useAppSelector } from '@/hooks/useAppSelector'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useActions } from '@/hooks/useActions'

export const List = () => {
  const { deleteNote } = useActions()
  const { notes } = useAppSelector(state => state.root)

  const handleDeleteNote = async (id: string) => {
    const { data } = await axios.delete(`api/note?id=${id}`)
    deleteNote({ id: data.res.id })
  }

  return (
    <div className={styles.wrapper}>
      <h3>Список Приема</h3>
      <div className={styles.list}>
        {notes.map((trans, idx) => (
          <motion.div className={styles.item} key={Math.random()}
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: idx / 5, type: 'spring' }}
          >
            <div className={styles.reception}>
              <span>{trans.weight.toFixed(2)} <b>x {trans.reception}</b> = </span>
              <span>{trans.money.toFixed(2)} р.</span>
            </div>
            <span className={styles.date}>{formatDate(trans.date)}</span>
            <div className={styles.buttons}>
              <FiEdit className={styles.edit} />
              <MdDelete onClick={() => handleDeleteNote(trans.id)} className={styles.delete} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
