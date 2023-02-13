import styles from "./index.module.scss";
import { Button } from "@mui/material";
import { useState } from "react";
import logoImg from "../../images/logo.png";

const PasswordModal = (props) => {
  const { isOpen, onCorrect } = props;
  const [password, setPassword] = useState("");

  const handleConfirmOnClick = () => {
    if (password === "gatherd") {
      onCorrect();
      document.body.style.zoom = 1;
    }
  };

  if (!isOpen) return <></>;

  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <img className={styles.logo} src={logoImg} alt="" />
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
