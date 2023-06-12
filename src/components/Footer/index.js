import styles from "./index.module.scss";
import lineImg from "../../images/line.png";
import globalImg from "../../images/global.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = (props) => {
  const { className = "" } = props;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { i18n, t } = useTranslation();

  const handleRedirect = (path) => {
    if (pathname === path) {
      window.scrollTo(0, 0);
      return;
    }
    navigate(`..${path}`);
  };

  return (
    <div className={`${styles.footer} ${className}`}>
      <div className={styles.buttons}>
        <div className={styles.button} style={{ cursor: "auto" }}>
          ©2023 Gatherd, Inc.
        </div>
        <div
          className={styles.button}
          onClick={() => handleRedirect("/aboutus")}
        >
          {t("footer.about")}
        </div>
        <div
          className={styles.button}
          onClick={() => handleRedirect("/joinus")}
        >
          {t("footer.joinus")}
        </div>
        <div className={styles.button} onClick={() => handleRedirect("/")}>
          {t("footer.experience")}
        </div>
        <div
          className={styles.button}
          onClick={() => window.open("tel:+886984499836")}
        >
          {t("footer.phone")}
        </div>
        <div
          className={styles.button}
          onClick={() => window.open("mailto:dinegatherd@gmail.com")}
        >
          {t("footer.email")}
        </div>
        <div
          className={styles.button}
          onClick={() => window.open("https://lin.ee/CGfqTpp")}
        >
          <img src={lineImg} alt="" />
        </div>
      </div>
      <div
        className={styles.global}
        onClick={() =>
          i18n.changeLanguage(i18n.language === "en" ? "cn" : "en")
        }
      >
        <img src={globalImg} alt="" />
        {t("footer.language")}
      </div>
    </div>
  );
};

export default Footer;
