import { useAppSelector } from '@/hooks/useAppSelector'
import styles from './Weight.module.scss'

export const Weight = () => {
  const { notes } = useAppSelector(state => state.root)

  return (
    <div className={styles.wrapper}>
      <span>Вес</span>
      <h3>{notes.reduce((acc, el) => acc + el.weight, 0).toFixed(2)}</h3>
    </div>
  )
}
