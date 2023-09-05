'use client'

import { useActions } from '@/hooks/useActions'
import styles from './Note.module.scss'
import { useAppSelector } from "@/hooks/useAppSelector"
import { motion, AnimatePresence } from 'framer-motion'
import { KeyboardEvent, useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'

export const Note = () => {
  const { modal } = useAppSelector(state => state.root)
  const { handleModal } = useActions()

  const [weights, setWeight] = useState<number[]>([])
  const [containers, setContainers] = useState<number[]>([])
  const [value, setValue] = useState('')
  
  const handleWeight = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setWeight(prev => [...prev, +value])
      setValue('')
    }
  }

  return (
    <AnimatePresence>
    {modal && (
    <motion.div 
      key="modal"
      className={styles.wrapper}
      initial={{ height: 0 }}
      exit={{ height: 0 }}
      animate={{ height: '100vh' }}
      transition={{ duration: .3 }}
    >
      <div className={styles.container}>
        <button onClick={() => handleModal(false)} className={styles.close}>ЗАКРЫТЬ</button>
        <input 
          type="number"  
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleWeight}
        />
        <div className={styles.weights}>
          <h3>Вес - {weights.reduce((acc, el) => acc + el, 0).toFixed(2)}кг.</h3>
          {weights.map((el) => (
            <span className={styles.item} key={Math.random()}>
              <span>{el} кг.</span>
              <div className={styles.buttons}>
                <FiEdit className={styles.edit} />
                <MdDelete className={styles.delete} />
              </div>
            </span>
          ))}
        </div>
        <div className={styles.containers}>
          <h3>Тара</h3>
          {containers.map((el) => (
            <span key={Math.random()}>
              {el}
            </span>
          ))}
        </div>
      </div>
    </motion.div>   
    )}
    </AnimatePresence>
  )
}
