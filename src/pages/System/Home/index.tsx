import { useEffect, useRef, useState } from "react"
import styles from './index.module.scss'
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { Close, Menu } from "@mui/icons-material"
import { CircularProgress, Typography } from "@mui/material"
// import { useProfile } from "../../../hooks/useProfile"

const Home = () => {
  const navigate = useNavigate()
  // const { pathname } = useLocation()
  const menuRef = useRef<HTMLDivElement>(null)
  const [id, setId] = useState('')
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  // const { profile, fetching, fetchProfile } = useProfile({ id })

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) return navigate('/os/login')
    navigate('/os/orders')
    setId(localStorage.getItem('userAccount') || '')
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

  // useEffect(() => {
  //   fetchProfile()
  // }, [pathname])

  // if (fetching) return <CircularProgress />

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
