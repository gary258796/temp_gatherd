import { useEffect, useRef, useState } from "react"
import styles from './index.module.scss'
import { Outlet, useNavigate } from "react-router-dom"
import { Close, Menu } from "@mui/icons-material"
import { CircularProgress, Typography } from "@mui/material"
import { useProfile } from "../../../hooks/useProfile"

const Home = () => {
  const navigate = useNavigate()
  const menuRef = useRef<HTMLDivElement>(null)
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const { fetching, fetchProfile } = useProfile()

  const handleLogout = () => {
    localStorage.setItem('accessToken', '')
    localStorage.setItem('userAccount', '')
    navigate('/os/login')
  }

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) return navigate('/os/login')
    fetchProfile(localStorage.getItem('userAccount') || '')
  }, [])

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

  if (fetching) return <CircularProgress />

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
              navigate('/os/orders')
              setMenuIsOpen(false)
            }}>
              <Typography>你的預訂</Typography>
            </div>
            <div onClick={() => {
              navigate('/os/timeSetting')
              setMenuIsOpen(false)
            }}>
              <Typography>設定日期</Typography>
            </div>
            <div className={styles.mobileHidden}>
              <Typography>聯繫我們</Typography>
            </div>
            <div className={styles.mobileHidden} onClick={handleLogout}>
              <Typography>登出</Typography>
            </div>
          </div>
          <div className={styles.mobileShow}>
            <div className={styles.contact}>聯繫我們</div>
            <div className={styles.logout} onClick={handleLogout}>登出</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
