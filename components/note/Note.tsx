'use client'

import { useActions } from '@/hooks/useActions'
import styles from './Note.module.scss'
import { useAppSelector } from "@/hooks/useAppSelector"
import { motion, AnimatePresence } from 'framer-motion'
import { KeyboardEvent, useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'
import { EditReception } from './EditReception'
import { v4 } from 'uuid'
import { EditNote } from './EditNote'
import { DeleteNote } from './DeleteNote'
import axios from 'axios'
import { ITransaction } from '@/types/type-transaction'

export const Note = () => {
  const { modal, reception } = useAppSelector(state => state.root)
  const { handleModal, addNewNotes } = useActions()
  const [modalChoice, setModal] = useState<null | 'editReception'>(null)

  const [weights, setWeight] = useState<{ val: number, id: string }[]>([])
  const [containers, setContainers] = useState<{ val: number, id: string }[]>([])
  const [countReception, serCountReception] = useState(reception) 

  const countSum = () => (weights.reduce((acc, el) => acc + el.val, 0) - containers.reduce((acc, el) => acc + el.val, 0)).toFixed(2)

  const [choice, setChoice] = useState<'weight' | 'container'>('weight')
  const [value, setValue] = useState('')

  const [editNote, setEditNote] = useState<null | { val: number, id: string, edit: 'weight' | 'container' }>(null)
  const [deleteNote, setDeleteNote] = useState<null | { val: number, id: string, edit: 'weight' | 'container' }>(null)

  const handleData = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (choice === 'weight') {
        setWeight(prev => [...prev, { val: +value, id: v4() }])
        setValue('')
      } else {
        setContainers(prev => [...prev, { val: +value, id: v4() }])
        setValue('')
      }
    }
  }


  const handleEdit = (val: { val: number, id: string, edit: 'weight' | 'container' }, newValue: number) => {
    if (val.edit === 'weight') {
      setWeight(prev => prev.map(el => {
        if (el.id === val.id) {
          el.val = newValue
          return el
        } else return el
      }))
    } else {
      setContainers(prev => prev.map(el => {
        if (el.id === val.id) {
          el.val = newValue
          return el
        } else return el
      }))
    }
  }

  const handleDelete = (val: { val: number, id: string, edit: 'weight' | 'container' }) => {
    if (val.edit === 'weight') {
      setWeight(prev => prev.filter(el => el.id !== val.id))
    } else {
      setContainers(prev => prev.filter(el => el.id !== val.id))
    }
  }

  const reset = () => {
    setContainers([])
    setWeight([])
    setChoice('weight')
    setValue('')
  }

  const saveNote = async () => {
    const note = {
      weight: +countSum(),
      reception: countReception,
      money: +countSum() * countReception
    }

    const { data } = await axios.post('api/note', { note })
    addNewNotes({ note: { ...data.res } })
    handleModal(false)
    reset()
  }

  return (
    <AnimatePresence>
      {modalChoice === 'editReception' && (
        <EditReception 
          closeModal={() => setModal(null)}
          reception={countReception}
          changeReception={serCountReception}
        />)
      }
      {editNote && (
        <EditNote 
          note={editNote}
          handleEdit={handleEdit}
          onClose={() => setEditNote(null)}
        />
      )}
      {deleteNote && (
        <DeleteNote 
          note={deleteNote}
          handleDelete={handleDelete}
          onClose={() => setDeleteNote(null)}
        />
      )}
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
          <h3>Вес - {weights.reduce((acc, el) => acc + el.val, 0).toFixed(2)}кг.</h3>
          {weights.map((el) => (
            <span className={styles.item} key={Math.random()}>
              <span>{el.val} кг.</span>
              <div className={styles.buttons}>
                <button onClick={() => setEditNote({ ...el, edit: 'weight' })}>
                 <FiEdit className={styles.edit} />
               </button>
               <button onClick={() => setDeleteNote({ ...el, edit: 'weight' })}>
                 <MdDelete className={styles.delete} />
               </button>  
              </div>
            </span>
          ))}
        </div>
        <div className={styles.containers}>
          <h3>Тара - {containers.reduce((acc, el) => acc + el.val, 0).toFixed(2)}кг.</h3>
          {containers.map((el) => (
           <span className={styles.item} key={Math.random()}>
             <span>{el.val} кг.</span>
             <div className={styles.buttons}>
               <button onClick={() => setEditNote({ ...el, edit: 'container' })}>
                 <FiEdit className={styles.edit} />
               </button>
               <button onClick={() => setDeleteNote({ ...el, edit: 'container' })}>
                 <MdDelete className={styles.delete} />
               </button>  
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
            <strong onClick={() => setModal('editReception')}>x{countReception}</strong>
          </div>
          
          <span>Оплата:  <b>{(+countSum() * countReception).toFixed(2)}руб.</b></span>
        </div>
        <div className={styles.btns}>
          <button onClick={reset} className={styles.reset}>Сброс</button>
          <button onClick={saveNote} className={styles.save}>Сохранить</button>
        </div>
        
      </motion.div>   
      )}
    </AnimatePresence>
  )
}
