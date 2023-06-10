import logo from "../../images/logo.png";
import userImg from "../../images/user.png";
import { saveUserData } from "../../utils/user";
import styles from "./index.module.scss";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "../../constants/FirebaseStorage";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const { user, onUserChange } = props;
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogin = async (response) => {
    saveUserData(response.credential);
    const user = jwt_decode(response.credential);
    onUserChange(user);
    const db = getDatabase(app);
    await set(ref(db, `users/${user.email.split("@")[0]}`), user);
  };

  const menuItemOnClick = (to) => {
    navigate(to);
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className={styles.container}>
      <img src={logo} alt="" className={styles.logo} />
      {!!user ? (
        <div>
          <img
            src={user.picture || userImg}
            alt=""
            className={styles.user}
            onClick={() => setMenuOpen(true)}
          />
          {menuOpen && (
            <div className={styles.menu} ref={menuRef}>
              <div onClick={() => menuItemOnClick("../profile")}>個人資料</div>
              <div onClick={() => menuItemOnClick("../orders")}>訂單記錄</div>
              <div>登出</div>
            </div>
          )}
        </div>
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
