import dayjs from "dayjs";
import { IOrder } from "../interfaces/profile";

/** 訂單狀態（0:已取消, 1:待處理, 2:聯繫中, 3:已完成） */
export const getOrderStatus = (order: IOrder) => {
  // 已取消
  if (order.status === 0) return 0
  const orderDate = dayjs(`${order.date} ${order.period}`, 'YYYY/MM/DD HH:mm')
  // 已超過用餐時間
  if (orderDate < dayjs()) return 3
  // 已填寫表單
  if (order.form) return 2
  return 1
}