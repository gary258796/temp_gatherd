import logo from "../../images/logo.png";
import userImg from "../../images/user.png";
import googleImg from "../../images/google.png";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginModal from "../LoginModal";

const Header = (props) => {
  const { user, onUserChange } = props;
  const navigate = useNavigate();
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);

  const handleUserOnChange = (user) => {
    onUserChange(user);
    setLoginModalIsOpen(false);
  };

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
        <div
          className={styles.google}
          onClick={() => setLoginModalIsOpen(true)}
        >
          <img src={googleImg} alt="" /> Login
        </div>
      )}
      {loginModalIsOpen && (
        <LoginModal
          onUserChange={handleUserOnChange}
          onClose={() => setLoginModalIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Header;
