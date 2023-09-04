'use client'

import { useActions } from '@/hooks/useActions'
import styles from './Note.module.scss'
import { useAppSelector } from "@/hooks/useAppSelector"
import { motion, AnimatePresence } from 'framer-motion'
import { ChangeEvent, useState } from 'react'

export const Note = () => {
  const { modal } = useAppSelector(state => state.root)
  const { handleModal } = useActions()
  const [weights, setWeight] = useState<any[]>([])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const number = e.target.value
    console.log(e.target.value)
    if (typeof parseInt(number) === 'number') {
      setWeight(prev => [...prev, parseInt(number)])
    }
  }

  return (
    <>
    {modal && (
    <motion.div 
      key="modal"
      className={styles.wrapper}
      initial={{ height: 0 }}
      animate={{ height: '100vh' }}
      //exit={{ height: 0 }}
      transition={{ duration: .3 }}
    >
      <div className={styles.container}>
        <button onClick={() => handleModal(false)} className={styles.close}>ЗАКРЫТЬ</button>
        <input 
          type="number"  
          //onChange={handleChange}
          onKeyDown={(e) => setWeight(prev => [...prev, e.key])}
        />
        <div>
          {weights.map((el) => (
            <span key={Math.random()}>{el}</span>
          ))}
        </div>
      </div>
    </motion.div>   
    )}
    </>
  )
}
