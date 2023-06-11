import { saveUserData } from "../../utils/user";
import styles from "./index.module.scss";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const LoginModal = (props) => {
  const { onUserChange, onClose } = props;

  const handleLogin = async (response) => {
    saveUserData(response.credential);
    const user = jwt_decode(response.credential);
    onUserChange(user);
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <h1>登入</h1>
        <GoogleLogin
          onSuccess={handleLogin}
          onError={() => alert("登入失敗請重新嘗試")}
        />
        <p>點擊按鈕以登入 Gatherd</p>
        <h3 onClick={onClose}>取消</h3>
      </div>
    </div>
  );
};

export default LoginModal;
