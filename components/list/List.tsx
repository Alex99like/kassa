import { fakeData } from '@/data/fake-data'
import styles from './List.module.scss'
import { formatDate } from '@/utils/formatDate'
import { FiEdit } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'

export const List = () => {
  return (
    <div className={styles.wrapper}>
      <h3>Список Приема</h3>
      <div className={styles.list}>
        {fakeData.map(trans => (
          <div className={styles.item}>
            <div className={styles.reception}>
              <span>{trans.weight} <b>x {trans.reception}</b> = </span>
              <span>{trans.money} р.</span>
            </div>
            <span className={styles.date}>{formatDate(trans.date)}</span>
            <div className={styles.buttons}>
              <FiEdit className={styles.edit} />
              <MdDelete className={styles.delete} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
