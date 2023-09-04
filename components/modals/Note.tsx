'use client'

import styles from './Note.module.scss'
import { useAppSelector } from "@/hooks/useAppSelector"
import { motion } from 'framer-motion'

export const Note = () => {
  const { modal } = useAppSelector(state => state.root)

  return (
    <motion.div 
      className={styles.wrapper}
      initial={{ height: 0 }}
      animate={{ height: '100vh' }}
      transition={{ duration: .3 }}
    >
      <div className={styles.container}>
        <input 
          type="number"  
          onFocus={(e) => { e.preventDefault() }}
        />
      </div>
    </motion.div>
  )
}
