import logo from "../../images/logo.png";
import userImg from "../../images/user.png";
import { saveUserData } from "../../utils/user";
import styles from "./index.module.scss";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "../../constants/FirebaseStorage";

const Header = (props) => {
  const { user, onUserChange } = props;

  const handleLogin = async (response) => {
    saveUserData(response.credential);
    const user = jwt_decode(response.credential);
    onUserChange(user);
    const db = getDatabase(app);
    await set(ref(db, `users/${response.clientId}`), user);
  };

  return (
    <div className={styles.container}>
      <img src={logo} alt="" className={styles.logo} />
      {!!user ? (
        <img src={user.picture || userImg} alt="" className={styles.user} />
      ) : (
        <GoogleLogin
          onSuccess={handleLogin}
          onError={() => alert("登入失敗請重新嘗試")}
        />
      )}
    </div>
  );
};

export default Header;
