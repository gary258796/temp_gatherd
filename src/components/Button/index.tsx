import { CircularProgress, Typography } from '@mui/material';
import styles from './index.module.scss'

interface Props {
  children:React.ReactNode;
  onClick?:() => void;
  disabled?:boolean;
  loading?:boolean;
  className?:string;
}

const Button = (props:Props) => {
  const {
    children,
    onClick = () => {},
    disabled = false,
    loading = false,
    className = ''
  } = props

  return (
    <button className={`${styles.button} ${(disabled || loading) && styles.disabled} ${className}`} onClick={onClick}>
      {loading ? <CircularProgress className={styles.loading} /> : <Typography>{children}</Typography>}
    </button>
  )
}

export default Button
