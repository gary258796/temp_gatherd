import logo from "../../images/logo.png";
import userImg from "../../images/user.png";
import googleImg from "../../images/google.png";
import styles from "./index.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Header = (props) => {
  const { user, onLogin } = props;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const className = () => {
    const paths = pathname.split("/");
    if (paths[1] === "") {
      return styles.padding80;
    }
    if (paths[1] === "aboutus") {
      return styles.padding120;
    }
    if (paths[1] === "joinus") {
      return styles.padding120;
    }
    if (paths[1] === "experiences") {
      if (paths[3]) {
        return styles.checkout;
      } else {
        return styles.menu;
      }
    }
    if (paths[1] === "user") {
      return styles.menu;
    }
    return "";
  };

  useEffect(() => {
    className();
  }, [pathname]);

  return (
    <div className={styles.container}>
      <div className={`${styles.box} ${className()}`}>
        <img
          src={logo}
          alt=""
          className={styles.logo}
          onClick={() => navigate("..")}
        />
        {!!user ? (
          <img
            src={user.picture || userImg}
            alt=""
            className={styles.user}
            onClick={() => navigate("../user")}
          />
        ) : (
          <div className={styles.google} onClick={onLogin}>
            <img src={googleImg} alt="" /> Login
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
