import { useState } from 'react'
import styles from './Note.module.scss'
import { motion } from 'framer-motion'

interface EditReceptionProps {
  closeModal: () => void
  changeReception: (val: number) => void
  reception: number
}

export const EditReception = ({ changeReception, closeModal, reception }: EditReceptionProps) => {
  const [value, setValue] = useState<string>(reception.toString())

  const save = () => {
    changeReception(+value)
    closeModal()
  }
  
  return (
    <motion.div className={styles['modal-edit']}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div className={styles.modal}
        initial={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: -20 }}
      >
        <span>Оплата</span>
        <div>
          <input 
            //style={{ paddingLeft: 65 - (value.toString().length - 1) * 20 }}
            value={value} 
            onChange={(e) => setValue(e.target.value)} 
            type="number" />
          <span>РУБ.</span>
        </div>
        <div className={styles.buttons}>
          <button onClick={closeModal}>Закрыть</button>
          <button onClick={() => save()}>Сохранить</button>
        </div>
      </motion.div>
    </motion.div>
  )
}
