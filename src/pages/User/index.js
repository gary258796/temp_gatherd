import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import userImg from "../../images/user.png";
import orderImg from "../../images/order.png";

const User = (props) => {
  const { onLogout } = props;
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("..");
    localStorage.setItem("user", "");
    onLogout();
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>帳號</div>
      <div className={styles.cards}>
        <div className={styles.card} onClick={() => navigate("./profile")}>
          <img src={userImg} alt="" />
          <div>
            <p>個人資料</p>
            <h6>提供個人資料以及聯絡方式</h6>
          </div>
        </div>
        <div className={styles.card} onClick={() => navigate("./orders")}>
          <img src={orderImg} alt="" />
          <div>
            <p>體驗記錄</p>
            <h6>查看體驗紀錄以及即將進行的體驗</h6>
          </div>
        </div>
      </div>
      <button onClick={handleLogout}>登出</button>
    </div>
  );
};

export default User;
