import { Typography } from '@mui/material'
import styles from './index.module.scss'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { IOrder } from '../../../interfaces/profile';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import OrderDetailView from './OrderDetailModal';
import { getOrderStatus } from '../../../utils/Order';

const Orders = () => {
  const [selectedStatus, setSelectedStatus] = useState(0)
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<IOrder>()
  const profile = useSelector((state: RootState) => state.profile.profile)
  const statuses = ['全部', '待處理', '聯繫中', '完成', '取消']
  
  const getDateOrders = (date: dayjs.Dayjs | null) => {
    return profile?.orders
      ? Object.values(profile.orders).filter((order) => {
          return order.date === date?.format('YYYY/MM/DD') && (selectedStatus ? selectedStatus === getOrderStatus(order) : true)
        })
      : []
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

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Typography variant='h4' className={styles.name}>{profile?.name} 你好!</Typography>
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
                        <div key={`${order.date}-${order.period}-${order.name}`} className={styles.order} onClick={() => setSelectedOrder(order)}>
                          <div className={styles[`bar${getOrderStatus(order)}`]} />
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
      {selectedOrder && <OrderDetailView order={selectedOrder} onClose={() => setSelectedOrder(undefined)} />}
    </div>
  )
}

export default Orders
