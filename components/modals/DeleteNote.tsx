import styles from './Note.module.scss'
import cn from 'clsx'
import { motion } from 'framer-motion'

interface DeleteNoteProps {
  note: { val: number, id: string, edit: 'weight' | 'container' }
  handleDelete: (val: { val: number, id: string, edit: 'weight' | 'container' }) => void
  onClose: () => void
}

export const DeleteNote = ({ note, handleDelete, onClose }: DeleteNoteProps) => {
  const deleteNote = () => {
    handleDelete(note)
    onClose()
  }

  return (
    <motion.div className={styles['modal-delete-note']}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div className={styles.modal}
        initial={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: -20 }}
      >
        <h3>Удалить Запись</h3>
        <div className={cn(styles.value, styles[note.edit])}>
          {note.edit === 'weight' ? 'Вес' : 'Тара'} - {note.val}кг.
        </div>
        <div className={styles.buttons}>
          <button onClick={onClose}>НЕТ</button>
          <button onClick={deleteNote} >ДА</button>
        </div>
      </motion.div>
    </motion.div>
  )
}
