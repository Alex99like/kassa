import { useActions } from '@/hooks/useActions'
import styles from './Control.module.scss'

export const Control = () => {
  const { handleModal } = useActions()

  return (
    <button className={styles.wrapper} onClick={() => handleModal(true)}>
      Добавить Запись
    </button>
  )
}
