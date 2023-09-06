import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Note.module.scss'

interface EditNoteProps {
  note: { val: number, id: string, edit: 'weight' | 'container' }
  handleEdit: (val: { val: number, id: string, edit: 'weight' | 'container' }, newValue: number) => void
  onClose: () => void
}

export const EditNote = ({ note, onClose, handleEdit }: EditNoteProps) => {
  const [value, setValue] = useState(note.val.toString())

  const save = () => {
    handleEdit(note, +value)
    onClose()
  }

  return (
    <motion.div className={styles['modal-edit-note']}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div className={styles.modal}
        initial={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: -20 }}
      >
      <h3>Изменить <span className={styles[note.edit]}>{note.edit === 'weight' ? 'Вес' : 'Тару'}</span></h3>
      <div>
          <input 
            value={value} 
            onChange={(e) => setValue(e.target.value)} 
            type="number" />
          <span>кг.</span>
        </div>
        <div className={styles.buttons}>
          <button onClick={onClose}>Закрыть</button>
          <button onClick={save}>Сохранить</button>
        </div>
      </motion.div>
    </motion.div>
  )
}
