import Footer from "../../components/Footer";
import styles from "./index.module.scss";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import banner from "../../images/banner.jpg";
import banner3 from "../../images/banner3.jpg";
import alice from "../../images/host/alice.jpg";
import ItemCard from "../../components/ItemCard";
import { MENUS } from "../../constants/menus";
import { useTranslation } from "react-i18next";
import { app } from "../../constants/FirebaseStorage";

const Experience = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const db = getDatabase(app);
  const dbRef = ref(db);

  const handleSaveEmail = () => {
    get(child(dbRef, "/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const customerEmails = snapshot.val().customerEmails || [];
          customerEmails.push(email);
          set(ref(db, "customerEmails"), customerEmails);
          setEmail("");
          alert("成功！");
        } else {
          alert("失敗請稍後再試！");
        }
      })
      .catch((error) => {
        alert("失敗請稍後再試！");
      });
  };

  return (
    <>
      <div className={styles.banner}>
        <div className={styles.text}>
          <div className={styles.title}>{t("experience.banner.title")}</div>
          <div className={styles.subtitle}>
            {t("experience.banner.subtitle")}
          </div>
        </div>
        <img src={banner3} alt="" />
      </div>
      <div className={styles.description}>
        <div className={styles.content}>
          <div className={styles.text}>
            <div className={styles.title}>
              {t("experience.description.title.1")}
            </div>
            <p>{t("experience.description.title.2")}</p>
            <p>{t("experience.description.title.3")}</p>
            <button onClick={() => navigate("../")}>
              {t("experience.button")}
            </button>
          </div>
          <img src={banner} alt="" />
          <button onClick={() => navigate("../")}>
            {t("experience.button")}
          </button>
        </div>
      </div>
      <div className={styles.adventure}>
        <div className={styles.title}>{t("experience.adventure.title")}</div>
        <div className={styles.cards}>
          <div className={styles.card}>
            <p>{t("experience.adventure.1.title")}</p>
            <div>{t("experience.adventure.1.subtitle")}</div>
          </div>
          <div className={styles.card}>
            <p>{t("experience.adventure.2.title")}</p>
            <div>{t("experience.adventure.2.subtitle")}</div>
          </div>
          <div className={styles.card}>
            <p>{t("experience.adventure.3.title")}</p>
            <div>{t("experience.adventure.3.subtitle")}</div>
          </div>
        </div>
      </div>
      <div className={styles.how}>
        <div className={styles.title}>{t("experience.how.title")}</div>
        <div className={styles.content}>
          <div>{t("experience.how.subtitle.1")}</div>
          <div>{t("experience.how.subtitle.2")}</div>
          <button onClick={() => navigate("../")}>
            {t("experience.button")}
          </button>
        </div>
      </div>
      <div className={styles.hosts}>
        <div className={styles.title}>{t("experience.hosts.title")}</div>
        <div className={styles.hostContainer}>
          <div className={styles.host}>
            <img src={alice} alt="" />
            <div className={styles.text}>
              <div className={styles.name}>
                {t("experience.hosts.host.name")}
              </div>
              <div className={styles.info}>
                {t("experience.hosts.host.info")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.menus}>
        <div className={styles.title}>{t("experience.menus.title")}</div>
        <div className={styles.cards}>
          {MENUS.map((menu, index) => (
            <ItemCard
              images={menu.images}
              location={menu.location}
              name={menu.name}
              price={menu.price}
              onClick={() => navigate(`../experiences/${index}`)}
            />
          ))}
        </div>
      </div>
      <div className={styles.sendEmail}>
        <div className={styles.text}>
          <div className={styles.title}>{t("experience.sendEmail.title")}</div>
          <div className={styles.subtitle}>
            {t("experience.sendEmail.subtitle")}
          </div>
        </div>
        <div className={styles.input}>
          <input
            placeholder={t("experience.sendEmail.email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSaveEmail}>
            {t("experience.sendEmail.send")}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Experience;
