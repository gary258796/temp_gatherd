import styles from './index.module.scss'
import { IOrder } from "../../../../interfaces/profile"
import { Alert, Chip, Typography } from '@mui/material'
import { Close, Upload } from '@mui/icons-material'
import Button from '../../../../components/Button'
import { useState } from 'react'
import { getDatabase, ref, set } from "firebase/database"
import { ORDER_STATUS, getOrderStatus } from '../../../../utils/Order'
import { useProfile } from '../../../../hooks/useProfile'

const OrderDetailModal = ({ order, orderKey, onClose }:{ order: IOrder; orderKey: string; onClose: () => void }) => {
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
  const [copySuccess, setCopySuccess] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [cancelSuccess, setCancelSuccess] = useState(false)
  const { fetchProfile } = useProfile()
  const status = getOrderStatus(order)
  const uid = localStorage.getItem('uid') || ''

  const handleStatusRender = (status: number) => {
    return (
      <Chip
        className={styles[`status${status}`]}
        label={status === 1 ? '待處理' : status === 2 ? '聯繫中' : status === 3 ? '已完成' : '取消'}
      />
    )
  }

  const handleSaveMemo = () => {
    const db = getDatabase();
    const memoRef = ref(db, `/profile/${uid}/orders/${orderKey}/memo`);
    set(memoRef, memoValue).then(() => {
      fetchProfile()
      setSaveSuccess(true)
      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000);
    })
  }

  const handleCancel = () => {
    const db = getDatabase();
    const orderStatusRef = ref(db, `/profile/${uid}/orders/${orderKey}/status`);
    set(orderStatusRef, ORDER_STATUS.CANCELLED).then(() => {
      fetchProfile(uid)
      setCancelSuccess(true)
      setTimeout(() => {
        setCancelSuccess(false)
      }, 3000);
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <Close className={styles.close} onClick={onClose} />
        <div className={styles.orderDetail}>
          <p>{name}</p>
          <div>{date}, {period}</div>
          <div>{customerCount}位</div>
        </div>
        <div>
          <div className={styles.section}>
            <div className={styles.info}>
              狀態
              {handleStatusRender(status)}
            </div>
          </div>
          {(status === ORDER_STATUS.WAIT || status === ORDER_STATUS.CONTACT) && (
            <div className={styles.section}>
              <div className={styles.info}>
                用餐表單
                <Upload onClick={() => {
                  window.navigator.clipboard.writeText(`${window.location.origin}/form/${uid}/${orderKey}`).then(() => {
                    setCopySuccess(true)
                    setTimeout(() => {
                      setCopySuccess(false)
                    }, 3000);
                  })
                }} />
              </div>
            </div>
          )}
          <div className={styles.section}>
            <div className={styles.info}>
              電話
              <div>{phone}</div>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.info}>
              電子信箱
              <div>{email}</div>
            </div>
          </div>
          {form && (
            <div className={styles.section}>
              <Typography>用餐資訊</Typography>
              <div className={styles.forms}>
                {form.map(({ title, answer }) => (
                  <div key={title} className={styles.form}>
                    <div>{title}</div>
                    <div>{answer}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className={styles.section}>
            <Typography>備註</Typography>
            <textarea value={memoValue} onChange={(e) => setMemoValue(e.target.value)} />
          </div>
        </div>
        <div className={styles.buttons}>
          <Button disabled={memoValue === memo} onClick={handleSaveMemo}>儲存備註</Button>
          {(status === ORDER_STATUS.WAIT || status === ORDER_STATUS.CONTACT) && (
            <Button onClick={handleCancel} className={styles.cancel}>
              取消訂單
            </Button>
          )}
        </div>
        {copySuccess && <Alert severity="success" className={styles.alert}>表單連結複製成功</Alert>}
        {saveSuccess && <Alert severity="success" className={styles.alert}>備註儲存成功</Alert>}
        {cancelSuccess && <Alert severity="success" className={styles.alert}>取消訂單成功</Alert>}
      </div>
    </div>
  )
}

export default OrderDetailModal
