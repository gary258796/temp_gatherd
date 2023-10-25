import Footer from "../../components/Footer";
import styles from "./index.module.scss";
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
import "swiper/css";

const AboutUs = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [expandQuestionIndex, setExpandQuestionIndex] = useState();
  const questions = [
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
  ]

  return (
    <>
      <div className={styles.banner}>
        <div className={styles.text}>
          <div className={styles.title}>讓任何人都能擁有</div>
          <div className={styles.subtitle}>「像家的食物體驗」</div>
        </div>
        <img src={banner5} alt="" />
      </div>
      <div className={styles.description}>
        <div className={styles.content}>
          <div className={styles.text}>
            <div className={styles.title}>料理讓人相聚</div>
            <p>{'Gatherd 致力於讓人們能夠輕鬆分享食物，讓人們能夠在異地體驗到家的感覺。\n\n我們與美食創作家成為夥伴，透過一個個獨特的食物體驗建立文化的交流，人與人之間的橋樑。'}</p>
            <button onClick={() => navigate("/archive")}>
              開始體驗
            </button>
          </div>
          <img src={banner4} alt="" />
          <button onClick={() => navigate("/archive")}>開始體驗</button>
        </div>
      </div>
      <div className={styles.adventure}>
        {/* <div className={styles.title}>{t("aboutUs.adventure.title")}</div> */}
        <div className={styles.cards}>
          <div className={styles.card}>
            <img src={smile} alt="" />
            <p>體驗過程</p>
            <div>除了味蕾的享受，我們想給客人更多的是體驗，美食創作家給你的會是一段難忘的旅程</div>
          </div>
          <div className={styles.card}>
            <img src={home} alt="" />
            <p>溫馨空間</p>
            <div>有別一般餐廳的場地的吵雜或是擁擠，讓你就像回到了家中，如此樸實卻難得</div>
          </div>
          <div className={styles.card}>
            <img src={group} alt="" />
            <p>多樣化</p>
            <div>體驗有不同形式風格，但美食創作家們都非常熱情，想把自己所愛分享給更多人</div>
          </div>
        </div>
      </div>
      <div className={styles.qa}>
        <div className={styles.title}>常見問題</div>
        <div className={styles.questionContainer}>
          {questions.map((question, index) => (
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
          <button onClick={() => navigate("/archive")}>
            {t("experience.button")}
          </button>
        </div>
      </div> */}
      {/* <div className={styles.hosts}>
        <div className={styles.title}>{t("experience.hosts.title")}</div>
        <div className={styles.cards}>
          {hosts.map((host) => (
            <div onClick={() => navigate(`/archive/experiences/${host.id}`)}>
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
              onClick={() => navigate(`/archive/experiences/${menu.id}`)}
            >
              <HostCard host={menu[lang]} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div> */}
      <div className={styles.menus}>
        <div className={styles.title}>開始探索</div>
        <div className={styles.cards}>
          {MENUS.map((menu) => (
            <ItemCard
              key={menu.id}
              images={menu.images}
              location={menu.location}
              name={menu.name}
              price={menu.price}
              onClick={() => navigate(`/archive/experiences/${menu.id}`)}
            />
          ))}
        </div>
      </div>
      <div className={styles.sendEmail}>
        <div className={styles.text}>
          <div className={styles.title}>了解更多</div>
          <div className={styles.subtitle}>
          請留下電子信箱，我們將分享更多相關資訊。
          </div>
        </div>
        <div className={styles.input}>
          <input
            placeholder="電子信箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button>
            送出
          </button>
        </div>
      </div>
      <Footer className={styles.footer} />
    </>
  );
};

export default AboutUs;
