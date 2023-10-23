import { ArrowBackIos, Event, Person, Schedule } from '@mui/icons-material'
import styles from './index.module.scss'
import { Typography, TextField, CircularProgress } from '@mui/material'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import instagramImg from '../../../images/instagram.png'
import facebookImg from '../../../images/facebook.png'
import ExpandText from '../../../components/ExpandText'
import Button from '../../../components/Button'
import { useProfile } from '../../../hooks/useProfile'

const Order = () => {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { profile, fetching } = useProfile({ id })
  const [searchParams] = useSearchParams()
  const customerCount = searchParams.get('customerCount')
  const date = searchParams.get('date')
  const period = searchParams.get('period')

  const handleConfirm = () => {
    navigate('./success')
  }

  if (fetching || !profile) return <CircularProgress />

  const {
    name,
    address,
    googleMap,
    type,
    externalLinks,
    phone,
    email,
    website,
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
            <Typography variant='h5'>{name}</Typography>
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
            <TextField label="姓名" />
            <TextField label="手機" />
            <TextField label="電子信箱" />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.mapContainer}>
            <div className={styles.map}>
              <div dangerouslySetInnerHTML={{ __html: googleMap }} />
            </div>
            <div className={styles.content}>
              <Typography variant="h6">{name}</Typography>
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
              {phone}
            </div>
            <div className={styles.content}>
              {email}
            </div>
            <div className={styles.content}>
              {website}
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
        <Button className={styles.button} onClick={handleConfirm}>預定</Button>
      </div>
    </div>
  )
}

export default Order
