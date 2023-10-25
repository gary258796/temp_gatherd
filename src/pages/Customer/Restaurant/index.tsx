import { CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import styles from "./index.module.scss"
import { useEffect, useState } from "react"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import ExpandText from "../../../components/ExpandText";
import instagramImg from '../../../images/instagram.png'
import facebookImg from '../../../images/facebook.png'
import { useNavigate, useParams } from "react-router-dom";
import dayjs from 'dayjs';
import { useProfile } from '../../../hooks/useProfile'
import { ITimePeriods } from "../../../interfaces/profile";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

const Restaurant = () => {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { fetching, fetchProfile } = useProfile()
  const profile = useSelector((state: RootState) => state.profile.profile)
  const [customerCount, setCustomerCount] = useState<number>(0)
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null)

  const handlePeriodOnClick = (value: string) => {
    navigate(`./order?customerCount=${customerCount}&date=${dayjs(selectedDate).format('YYYY/MM/DD')}&period=${value}`)
  }

  const getCustomerCountOptions = (): number[] => {
    if (!profile) return []
    let options: number[] = []
    for (let index = profile.seatSetting.min; index < profile.seatSetting.max + 1; index++) {
      options.push(index)
    }

    return options
  }

  const getTimePeriodsData = (): ITimePeriods[] | undefined => {
    if (!selectedDate || !profile) return undefined
    return profile.timeSetting.basic[selectedDate.day()].periods
  }

  const shuoldDisableDate = (date: dayjs.Dayjs) => {
    if (!profile) return true
    const daySetting = profile.timeSetting.basic[date.day()]
    if (daySetting.isGeneralHoliday) return true
    // 如果有設定特定休假（等時間設定開發完再來處理）
    // 如果當天所有時段都訂滿
    let result: boolean[] = []
    daySetting.periods.forEach(({ list }) => {
      list.forEach((period) => {
        result.push(shuoldDisabledPeriod(date, period))
      })
    })
    return result.filter((value) => !value).length === 0
  }

  const shuoldDisabledPeriod = (date: dayjs.Dayjs, period: string): boolean => {
    if (!profile) return true
    // 取得該時段所有訂單
    const orders = Object.values(profile.orders).filter((order) => order.date === date.format('YYYY/MM/DD') && order.period === period)
    // 當天該時段總人數
    const numberOfCustomer = orders.reduce((a, b) => {
      return a + Number(b.customerCount);
    }, 0);
    if ((profile.seatSetting.total - numberOfCustomer) < customerCount) return true
    return false
  }

  useEffect(() => {
    fetchProfile(id)
  }, [])

  useEffect(() => {
    if (!profile) return
    setCustomerCount(profile.seatSetting.min)
  }, [profile])

  if (fetching || !profile) return <CircularProgress />

  const {
    image,
    name,
    type,
    address,
    notices,
    about,
    googleMap,
    externalLinks,
    phone,
    email
  } = profile

  return (
    <div className={styles.container}>
      <div className={styles.mobileImageContainer}>
        <img src={image} alt="" />
      </div>
      <div className={styles.left}>
        <Typography variant="h3">{name}</Typography>
        <div className={styles.subtitle}>
          <Typography variant="body1">{address}</Typography>
          <Typography variant="body1">{type}</Typography>
        </div>
        <div className={styles.forms}>
          <FormControl fullWidth className={styles.form}>
            <InputLabel id="customerCount">人數</InputLabel>
            <Select
              labelId="customerCount"
              value={customerCount}
              label="人數"
              onChange={(e) => {
                setCustomerCount(Number(e.target.value))
                setSelectedDate(null)
              }}
            >
              {getCustomerCountOptions().map((option) => (
                <MenuItem key={option} value={option}>{option}人</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth className={styles.datepicker}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label="日期"
                value={selectedDate}
                onChange={setSelectedDate}
                format="YYYY/MM/DD"
                disablePast
                shouldDisableDate={shuoldDisableDate}
              />
            </DemoContainer>
          </FormControl>
        </div>
        {selectedDate && (
          <div className={styles.time}>
            {getTimePeriodsData()?.map((timePeriod) => (
              <div key={timePeriod.title} className={styles.timePeriod}>
                <Typography variant="caption">{timePeriod.title}</Typography>
                <div className={styles.periods}>
                  {timePeriod.list.map((period) => (
                    <div
                      key={period}
                      className={shuoldDisabledPeriod(selectedDate, period) ? styles.disabled : ''}
                      onClick={() => handlePeriodOnClick(period)}
                    >
                      <Typography variant="body1">{period}</Typography>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className={styles.notice}>
          <Typography variant="h6">注意事項</Typography>
          <ExpandText>
            <ol>
              {notices.map((notice) => <li key={notice}>{notice}</li>)}
            </ol>
          </ExpandText>
        </div>
        <div className={styles.about}>
          <Typography variant="h6">關於 {name}</Typography>
          <ExpandText>{about}</ExpandText>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.imageContainer}>
          <img src={image} alt="" />
        </div>
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
            {externalLinks.website}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Restaurant
