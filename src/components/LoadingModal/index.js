import { CircularProgress } from "@mui/material";
import styles from "./index.module.scss";

const LoadingModal = () => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <CircularProgress />
      </div>
    </div>
  );
};

export default LoadingModal;
