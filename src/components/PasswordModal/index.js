import styles from "./index.module.scss";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import logoImg from "../../images/logo.png";

const PasswordModal = (props) => {
  const { isOpen, onCorrect } = props;
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleConfirmOnClick = () => {
    if (password === "gatherd") {
      setError(false);
      onCorrect();
    } else {
      setError(true);
    }
  };

  if (!isOpen) return <></>;

  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <img className={styles.logo} src={logoImg} alt="" />
        {/* <TextField
          value={password}
          label="密碼"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          className={styles.input}
          error={error}
        /> */}
        <input
          value={password}
          label="密碼"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={handleConfirmOnClick}>
          確認
        </Button>
      </div>
    </div>
  );
};

export default PasswordModal;
