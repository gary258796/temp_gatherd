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

const Form = () => {
  const { account = '', key = '' } = useParams()
  const { fetchProfile } = useProfile()
  const [values, setValues] = useState<{ [key: string]: string }>({})
  const profile = useSelector((state: RootState) => state.profile.profile)
  const order = profile?.orders?.[key]
  const isCancelled = order?.status === ORDER_STATUS.CANCELLED
  const lastEditDate = dayjs(order?.date).add(-(profile?.formSetting.lastEdit || 0), 'day')
  const isOverLastEdit = dayjs(lastEditDate, 'YYYY/MM/DD').diff(dayjs(), 'day', true) < 0

  const formsAreFilled = () => {
    let filled = true
    profile?.formSetting.questions.every((setting) => {
      if (!setting.optional && !values[setting.title]) {
        filled = false
        return false
      }
    })
    return filled
  }

  const handleSubmit = () => {
    const db = getDatabase();
    const formRef = ref(db, `/profile/${account}/orders/${key}/form`);
    set(formRef, values).then(() => fetchProfile(account))
  }

  const handleCancel = () => {
    const db = getDatabase();
    const orderStatusRef = ref(db, `/profile/${account}/orders/${key}/status`);
    set(orderStatusRef, ORDER_STATUS.CANCELLED).then(() => fetchProfile(account))
  }

  useEffect(() => {
    fetchProfile(account)
  }, [account])

  useEffect(() => {
    if (!order?.form) {
      let initialFormValues: { [key: string]: string } = {}
      profile?.formSetting.questions.forEach((form) => {
        initialFormValues[form.title] = ''
      })
      setValues(initialFormValues)
    } else {
      setValues(order.form)
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
        {profile.formSetting.questions.map((form) => (
          <div className={styles.form} key={form.title}>
            <div>
              <div className={styles.title}>
                {form.title}<p>{form.optional ? '非必填' : ''}</p>
              </div>
              {form.subtitle && <div className={styles.subtitle}>{form.subtitle}</div>}
            </div>
            <textarea disabled={isCancelled || isOverLastEdit} value={values[form.title]} onChange={(e) => {
              setValues((prev) => {
                return {
                  ...prev,
                  [form.title]: e.target.value
                }
              })
            }} />
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
