import { Typography } from '@mui/material'
import styles from './index.module.scss'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../../hooks/useProfile';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { IOrder } from '../../../interfaces/profile';

const Orders = () => {
  const navigate = useNavigate()
  const [id, setId] = useState('')
  const [selectedStatus, setSelectedStatus] = useState(0)
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null)
  const { profile } = useProfile({ id })
  const statuses = ['全部', '待處理', '聯繫中', '完成', '取消']
  
  const getDateOrders = (date: dayjs.Dayjs | null) => {
    return profile?.orders
      ? Object.values(profile.orders).filter((order) => {
          return order.date === date?.format('YYYY/MM/DD') && (selectedStatus ? selectedStatus === order.status : true)
        })
      : []
  }

  const getOrderKey = (selectedOrder: IOrder) => {
    if (!profile) return undefined
    return Object.keys(profile.orders).find((key) => JSON.stringify(profile.orders[key]) === JSON.stringify(selectedOrder))
  }

  const selectedDateOrders = getDateOrders(selectedDate)

  const handleDateRender = (props: PickersDayProps<Dayjs>) => {
    const { day, today, selected } = props;

    const orders = getDateOrders(day)
    const hasOrder = orders.length !== 0

    return (
      <div className={`${styles.day} ${today && styles.today}`}>
        <PickersDay {...props} />
        {hasOrder && <div className={`${styles.dot} ${selected && styles.selected}`} />}
      </div>
    );
  }

  useEffect(() => {
    setId(localStorage.getItem('userAccount') || '')
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Typography variant='h4' className={styles.name}>{profile?.name} 你好</Typography>
        <Typography variant='h6'>你的預訂</Typography>
        <div className={styles.status}>
          {statuses.map((status, index) => (
            <div
              key={status}
              className={selectedStatus === index ? styles.selected : ''}
              onClick={() => setSelectedStatus(index)}
            >
              {status}
            </div>
          ))}
        </div>
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
              <Typography variant='h5' className={styles.title}>
                {selectedDate.format('YYYY/MM/DD')}
              </Typography>
              {selectedDateOrders.length === 0
                ? (
                  <>選擇日期無預訂</>
                )
                : (
                  <>
                    <div className={styles.orders}>
                      {selectedDateOrders.map((order) => (
                        <div className={styles.order} onClick={() => navigate(`./${getOrderKey(order)}`)}>
                          <div className={styles[`bar${order.status}`]} />
                          <div>
                            <Typography variant='h6'>{order.name}</Typography>
                            <Typography>{order.customerCount}位 {order.period}</Typography>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )
              }
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

export default Orders
