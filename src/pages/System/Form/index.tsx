import styles from './index.module.scss'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useProfile } from "../../../hooks/useProfile"
import { useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import { Typography } from '@mui/material'
import { ConfirmationNumber, Event, Person, Schedule } from '@mui/icons-material'
import { getDatabase, ref, set } from "firebase/database"
import Button from '../../../components/Button'

const Form = () => {
  const { account = '', key = '' } = useParams()
  const { fetchProfile } = useProfile()
  const [values, setValues] = useState<{ [key: string]: string }>({})
  const profile = useSelector((state: RootState) => state.profile.profile)
  const order = profile?.orders?.[key]

  const handleSubmit = () => {
    const user = localStorage.getItem('userAccount') || ''
    const db = getDatabase();
    const memoRef = ref(db, `/profile/${user}/orders/${key}/form`);
    set(memoRef, values).then(() => {
      console.log('success')
    })
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
            <Typography variant='caption'>{form.subtitle}</Typography>
            <textarea value={values[form.title]} onChange={(e) => {
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
      <Button onClick={handleSubmit}>儲存</Button>
    </div>
  )
}

export default Form
