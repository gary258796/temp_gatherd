import logo from "../../images/logo.png";
import userImg from "../../images/user.png";
import googleImg from "../../images/google.png";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const { user, onLogin } = props;
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
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
  );
};

export default Header;
