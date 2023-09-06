import { motion } from 'framer-motion'
import styles from './Note.module.scss'

interface ResetNoteProps {
  reset: () => void
  onClose: () => void
}

export const ResetNote = ({ onClose, reset }: ResetNoteProps) => {
  
  const handleReset = () => {
    reset()
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
        <h3>Cбросить Данные</h3>
        <div className={styles.buttons}>
          <button onClick={onClose}>Отмена</button>
          <button onClick={handleReset}>Потвердить</button>
        </div>
      </motion.div>
    </motion.div>
  )
}