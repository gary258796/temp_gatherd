import { AppBar, TextField, Toolbar, Typography } from "@mui/material"
import styles from './index.module.scss';
import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../../settings/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        userCredential.user.getIdToken().then((response) => {
          localStorage.setItem('accessToken', response)
          localStorage.setItem('uid', userCredential.user.uid)
          navigate('/os/orders')
        })
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        setLoading(false)
      });
  }

  useEffect(() => {
    if (localStorage.getItem('accessToken')) navigate('/os/orders')
  }, [])

  return (
    <>
      <AppBar component="nav">
        <Toolbar>
          <Typography>Gatherd OS</Typography>
        </Toolbar>
      </AppBar>
      <div className={styles.container}>
        <div className={styles.box}>
          <Typography>歡迎使用 Gatherd OS</Typography>
          <TextField
            label="電子信箱"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            value={password}
            label="密碼"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Button
            disabled={!email || !password}
            onClick={handleLogin}
            loading={loading}
          >
            登入
          </Button>
        </div>
      </div>
    </>
  )
}

export default Login
