import { Typography } from '@mui/material'
import styles from './index.module.scss'
import { ReactNode, useState } from "react"

const ExpandText = ({ children }: { children: ReactNode }) => {
  const [isExpand, setIsExpand] = useState(false)

  return (
    <>
      <div className={`${styles.container} ${isExpand && styles.expand}`}>
        {children}
      </div>
      <Typography variant='caption' className={styles.more} onClick={() => setIsExpand(!isExpand)}>
        {isExpand ? '隱藏' : '更多'}
      </Typography>
    </>
  )
}

export default ExpandText
