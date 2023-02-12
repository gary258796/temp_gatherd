import styles from "./index.module.scss";
import lineImg from "../../images/line.png";
import phoneImg from "../../images/phone.png";
import mailImg from "../../images/email.png";
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleRedirect = (path) => {
    if (pathname === path) {
      window.scrollTo(0, 0);
      return;
    }
    navigate(`..${path}`);
  };

  return (
    <div className={styles.footer}>
      <div>©2023 Gatherd, Inc.</div>
      <div className={styles.buttons}>
        <div
          className={styles.button}
          onClick={() => handleRedirect("/explore")}
        >
          關於 Gatherd
        </div>
        <div
          className={styles.button}
          onClick={() => handleRedirect("/joinus")}
        >
          美食創作家
        </div>
        <div className={styles.button} onClick={() => handleRedirect("/")}>
          體驗
        </div>
        <div
          className={styles.button}
          onClick={() => window.open("tel:+886984499836")}
        >
          聯絡電話
        </div>
        <div
          className={styles.button}
          onClick={() => window.open("mailto:eatgatherd@gmail.com")}
        >
          電子信箱
        </div>
        <div
          className={styles.button}
          onClick={() => window.open("https://lin.ee/CGfqTpp")}
        >
          <img src={lineImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
