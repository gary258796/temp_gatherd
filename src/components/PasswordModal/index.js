import styles from "./index.module.scss";
import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

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
        <Typography variant="h3">Gatherd</Typography>
        <TextField
          value={password}
          label="密碼"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          className={styles.input}
          error={error}
        />
        <Button variant="contained" onClick={handleConfirmOnClick}>
          確認
        </Button>
      </div>
    </div>
  );
};

export default PasswordModal;
