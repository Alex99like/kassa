import { useState } from 'react'
import styles from './Note.module.scss'
import { motion } from 'framer-motion'

interface SaveNoteProps {
  weight: number
  container: number
  result: number
  reception: number
  save: () => Promise<void>
  onClose: () => void
}

export const SaveNote = ({ weight, container, reception, result, onClose, save }: SaveNoteProps) => {
  const [disabled, setDisabled] = useState(false)
  const handleSave = async () => {
    setDisabled(true)
    await save()
    onClose()
  }
  
  return (
    <motion.div className={styles['modal-save-note']}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div className={styles.modal}
        initial={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: -20 }}
      >
        <h3>Сохранть Запись</h3>
        <div className={styles.weight}>
          <span>Вес: </span>
          <b>{weight.toFixed(2)} кг.</b>
        </div>
        <div className={styles.contain}>
          <span>Тара: </span>
          <b>{container.toFixed(2)} кг.</b>
        </div>
        <div className={styles.sum}>
          <span>Итого: </span>
          <b>{result.toFixed(2)} кг.</b>
        </div>
        <div className={styles.result}>
          <span>Оплата: <b>x{reception}</b></span> 
          <b>{(result * reception).toFixed(2)}</b>
        </div>
        <div className={styles.buttons}>
          <button disabled={disabled} onClick={onClose}>Отмена</button>
          <button disabled={disabled} onClick={handleSave}>Потвердить</button>
        </div>
      </motion.div>
    </motion.div>
  )
}
