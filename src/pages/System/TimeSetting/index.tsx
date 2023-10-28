import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import dayjs, { Dayjs } from 'dayjs'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { DateCalendar, LocalizationProvider, PickersDay, PickersDayProps } from '@mui/x-date-pickers'
import { Switch, Typography } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { IAdditionalTimeSetting } from '../../../interfaces/profile'
import Button from '../../../components/Button'
import { getDatabase, ref, set } from "firebase/database"
import { useProfile } from '../../../hooks/useProfile'

const TimeSetting = () => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null)
  const [dateSetting, setDateSetting] = useState<IAdditionalTimeSetting>()
  const { fetchProfile } = useProfile()
  const profile = useSelector((state: RootState) => state.profile.profile)
  const dateString = selectedDate?.format('YYYY/MM/DD') || ''

  const handleDateRender = (props: PickersDayProps<Dayjs>) => {
    const { today, day, selected } = props;
    const hasSetting = profile?.timeSetting.additional?.find((setting) => setting.date === day.format('YYYY/MM/DD'))

    return (
      <div className={`${styles.day} ${today && styles.today}`}>
        <PickersDay {...props} />
        {hasSetting && <div className={`${styles.dot} ${selected && styles.selected}`} />}
      </div>
    );
  }

  const shuoldDisableDate = (date: dayjs.Dayjs) => {
    if (date < dayjs()) return true
    if (!profile) return true
    const daySetting = profile.timeSetting.basic[date.day()]
    return daySetting.isGeneralHoliday === true
  }

  const getDatePeriods = (date: dayjs.Dayjs) => {
    if (!profile) return []
    return profile.timeSetting.basic[date.day()].periods
  }

  const switchIsChecked = (period: string) => {
    if (!profile || !dateSetting) return true
    return !dateSetting.closePeriods.find((closePeriod) => closePeriod === period)
  }

  const handleSwitchOnChange = (checked: boolean, date: string, period: string) => {
    if (!checked) {
      setDateSetting((prev) => {
        return {
          date,
          closePeriods: [
            ...(prev?.closePeriods || []),
            period
          ]
        }
      })
    } else {
      setDateSetting((prev) => {
        return {
          date,
          closePeriods: [
            ...(prev?.closePeriods || []).filter((closePeriod) => closePeriod !== period)
          ]
        }
      })
    }
  }

  const saveTimeSetting = () => {
    const userAddtionalSetting = profile?.timeSetting.additional?.find((addtionalSetting) => addtionalSetting.date === dateString)
    if (JSON.stringify(userAddtionalSetting) === JSON.stringify(dateSetting)) return
    const uid = localStorage.getItem('uid') || ''
    const db = getDatabase();
    if (!userAddtionalSetting) {
      if (dateSetting?.closePeriods.length === 0) return
      const addtionalSettingRef = ref(db, `/profile/${uid}/timeSetting/additional`);
      set(addtionalSettingRef, [dateSetting]).then(() => fetchProfile())
    } else {
      const closePeriodsIsEmpty = dateSetting?.closePeriods.length === 0
      const index = profile?.timeSetting.additional?.findIndex((addtionalSetting) => addtionalSetting.date === dateString)
      const addtionalSettingRef = ref(db, `/profile/${uid}/timeSetting/additional/${index}`);
      set(addtionalSettingRef, closePeriodsIsEmpty ? null : dateSetting).then(() => fetchProfile())
    }
  }

  useEffect(() => {
    if (!selectedDate || !profile) return
    const selectedDateSetting = profile.timeSetting.additional?.find((timeSetting) => timeSetting.date === dateString)
    setDateSetting(selectedDateSetting)
  }, [selectedDate])

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Typography variant='h4' className={styles.name}>{profile?.name} 你好!</Typography>
        <Typography variant='h6'>日期設定</Typography>
        <div className={styles.calendar}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              onChange={setSelectedDate}
              slots={{
                day: handleDateRender
              }}
              sx={{
                width: '100%'
              }}
              shouldDisableDate={shuoldDisableDate}
            />
          </LocalizationProvider>
        </div>
      </div>
      <div className={styles.right}>
        {selectedDate
          ? (
            <>
              <Typography variant='h5' className={styles.title}>
                {dateString}
              </Typography>
              {getDatePeriods(selectedDate).map((period) => (
                <div key={period.title} className={styles.periodsContainer}>
                  <Typography>{period.title}</Typography>
                  <div className={styles.periods}>
                    {period.list.map((time) => (
                      <div key={time} className={styles.period}>
                        <Typography>{time}</Typography>
                        <Switch checked={switchIsChecked(time)} onChange={(e) => handleSwitchOnChange(e.target.checked, dateString, time)} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <Button onClick={saveTimeSetting}>儲存</Button>
            </>
          )
          : (
            <>尚未選擇日期</>
          )
        }
      </div>
    </div>
  )
}

export default TimeSetting
