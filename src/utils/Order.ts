import dayjs from "dayjs";
import { IOrder } from "../interfaces/profile";

export const ORDER_STATUS = {
  CANCELLED: 0,
  WAIT: 1,
  CONTACT: 2,
  DONE: 3
}

/** 訂單狀態（0:已取消, 1:待處理, 2:聯繫中, 3:已完成） */
export const getOrderStatus = (order: IOrder) => {
  // 已取消
  if (order.status === 0) return ORDER_STATUS.CANCELLED
  const orderDate = dayjs(`${order.date} ${order.period}`, 'YYYY/MM/DD HH:mm')
  // 已超過用餐時間
  if (orderDate < dayjs()) return ORDER_STATUS.DONE
  // 已填寫表單
  if (order.form) return ORDER_STATUS.CONTACT
  return ORDER_STATUS.WAIT
}

export const getDateOrders = ({ date, orders = {}, statuses = [] }:{ date?: dayjs.Dayjs | null, orders?: { [key: string]: IOrder }, statuses?: number[] }) => {
  if (!date) return []
  return Object.values(orders).filter((order) => {
    if (order.date !== date.format('YYYY/MM/DD')) return false
    if (statuses.length > 0 && !statuses.includes(getOrderStatus(order))) return false
    return true
  })
}

export const getDateCustomers = ({ date, orders }: { date: dayjs.Dayjs, orders: { [key: string]: IOrder } }) => {
  const dateOrders = getDateOrders({ date, orders, statuses: [ORDER_STATUS.WAIT, ORDER_STATUS.CONTACT] })
  const customers = dateOrders.reduce((a, b) => {
    return a + Number(b.customerCount);
  }, 0);
  return customers
}
