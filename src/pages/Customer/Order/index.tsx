import { ArrowBackIos, Event, Person, Schedule } from '@mui/icons-material'
import styles from './index.module.scss'
import { Typography, TextField, CircularProgress } from '@mui/material'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import instagramImg from '../../../images/instagram.png'
import facebookImg from '../../../images/facebook.png'
import ExpandText from '../../../components/ExpandText'
import Button from '../../../components/Button'
import { useProfile } from '../../../hooks/useProfile'
import { useState } from 'react'
import { getDatabase, ref, push, set } from "firebase/database"
import { QRCodeSVG } from 'qrcode.react'

const Order = () => {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { profile, fetching } = useProfile({ id })
  const [searchParams] = useSearchParams()
  const customerCount = searchParams.get('customerCount')
  const date = searchParams.get('date')
  const period = searchParams.get('period')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEamil] = useState('')
  const [posting, setPosting] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)

  const handleConfirm = () => {
    setPosting(true)
    const params = {
      date,
      period,
      customerCount,
      name,
      phone,
      email,
      status: 1
    }
    const db = getDatabase();
    const ordersRef = ref(db, `/profile/${id}/orders`);
    const newOrderRef = push(ordersRef);
    set(newOrderRef, params)
      .finally(() => {
        setPosting(false)
        setPostSuccess(true)
      });
  }

  if (fetching || !profile) return <CircularProgress />

  const {
    address,
    googleMap,
    type,
    externalLinks,
    notices
  } = profile

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ArrowBackIos onClick={() => navigate(-1)} />
        <Typography variant='h6'>確認資訊</Typography>
      </div>
      <div className={styles.top}>
        <div className={styles.left}>
          <div className={styles.orderInfo}>
            <Typography variant='h5'>{profile.name}</Typography>
            <div>
              <Person />
              <Typography variant='body1'>{customerCount}位</Typography>
            </div>
            <div>
              <Event />
              <Typography variant='body1'>{date}</Typography>
            </div>
            <div>
              <Schedule />
              <Typography variant='body1'>{period}</Typography>
            </div>
          </div>
          <div className={styles.aboutYou}>
            <Typography variant='h5'>關於你</Typography>
            <TextField label="姓名" value={name} onChange={(e) => setName(e.target.value)} />
            <TextField label="手機" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <TextField label="電子信箱" value={email} onChange={(e) => setEamil(e.target.value)} />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.mapContainer}>
            <div className={styles.map}>
              <div dangerouslySetInnerHTML={{ __html: googleMap }} />
            </div>
            <div className={styles.content}>
              <Typography variant="h6">{profile.name}</Typography>
              <Typography variant="body2">{address}</Typography>
              <Typography variant="caption">{type}</Typography>
              <div className={styles.media}>
                {externalLinks.facebook && (
                  <div onClick={() => window.open(externalLinks.facebook)}>
                    <img src={facebookImg} alt='' />
                  </div>
                )}
                {externalLinks.instagram && (
                  <div onClick={() => window.open(externalLinks.instagram)}>
                    <img src={instagramImg} alt='' />
                  </div>
                )}
              </div>
            </div>
            <div className={styles.content}>
              {profile.phone}
            </div>
            <div className={styles.content}>
              {profile.email}
            </div>
            <div className={styles.content}>
              {externalLinks.website}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.notice}>
        <Typography variant="h6">注意事項</Typography>
        <ExpandText>
          <ol>
            {notices.map((notice) => <li key={notice}>{notice}</li>)}
          </ol>
        </ExpandText>
        <Button className={styles.button} onClick={handleConfirm} disabled={!name || !phone || !email} loading={posting}>
          預定
        </Button>
      </div>
      {postSuccess && (
        <div className={styles.successCover}>
          <div>
            <div className={styles.title}>
              <Typography variant="h6">請加入 {profile.name} 官方LINE</Typography>
              <Typography variant="h6">我們會與你確認更多預訂內容</Typography>
            </div>
            <QRCodeSVG value={externalLinks.line} />
            <Button onClick={() => window.open(externalLinks.line)}>立即加入</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Order
