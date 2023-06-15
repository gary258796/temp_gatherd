import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";

const NotifySuccessModal = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <h1>{t("notifySuccessModal.title")}</h1>
        <h3>{t("notifySuccessModal.subtitle")}</h3>
        <button onClick={onClose}>{t("notifySuccessModal.button")}</button>
      </div>
    </div>
  );
};

export default NotifySuccessModal;
