import styles from "./index.module.scss";

const NotifySuccessModal = ({ onClose }) => {

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <h1>已通知</h1>
        <h3>將於可預約時 Email 通知</h3>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default NotifySuccessModal;
