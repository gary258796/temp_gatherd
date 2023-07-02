import Footer from "../../components/Footer";
import styles from "./index.module.scss";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import banner5 from "../../images/banner5.jpg";
import banner4 from "../../images/banner4.jpg";
import smile from "../../images/smile.png";
import group from "../../images/group.png";
import home from "../../images/home.png";
import arrow from "../../images/arrow.png";
import ItemCard from "../../components/ItemCard";
import { MENUS } from "../../constants/menus";
import { useTranslation } from "react-i18next";
import { app } from "../../constants/FirebaseStorage";
// import HostCard from "../../components/HostCard";
// import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const AboutUs = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [expandQuestionIndex, setExpandQuestionIndex] = useState();
  const db = getDatabase(app);
  const dbRef = ref(db);
  // const hosts = MENUS.slice(0, 3);
  const lang = i18n.language;
  const questions = {
    en: [
      {
        title: "體驗內容會有什麼？",
        answer:
          "內容包含各種私房美食、手作體驗、食旅體驗。這些體驗都是由美食創作家精心設計，以他們最擅長的方式分享給大家。",
      },
      {
        title: "這些美食創作家是誰？",
        answer:
          "他們來自不同文化、背景或職業，但是他們都是對料理有熱情也樂於分享的人。",
      },
      {
        title: "如何預訂體驗？",
        answer:
          "找到自己喜歡的體驗，選擇可預定的時間，就可以直接預訂；如沒有可預定的時間，可點擊「可預約通知我」，將會在美食創作家可預定時通知你。",
      },
    ],
    cn: [
      {
        title: "體驗內容會有什麼？",
        answer:
          "內容包含各種私房美食、手作體驗、食旅體驗。這些體驗都是由美食創作家精心設計，以他們最擅長的方式分享給大家。",
      },
      {
        title: "這些美食創作家是誰？",
        answer:
          "他們來自不同文化、背景或職業，但是他們都是對料理有熱情也樂於分享的人。",
      },
      {
        title: "如何預訂體驗？",
        answer:
          "找到自己喜歡的體驗，選擇可預定的時間，就可以直接預訂；如沒有可預定的時間，可點擊「可預約通知我」，將會在美食創作家可預定時通知你。",
      },
    ],
  };

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
          <div className={styles.title}>{t("aboutUs.banner.title")}</div>
          <div className={styles.subtitle}>{t("aboutUs.banner.subtitle")}</div>
        </div>
        <img src={banner5} alt="" />
      </div>
      <div className={styles.description}>
        <div className={styles.content}>
          <div className={styles.text}>
            <div className={styles.title}>{t("aboutUs.description.title")}</div>
            <p>{t("aboutUs.description.subtitle")}</p>
            <button onClick={() => navigate("../")}>
              {t("aboutUs.button")}
            </button>
          </div>
          <img src={banner4} alt="" />
          <button onClick={() => navigate("../")}>{t("aboutUs.button")}</button>
        </div>
      </div>
      <div className={styles.adventure}>
        {/* <div className={styles.title}>{t("aboutUs.adventure.title")}</div> */}
        <div className={styles.cards}>
          <div className={styles.card}>
            <img src={smile} alt="" />
            <p>{t("aboutUs.adventure.1.title")}</p>
            <div>{t("aboutUs.adventure.1.subtitle")}</div>
          </div>
          <div className={styles.card}>
            <img src={home} alt="" />
            <p>{t("aboutUs.adventure.2.title")}</p>
            <div>{t("aboutUs.adventure.2.subtitle")}</div>
          </div>
          <div className={styles.card}>
            <img src={group} alt="" />
            <p>{t("aboutUs.adventure.3.title")}</p>
            <div>{t("aboutUs.adventure.3.subtitle")}</div>
          </div>
        </div>
      </div>
      <div className={styles.qa}>
        <div className={styles.title}>常見問題</div>
        <div className={styles.questionContainer}>
          {questions[lang].map((question, index) => (
            <div
              key={question.title}
              className={styles.question}
              onClick={() =>
                setExpandQuestionIndex(
                  expandQuestionIndex === index ? undefined : index
                )
              }
            >
              <div className={styles.label}>
                <p>
                  {index + 1}. {question.title}
                </p>
                <img src={arrow} alt="" />
              </div>
              {expandQuestionIndex === index && (
                <div className={styles.expand}>{question.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* <div className={styles.how}>
        <div className={styles.title}>{t("experience.how.title")}</div>
        <div className={styles.content}>
          <div>{t("experience.how.subtitle.1")}</div>
          <div>{t("experience.how.subtitle.2")}</div>
          <button onClick={() => navigate("../")}>
            {t("experience.button")}
          </button>
        </div>
      </div> */}
      {/* <div className={styles.hosts}>
        <div className={styles.title}>{t("experience.hosts.title")}</div>
        <div className={styles.cards}>
          {hosts.map((host) => (
            <div onClick={() => navigate(`../experiences/${host.id}`)}>
              <HostCard key={host.id} host={host[lang]} />
            </div>
          ))}
        </div>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={24}
          className={styles.swiper}
        >
          {MENUS.map((menu, index) => (
            <SwiperSlide
              className={styles.slide}
              key={index}
              onClick={() => navigate(`../experiences/${menu.id}`)}
            >
              <HostCard host={menu[lang]} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div> */}
      <div className={styles.menus}>
        <div className={styles.title}>{t("aboutUs.menus.title")}</div>
        <div className={styles.cards}>
          {MENUS.map((menu, index) => (
            <ItemCard
              key={menu.id}
              images={menu[lang].images}
              location={menu[lang].location}
              name={menu[lang].name}
              price={menu[lang].price}
              onClick={() => navigate(`../experiences/${menu.id}`)}
            />
          ))}
        </div>
      </div>
      <div className={styles.sendEmail}>
        <div className={styles.text}>
          <div className={styles.title}>{t("aboutUs.sendEmail.title")}</div>
          <div className={styles.subtitle}>
            {t("aboutUs.sendEmail.subtitle")}
          </div>
        </div>
        <div className={styles.input}>
          <input
            placeholder={t("aboutUs.sendEmail.email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSaveEmail}>
            {t("aboutUs.sendEmail.send")}
          </button>
        </div>
      </div>
      <Footer className={styles.footer} />
    </>
  );
};

export default AboutUs;
