import { ArrowBackIos, Event, Person, Schedule } from '@mui/icons-material'
import styles from './index.module.scss'
import { Typography, TextField, CircularProgress } from '@mui/material'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import instagramImg from '../../../images/instagram.png'
import facebookImg from '../../../images/facebook.png'
import Button from '../../../components/Button'
import { useProfile } from '../../../hooks/useProfile'
import { useEffect, useState } from 'react'
import { getDatabase, ref, push, set } from "firebase/database"
import { QRCodeSVG } from 'qrcode.react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { getDateCustomers } from '../../../utils/Order'
import dayjs from 'dayjs'

const Order = () => {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { fetchProfile, fetching } = useProfile()
  const profile = useSelector((state: RootState) => state.profile.profile)
  const [searchParams] = useSearchParams()
  const customerCount = searchParams.get('customerCount')
  const date = searchParams.get('date')
  const period = searchParams.get('period')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEamil] = useState('')
  const [posting, setPosting] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)
  const phoneIsError = !!phone && phone.slice(0, 2) !== '09'
  const emailIsError = !!email && !email.includes('@')

  const handleConfirm = () => {
    setPosting(true)
    const params = {
      date,
      period,
      customerCount,
      name,
      phone,
      email,
      status: 1,
      memo: ''
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

  useEffect(() => {
    fetchProfile(id)
  }, [id])

  useEffect(() => {
    if (!profile?.orders) return
    const customers = getDateCustomers({ date: dayjs(date), orders: profile.orders })
    if ((profile.seatSetting.total - customers) > Number(customerCount)) navigate(`/restaurant/${profile.account}`)
  }, [profile])

  if (fetching || !profile) return <CircularProgress />

  const {
    address,
    googleMap,
    type,
    externalLinks,
    notices,
    image
  } = profile

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div onClick={() => navigate(-1)}>
          <ArrowBackIos />返回
        </div>
      </div>
      <div className={styles.top}>
        <div className={styles.left}>
          <div className={styles.orderInfo}>
            <div className={styles.title}>確認 {profile.name} 訂位資訊</div>
            <div className={styles.detail}>
              <img src={image} alt='' />
              <div>
                <div className={styles.info}>
                  <Person />
                  <div>{customerCount}位</div>
                </div>
                <div className={styles.info}>
                  <Event />
                  <div>{date}</div>
                </div>
                <div className={styles.info}>
                  <Schedule />
                  <div>{period}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.aboutYou}>
            <div className={styles.title}>關於你</div>
            <div className={styles.forms}>
              <TextField
                label="姓名"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="手機"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={phoneIsError}
              />
              <TextField
                label="電子信箱"
                value={email}
                onChange={(e) => setEamil(e.target.value)}
                error={emailIsError}
              />
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.mapContainer}>
            <div className={styles.map}>
              <div dangerouslySetInnerHTML={{ __html: googleMap }} />
            </div>
            <div className={styles.content}>
              <div className={styles.name}>{profile.name}</div>
              <div className={styles.address}>{address}</div>
              <div className={styles.address}>{type}</div>
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
            {profile.phone && (
              <div className={styles.content} onClick={() => window.open(`tel:+886${profile.phone}`)}>
                {profile.phone}
              </div>
            )}
            {profile.email && (
              <div className={`${styles.content} ${styles.email}`} onClick={() => window.open(`mailto:${profile.email}`)}>
                {profile.email}
              </div>
            )}
            {externalLinks.website && (
              <div className={`${styles.content} ${styles.email}`} onClick={() => window.open(externalLinks.website)}>
                {externalLinks.website}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.notice}>
        <div className={styles.title}>注意事項</div>
        <ol>
          {notices.map((notice) => <li key={notice}>{notice}</li>)}
        </ol>
        <Button className={styles.button} onClick={handleConfirm} disabled={!name || !phone || !email || phoneIsError || emailIsError} loading={posting}>
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
            <Button onClick={() => navigate(-1)}>返回</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Order
