import { Typography } from "@mui/material"
import Button from "../../../components/Button"
import { data } from '../Restaurant'
import { QRCodeSVG } from 'qrcode.react'
import styles from './index.module.scss'

const OrderSuccess = () => {
  const { name, line } = data
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.title}>
          <Typography variant="h6">請加入 {name} 官方LINE</Typography>
          <Typography variant="h6">我們會與你確認更多預訂內容</Typography>
        </div>
        <QRCodeSVG value={line} />
        <Button onClick={() => window.open(line)}>立即加入</Button>
      </div>
    </div>
  )
}

export default OrderSuccess
