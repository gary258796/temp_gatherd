import { useEffect, useRef, useState } from "react"
import styles from './index.module.scss'
import { Outlet, useNavigate } from "react-router-dom"
import { Close, Menu } from "@mui/icons-material"
import { Typography } from "@mui/material"

const Home = () => {
  const navigate = useNavigate()
  const menuRef = useRef<HTMLDivElement>(null)
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  useEffect(() => {
    !localStorage.getItem('accessToken') ? navigate('/os/login') : navigate('/os/orders')
  }, [navigate])

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Menu onClick={() => setMenuIsOpen(true)} />
        <div className={styles.logo}>Gatherd OS</div>
        <Typography>beta</Typography>
      </div>
      <Outlet />
      {menuIsOpen && (
        <div className={styles.menu} ref={menuRef}>
          <div className={styles.header}>
            <Close onClick={() => setMenuIsOpen(false)} />
            <div className={styles.logo}>Gatherd OS</div>
            <Typography>beta</Typography>
          </div>
          <div className={styles.options}>
            <div onClick={() => {
              navigate('/orders')
              setMenuIsOpen(false)
            }}>
              <Typography>你的預訂</Typography>
            </div>
            <div onClick={() => {
              navigate('/timeSetting')
              setMenuIsOpen(false)
            }}>
              <Typography>設定日期</Typography>
            </div>
            <div className={styles.mobileHidden}>
              <Typography>聯繫我們</Typography>
            </div>
            <div className={styles.mobileHidden} onClick={() => {
              localStorage.setItem('accessToken', '')
              navigate('/login')
            }}>
              <Typography>登出</Typography>
            </div>
          </div>
          <div className={styles.mobileShow}>
            <div className={styles.contact}>聯繫我們</div>
            <div className={styles.logout}>登出</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
