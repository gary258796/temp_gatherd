import styles from './index.module.scss'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useProfile } from "../../../hooks/useProfile"
import { useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import { getDatabase, ref, set } from "firebase/database"
import Button from '../../../components/Button'
import { ORDER_STATUS } from '../../../utils/Order'
import { CircularProgress } from '@mui/material'
import dayjs from 'dayjs'
import { IOrderForm } from '../../../interfaces/profile'

const Form = () => {
  const { uid = '', key = '' } = useParams()
  const { fetchProfile } = useProfile()
  const [values, setValues] = useState<IOrderForm[]>()
  const profile = useSelector((state: RootState) => state.profile.profile)
  const order = profile?.orders?.[key]
  const isCancelled = order?.status === ORDER_STATUS.CANCELLED
  const lastEditDate = dayjs(order?.date).add(-(profile?.formSetting.lastEdit || 0), 'day')
  const isOverLastEdit = dayjs(lastEditDate, 'YYYY/MM/DD').diff(dayjs(), 'day', true) < 0

  const formsAreFilled = () => {
    let filled = true
    profile?.formSetting.questions.every(({ title, optional }) => {
      if (!optional && !values?.find((value) => value.title === title)?.answer) {
        filled = false
        return false
      }
    })
    return filled
  }

  const handleSubmit = () => {
    const db = getDatabase();
    const formRef = ref(db, `/profile/${uid}/orders/${key}/form`);
    set(formRef, values).then(() => fetchProfile(uid))
  }

  const handleCancel = () => {
    const db = getDatabase();
    const orderStatusRef = ref(db, `/profile/${uid}/orders/${key}/status`);
    set(orderStatusRef, ORDER_STATUS.CANCELLED).then(() => fetchProfile(uid))
  }

  useEffect(() => {
    fetchProfile(uid)
  }, [uid])

  useEffect(() => {
    if (!order?.form) {
      const initialFormValues = profile?.formSetting.questions.map(({ title }) => {
        return { title, answer: '' }
      })
      setValues(initialFormValues)
    } else {
      setValues([...order.form])
    }
  }, [order])

  if (!profile || !order) return <CircularProgress />

  return (
    <div className={styles.container}>
      <div className={styles.orderInfo}>
        <div className={styles.title}>
          <div>用餐資訊表單</div>
          <div>{profile.name}</div>
        </div>
        <div className={styles.order}>
          <img src={profile.image} alt='' />
          <div>
            <div>姓名： {order.name}</div>
            <div>人數： {order.customerCount}位</div>
            <div>時間： {order.date} {order.period}</div>
            <div>手機： {order.phone}</div>
            <div>電子信箱： {order.email}</div>
            <div>最後編輯時間： {dayjs(lastEditDate).format('YYYY/MM/DD HH:mm')}</div>
          </div>
        </div>
      </div>
      <div className={styles.forms}>
        {profile.formSetting.questions.map(({ title, subtitle, optional }) => (
          <div className={styles.form} key={title}>
            <div>
              <div className={styles.title}>
                {title}<p>{optional ? '非必填' : ''}</p>
              </div>
              {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
            </div>
            <textarea
              disabled={isCancelled || isOverLastEdit}
              value={values?.find((value) => value.title === title)?.answer || ''}
              onChange={(e) => {
                if (!values) return
                const index = values.findIndex((value) => value.title === title)
                if (index === -1) return
                const cloneValues = JSON.parse(JSON.stringify(values))
                cloneValues[index].answer = e.target.value
                setValues(cloneValues)
              }}
            />
          </div>
        ))}
      </div>
      <div className={styles.buttons}>
        {isCancelled
          ? <Button disabled>訂單已取消</Button>
          : isOverLastEdit 
            ? <Button disabled>已過最後編輯時間</Button>
            : (
              <>
                <Button onClick={handleSubmit} disabled={!formsAreFilled()}>儲存</Button>
                <Button onClick={handleCancel}>取消訂單</Button>
              </>
            )
        }
      </div>
    </div>
  )
}

export default Form
