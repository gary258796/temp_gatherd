import styles from './index.module.scss'
import { IOrder } from "../../../../interfaces/profile"
import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../app/store'
import { Close } from '@mui/icons-material'
import Button from '../../../../components/Button'
import { useMemo, useState } from 'react'
import { getDatabase, ref, set } from "firebase/database"
import { getOrderStatus } from '../../../../utils/Order'
import { useProfile } from '../../../../hooks/useProfile'

const OrderDetailModal = ({ order, onClose }:{ order: IOrder; onClose: () => void }) => {
  const {
    name,
    date,
    period,
    customerCount,
    phone,
    email,
    memo,
    form
  } = order
  const [memoValue, setMemoValue] = useState(memo)
  const { fetchProfile } = useProfile()
  const profile = useSelector((state: RootState) => state.profile.profile)
  const status = getOrderStatus(order)

  const handleStatusRender = (status: number) => {
    return (
      <div className={styles[`status${status}`]}>
        {status === 1 ? '待處理' : status === 2 ? '聯繫中' : status === 3 ? '已完成' : '取消'}
      </div>
    )
  }

  const orderKey = useMemo(() => {
    if (!profile?.orders) return undefined
    return Object.keys(profile.orders).find((key) => profile.orders && JSON.stringify(profile.orders[key]) === JSON.stringify(order))
  }, [profile])

  const handleSaveMemo = () => {
    const user = localStorage.getItem('userAccount') || ''
    const db = getDatabase();
    const memoRef = ref(db, `/profile/${user}/orders/${orderKey}/memo`);
    set(memoRef, memoValue).then(() => fetchProfile())
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <Close className={styles.close} onClick={onClose} />
        <div className={styles.section}>
          <Typography variant='h5'>{name}</Typography>
          <Typography variant='body1'>{date}, {period}</Typography>
          <Typography>{customerCount}位</Typography>
        </div>
        <div className={styles.section}>
          <div className={styles.info}>
            <Typography>狀態</Typography>
            {handleStatusRender(status)}
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.info}>
            <Typography>用餐表單</Typography>
            <Typography>{window.location.origin}/form/{profile?.account}/{orderKey}</Typography>
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.info}>
            <Typography>電話</Typography>
            <Typography>{phone}</Typography>
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.info}>
            <Typography>電子信箱</Typography>
            <Typography>{email}</Typography>
          </div>
        </div>
        {form && (
          <div className={styles.section}>
            <Typography>用餐資訊</Typography>
            {Object.keys(form).map((title) => (
              <div key={title} className={styles.form}>
                <Typography variant='caption'>{title}</Typography>
                <Typography variant='caption'>{form[title]}</Typography>
              </div>
            ))}
          </div>
        )}
        <div className={styles.section}>
          <Typography>備註</Typography>
          <textarea value={memoValue} onChange={(e) => setMemoValue(e.target.value)} />
          {memoValue !== memo && <Button onClick={handleSaveMemo}>儲存備註</Button>}
        </div>
      </div>
    </div>
  )
}

export default OrderDetailModal
