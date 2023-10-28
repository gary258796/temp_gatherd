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
import { getDateCustomers } from "../../../utils/Order";

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
    // 如果當天所有時段都不能訂
    let result: boolean[] = []
    daySetting.periods.forEach(({ list }) => {
      list.forEach((period) => {
        result.push(shuoldDisabledPeriod(date, period))
      })
    })
    return result.filter((value) => !value).length === 0
  }

  const shuoldDisabledPeriod = (date: dayjs.Dayjs, period: string): boolean => {
    if (!profile) return false
    // 如果有設定特定休假（等時間設定開發完再來處理）
    const dateAdditionalTimeSetting = profile.timeSetting.additional?.find((additionalTimeSetting) => additionalTimeSetting.date === date.format('YYYY/MM/DD'))
    if (dateAdditionalTimeSetting?.closePeriods.includes(period)) return true

    if (!profile.orders) return false
    const customers = getDateCustomers({ date, orders: profile.orders })
    if ((profile.seatSetting.total - customers) < customerCount) return true
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
        <div className={styles.order}>
          <div className={styles.title}>{name}</div>
          <div className={styles.subtitle}>
            <div>{address}</div>
            <div>{type}</div>
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
                  <div className={styles.periodTitle}>{timePeriod.title}</div>
                  <div className={styles.periods}>
                    {timePeriod.list.map((period) => (
                      <div
                        key={period}
                        className={shuoldDisabledPeriod(selectedDate, period) ? styles.disabled : ''}
                        onClick={() => handlePeriodOnClick(period)}
                      >
                        {period}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.section}>
          <div className={styles.title}>注意事項</div>
          <ol>
            {notices.map((notice) => <li key={notice}>{notice}</li>)}
          </ol>
        </div>
        <div className={styles.section}>
          <div className={styles.title}>關於 {name}</div>
          <div>{about}</div>
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
            <div className={styles.name}>{name}</div>
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
          {phone && (
            <div className={styles.content} onClick={() => window.open(`tel:+886${phone}`)}>
              {phone}
            </div>
          )}
          {email && (
            <div className={`${styles.content} ${styles.email}`} onClick={() => window.open(`mailto:${email}`)}>
              {email}
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
  )
}

export default Restaurant
