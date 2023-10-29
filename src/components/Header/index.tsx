import { Close, Menu, Person } from '@mui/icons-material'
import styles from './index.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

const Header = () => {
  const menuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { pathname } = useLocation();
  const profile = useSelector((state: RootState) => state.profile.profile)
  const [settingIsOpen, setSettingIsOpen] = useState(false)
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)
  const options = [
    { route: '/os/orders', title: '我的預訂' },
    { route: '/os/timeSetting', title: '時間設定' }
  ]

  const handleLogout = () => {
    localStorage.setItem('accessToken', '')
    localStorage.setItem('uid', '')
    navigate('/os/login')
  }

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setSettingIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>Gatherd OS</div>
      <div className={styles.options}>
        {options.map((option) => (
          <div
            key={option.title}
            className={`${styles.option} ${pathname === option.route && styles.selected}`}
            onClick={() => navigate(option.route)}
          >
            {option.title}
            <div className={styles.bar} />
          </div>
        ))}
      </div>
      <div className={styles.setting} ref={menuRef} onClick={() => setSettingIsOpen(!settingIsOpen)}>
        <Person />{profile?.name}
        {settingIsOpen && (
          <div className={styles.menu}>
            <div className={styles.option} onClick={() => window.open('tel:+886984499836')}>聯繫我們</div>
            <div className={styles.option} onClick={handleLogout}>登出</div>
          </div>
        )}
      </div>
      <div className={styles.mobileMenu}>
        <Menu onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)} />
        {mobileMenuIsOpen && (
          <div className={styles.menu}>
            <Close onClick={() => setMobileMenuIsOpen(false)} />
            <p>選單</p>
            {options.map((option) => (
              <div
                key={option.title}
                className={styles.option}
                onClick={() => {
                  navigate(option.route)
                  setMobileMenuIsOpen(false)
                }}
              >
                {option.title}
              </div>
            ))}
            <div className={styles.option} onClick={() => window.open('tel:+886984499836')}>聯繫我們</div>
            <div className={styles.option} onClick={handleLogout}>登出</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
