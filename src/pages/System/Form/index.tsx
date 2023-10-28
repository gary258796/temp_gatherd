import styles from './index.module.scss'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useProfile } from "../../../hooks/useProfile"
import { useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import { Typography } from '@mui/material'
import { ConfirmationNumber, Person, Schedule } from '@mui/icons-material'
import { getDatabase, ref, set } from "firebase/database"
import Button from '../../../components/Button'
import { ORDER_STATUS } from '../../../utils/Order'

const Form = () => {
  const { account = '', key = '' } = useParams()
  const { fetchProfile } = useProfile()
  const [values, setValues] = useState<{ [key: string]: string }>({})
  const profile = useSelector((state: RootState) => state.profile.profile)
  const order = profile?.orders?.[key]
  const isCancelled = order?.status === ORDER_STATUS.CANCELLED

  const formsAreFilled = () => {
    let filled = true
    profile?.formSetting.forEach((setting) => {
      if (!setting.optional && !values[setting.title]) filled = false
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
      profile?.formSetting.forEach((form) => {
        initialFormValues[form.title] = ''
      })
      setValues(initialFormValues)
    } else {
      setValues(order.form)
    }
  }, [order])

  return (
    <div className={styles.container}>
      <div className={styles.orderInfo}>
        <div className={styles.title}>
          <Typography variant='h6'>用餐資訊</Typography>
          <Typography variant='body1'>{profile?.name}</Typography>
        </div>
        <div className={styles.order}>
          <img src={profile?.image} alt='' />
          <div>
            <div>
              <ConfirmationNumber />
              <Typography variant='subtitle1'>{order?.name}</Typography>
            </div>
            <div>
              <Person />
              <Typography variant='subtitle1'>{order?.customerCount}位</Typography>
            </div>
            <div>
              <Schedule />
              <Typography variant='subtitle1'>{order?.date} {order?.period}</Typography>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.forms}>
        {profile?.formSetting.map((form) => (
          <div className={styles.form} key={form.title}>
            <Typography variant='body1'>{form.title}</Typography>
            <Typography variant='h6'>{!form.optional ? '非必填' : ''}</Typography>
            <Typography variant='caption'>{form.subtitle}</Typography>
            <textarea disabled={isCancelled} value={values[form.title]} onChange={(e) => {
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
      {isCancelled
        ? (
          <Button disabled>訂單已取消</Button>
        )
        : (
          <>
            <Button onClick={handleSubmit} disabled={!formsAreFilled()}>儲存</Button>
            <Button onClick={handleCancel}>取消訂單</Button>
          </>
        )}
    </div>
  )
}

export default Form
