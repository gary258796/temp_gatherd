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
import { ORDER_STATUS, getDateOrders, getOrderStatus } from '../../../utils/Order';

const Orders = () => {
  const [selectedStatusIndex, setSelectedStatusIndex] = useState(0)
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<IOrder>()
  const profile = useSelector((state: RootState) => state.profile.profile)
  const statuses = [
    { title: '全部', statuses: undefined },
    { title: '待處理', statuses: [ORDER_STATUS.WAIT] },
    { title: '聯繫中', statuses: [ORDER_STATUS.CONTACT] },
    { title: '完成', statuses: [ORDER_STATUS.DONE] },
    { title: '取消', statuses: [ORDER_STATUS.CANCELLED] }
  ]

  const selectedDateOrders = getDateOrders({ date: selectedDate, orders: profile?.orders, statuses: statuses[selectedStatusIndex].statuses })

  const handleDateRender = (props: PickersDayProps<Dayjs>) => {
    const { day, today, selected } = props;

    const orders = getDateOrders({ date: day, orders: profile?.orders, statuses: statuses[selectedStatusIndex].statuses })
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
              key={status.title}
              className={selectedStatusIndex === index ? styles.selected : ''}
              onClick={() => setSelectedStatusIndex(index)}
            >
              {status.title}
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
