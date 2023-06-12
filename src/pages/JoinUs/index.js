import React, { useState } from "react";
import styles from "./index.module.scss";
import banner from "../../images/banner.jpg";
import banner2 from "../../images/banner2.jpg";
import creator1 from "../../images/creators/1.jpg";
import creator2 from "../../images/creators/2.jpg";
import creator3 from "../../images/creators/3.jpg";
// import eric from "../../images/vendors/eric.png";
// import joe from "../../images/vendors/joe.png";
// import gary from "../../images/vendors/gary.png";
import Footer from "../../components/Footer";
// import { useNavigate } from "react-router-dom";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { useTranslation } from "react-i18next";
import { app } from "../../constants/FirebaseStorage";

const JoinUs = () => {
  // const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const creator = [
    {
      title: t("joinus.creator.1.title"),
      subtitle: t("joinus.creator.1.subtitle"),
      image: creator1,
    },
    {
      title: t("joinus.creator.2.title"),
      subtitle: t("joinus.creator.2.subtitle"),
      image: creator2,
    },
    {
      title: t("joinus.creator.3.title"),
      subtitle: t("joinus.creator.3.subtitle"),
      image: creator3,
    },
  ];
  const benefits = [
    {
      number: "01",
      title: t("joinus.benefits.1.title"),
      subtitle: t("joinus.benefits.1.subtitle"),
    },
    {
      number: "02",
      title: t("joinus.benefits.2.title"),
      subtitle: t("joinus.benefits.2.subtitle"),
    },
    {
      number: "03",
      title: t("joinus.benefits.3.title"),
      subtitle: t("joinus.benefits.3.subtitle"),
    },
    {
      number: "04",
      title: t("joinus.benefits.4.title"),
      subtitle: t("joinus.benefits.4.subtitle"),
    },
    {
      number: "05",
      title: t("joinus.benefits.5.title"),
      subtitle: t("joinus.benefits.5.subtitle"),
    },
    {
      number: "06",
      title: t("joinus.benefits.6.title"),
      subtitle: t("joinus.benefits.6.subtitle"),
    },
  ];
  const how = [
    {
      number: "1",
      title: t("joinus.how.1.title"),
      subtitle: t("joinus.how.1.subtitle"),
    },
    {
      number: "2",
      title: t("joinus.how.2.title"),
      subtitle: t("joinus.how.2.subtitle"),
    },
    {
      number: "3",
      title: t("joinus.how.3.title"),
      subtitle: t("joinus.how.3.subtitle"),
    },
  ];
  // const vendors = [
  //   { name: "Eric C", image: eric },
  //   { name: "Joe H", image: joe },
  //   { name: "Gary L", image: gary },
  // ];
  // const firebaseConfig = {
  //   databaseURL:
  //     "https://gatherd-test-default-rtdb.asia-southeast1.firebasedatabase.app/",
  // };

  // const app = initializeApp(firebaseConfig);

  const handleSaveEmail = () => {
    const db = getDatabase(app);
    const dbRef = ref(db);
    get(child(dbRef, "/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const emails = snapshot.val().emails || [];
          emails.push(email);
          set(ref(db, "emails"), emails);
          setEmail("");
          alert(t("joinus.success"));
        } else {
          alert(t("joinus.error"));
        }
      })
      .catch((error) => {
        alert(t("joinus.error"));
      });
  };

  return (
    <>
      <div className={styles.banner}>
        <img className={styles.backgroundImg} src={banner} alt="" />
        <div className={styles.cover} />
        <div className={styles.text}>
          <div className={styles.title}>{t("joinus.banner.title")}</div>
          <div className={styles.subtitle}>{t("joinus.banner.subtitle")}</div>
          <button
            className={styles.button}
            onClick={() => window.open("https://lin.ee/CGfqTpp")}
          >
            {t("joinus.button")}
          </button>
        </div>
      </div>
      <div className={styles.why}>
        <div className={styles.title}>
          <div>{t("joinus.why.title")}</div>
          <div>
            <div className={styles.dash}>——</div>
            {t("joinus.why.chef")}
          </div>
        </div>
        <div className={styles.subtitle}>{t("joinus.why.subtitle")}</div>
      </div>
      <div className={styles.creator}>
        <div className={styles.creatorTitle}>{t("joinus.creator.title")}</div>
        <div className={styles.sections}>
          {creator.map((c) => (
            <div className={styles.section} key={c.title}>
              <img src={c.image} alt="" />
              <div className={styles.content}>
                <div className={styles.title}>{c.title}</div>
                <div className={styles.subtitle}>{c.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.benefits}>
        <div className={styles.title}>{t("joinus.benefits.title")}</div>
        <div className={styles.container}>
          {benefits.map((benefit) => (
            <div className={styles.section} key={benefit.number}>
              <div className={styles.number}>{benefit.number}</div>
              <div className={styles.title}>{benefit.title}</div>
              <div className={styles.subtitle}>{benefit.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.problem}>
        <div className={styles.text}>
          <div className={styles.subtitle}>{t("joinus.problem.title")}</div>
          <button onClick={() => window.open("https://lin.ee/CGfqTpp")}>
            {t("joinus.button")}
          </button>
        </div>
        <div className={styles.image}>
          <img src={banner2} alt="" />
        </div>
      </div>
      {/* <div className={styles.vendors}>
        <div className={styles.title}>立即體驗</div>
        <div className={styles.subtitle}>
          馬上來認識我們的美食創作家，每一位都有自己的特色，在加入我們之前可以先來試這會是個怎麼樣的體驗。
        </div>
        <div className={styles.pictures}>
          {vendors.map((vendor) => (
            <div
              className={styles.vendor}
              key={vendor.name}
              onClick={() => navigate("../")}
            >
              <img src={vendor.image} alt="" />
              <div className={styles.name}>{vendor.name}</div>
            </div>
          ))}
        </div>
      </div> */}
      <div className={styles.how}>
        <div className={styles.title}>{t("joinus.how.title")}</div>
        <div className={styles.sections}>
          {how.map((h) => (
            <div className={styles.section} key={h.number}>
              <div className={styles.number}>{h.number}</div>
              <div className={styles.sectionTitle}>{h.title}</div>
              <div className={styles.sectionSubtitle}>{h.subtitle}</div>
            </div>
          ))}
        </div>
        <button
          className={styles.button}
          onClick={() => window.open("https://lin.ee/CGfqTpp")}
        >
          {t("joinus.button")}
        </button>
      </div>
      <div className={styles.sendEmail}>
        <div className={styles.text}>
          <div className={styles.title}>{t("joinus.sendEmail.title")}</div>
          <div className={styles.subtitle}>
            {t("joinus.sendEmail.subtitle")}
          </div>
        </div>
        <div className={styles.input}>
          <input
            placeholder={t("joinus.sendEmail.email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSaveEmail}>
            {t("joinus.sendEmail.send")}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JoinUs;
