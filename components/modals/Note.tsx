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

  const countSum = () => (weights.reduce((acc, el) => acc + el, 0) - containers.reduce((acc, el) => acc + el, 0)).toFixed(2)

  const [choice, setChoice] = useState<'weight' | 'container'>('weight')
  const [value, setValue] = useState('')
  
  const handleData = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (choice === 'weight') {
        setWeight(prev => [...prev, +value])
        setValue('')
      } else {
        setContainers(prev => [...prev, +value])
        setValue('')
      }
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
        <div className={styles.input}>
          <input 
            className={styles[choice]} 
            type="number"  
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleData}
          />
          <button className={styles[choice]} onClick={() => setChoice(prev => prev === 'weight' ? 'container' : 'weight')}>
            {choice === 'weight' ? 'ВЕС' : 'ТАРА'}
          </button>
        </div>
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
          <h3>Тара - {containers.reduce((acc, el) => acc + el, 0).toFixed(2)}кг.</h3>
          {containers.map((el) => (
           <span className={styles.item} key={Math.random()}>
             <span>{el} кг.</span>
             <div className={styles.buttons}>
               <FiEdit className={styles.edit} />
               <MdDelete className={styles.delete} />
             </div>
           </span>
          ))}
        </div>
      </div>
      <div className={styles.result}>
        <div>
          <b> 
            {countSum() + 'кг.'}
          </b>
          <strong>x6</strong>
        </div>
        
        <span>Оплата:  <b>{+countSum() * 6}руб.</b></span>
      </div>
      <div className={styles.btns}>
        <button className={styles.reset}>Сброс</button>
        <button className={styles.save}>Сохранить</button>
      </div>
      
    </motion.div>   
    )}
    </AnimatePresence>
  )
}
