import { Chip, CircularProgress, Stack } from '@mui/material'
import styles from './index.module.scss'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import OrderDetailView from './OrderDetailModal';
import { ORDER_STATUS, getDateOrdersKeys, getOrderStatus } from '../../../utils/Order';
import Header from '../../../components/Header';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../../hooks/useProfile';

const Orders = () => {
  const navigate = useNavigate()
  const { fetching, fetchProfile } = useProfile()
  const [selectedStatusIndex, setSelectedStatusIndex] = useState(0)
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null)
  const [selectedOrderKey, setSelectedOrderKey] = useState<string>()
  const profile = useSelector((state: RootState) => state.profile.profile)
  
  const statuses = [
    { title: '全部', statuses: undefined },
    { title: '待處理', statuses: [ORDER_STATUS.WAIT] },
    { title: '聯繫中', statuses: [ORDER_STATUS.CONTACT] },
    { title: '完成', statuses: [ORDER_STATUS.DONE] },
    { title: '取消', statuses: [ORDER_STATUS.CANCELLED] }
  ]

  const selectedDateOrdersKeys = getDateOrdersKeys({ date: selectedDate, orders: profile?.orders, statuses: statuses[selectedStatusIndex].statuses })

  const handleDateRender = (props: PickersDayProps<Dayjs>) => {
    const { day, today, selected, outsideCurrentMonth } = props;

    const ordersKeys = getDateOrdersKeys({ date: day, orders: profile?.orders, statuses: statuses[selectedStatusIndex].statuses })
    const hasOrder = ordersKeys.length !== 0

    return (
      <div className={`${styles.day} ${today && styles.today}`}>
        <PickersDay {...props} />
        {!outsideCurrentMonth && hasOrder && <div className={`${styles.dot} ${selected && styles.selected}`} />}
      </div>
    );
  }

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) return navigate('/os/login')
    fetchProfile()
  }, [])

  if (fetching) return <CircularProgress />

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.title}>我的預訂</div>
          <Stack direction="row" spacing={1}>
            {statuses.map((status, index) => (
              <Chip
                key={status.title}
                label={status.title}
                onClick={() => setSelectedStatusIndex(index)}
                variant={selectedStatusIndex === index ? 'outlined' : 'filled'}
                color='primary'
              />
            ))}
          </Stack>
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
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className={styles.right}>
          {selectedDate
            ? (
              <>
                <div className={styles.title}>
                  {selectedDate.format('YYYY/MM/DD')}
                </div>
                {selectedDateOrdersKeys.length === 0
                  ? (
                    <>選擇日期無預訂</>
                  )
                  : (
                    <>
                      <div className={styles.orders}>
                        {selectedDateOrdersKeys.map((key) => {
                          const order = profile?.orders?.[key]
                          if (!order) return <></>
                          const { date, period, name, customerCount } = order
                          return (
                            <div key={`${date}-${period}-${name}`} className={styles.order} onClick={() => setSelectedOrderKey(key)}>
                              <div className={styles[`bar${getOrderStatus(order)}`]} />
                              <div>
                                <p>{name}</p>
                                <div>{customerCount}位 {period}</div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </>
                  )
                }
              </>
            )
            : (
              <div className={styles.title}>尚未選擇日期</div>
            )
          }
        </div>
        {profile?.orders && selectedOrderKey && (
          <OrderDetailView
            order={profile.orders[selectedOrderKey]}
            orderKey={selectedOrderKey}
            onClose={() => setSelectedOrderKey(undefined)}
          />
        )}
      </div>
    </div>
  )
}

export default Orders
