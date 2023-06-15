import styles from "./index.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { useNavigate, useParams } from "react-router-dom";
import { MENUS } from "../../constants/menus";
import Footer from "../../components/Footer";
import { useState } from "react";
import closeImg from "../../images/close.png";
import { useTranslation } from "react-i18next";
import { handleDisplayTimes } from "../../utils/time";
import NotifySuccessModal from "../../components/NotifySuccessModal";
import LoadingModal from "../../components/LoadingModal";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { app } from "../../constants/FirebaseStorage";

const Menu = (props) => {
  const { user, onLogin } = props;
  const { t, i18n } = useTranslation();
  const { experienceId } = useParams();
  const navigate = useNavigate();
  const [openTimes, setOpenTimes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notifySuccess, setNotifySuccess] = useState(false);
  const lang = i18n.language;
  const menu = MENUS[experienceId][lang];
  const availableTimes = handleDisplayTimes(menu.availableTimes);

  const order = (time) => {
    if (!user) {
      onLogin();
      return;
    }
    if (!time.date || !time.time) {
      navigate("./checkout");
    } else {
      navigate(`./checkout?date=${time.date}&time=${time.time}`);
    }
  };

  const requestTime = async () => {
    if (!user) {
      onLogin();
      return;
    }
    setLoading(true);
    try {
      const db = getDatabase(app);
      const dbRef = ref(db);
      await get(child(dbRef, `notify/${experienceId}`)).then(
        async (snapshot) => {
          const emails = snapshot.val() || [];
          !emails.find((email) => email === user.email) &&
            emails.push(user.email);
          await set(ref(db, `notify/${experienceId}`), emails);
          setNotifySuccess(true);
        }
      );
    } catch (error) {}
    setLoading(false);
  };

  if (!menu) return <></>;

  return (
    <div className={styles.box}>
      <div className={styles.container}>
        <div className={styles.title}>{menu.name}</div>
        <div className={styles.subtitle}>
          {`${menu.location}・${menu.duration} ${t("menu.hour")}・${
            menu.persons
          } ${t("menu.people")}`}
        </div>
        <div className={styles.images}>
          <div className={styles[`pcBanner${menu.images.length}`]}>
            {menu.images.map((image, index) => (
              <img
                key={image}
                className={styles[`image${index}`]}
                src={image}
                alt=""
              />
            ))}
          </div>
          <Swiper
            pagination={{
              clickable: true,
              bulletActiveClass: styles.bullet,
            }}
            slidesPerView={1}
            className={styles.swiper}
            modules={[Pagination]}
          >
            {menu.images.map((image, index) => (
              <SwiperSlide className={styles.slide} key={index}>
                <div className={styles.image}>
                  <img src={image} alt="" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={styles.mobileTitle}>{menu.name}</div>
        <div className={styles.mobileSubtitle}>{`${menu.location}・${
          menu.duration
        } ${t("menu.hour")}・${menu.persons} ${t("menu.people")}`}</div>
        <div className={styles.menuDetail}>
          <div className={styles.info}>
            <div className={styles.section}>
              <p>{t("menu.info")}</p>
              <div>{menu.description}</div>
              <div className={styles.image}>
                <img className={styles.image0} src={menu.images[0]} alt="" />
                <img className={styles.image1} src={menu.images[1]} alt="" />
                <img className={styles.image2} src={menu.images[2]} alt="" />
              </div>
            </div>
            <div className={styles.section}>
              <p>{t("menu.content")}</p>
              <div>{menu.detail}</div>
            </div>
          </div>
          <div className={styles.bookingContainer}>
            <div className={styles.booking}>
              <div className={styles.top}>
                <div className={styles.price}>
                  <p>{menu.price}$</p>/ {t("menu.person")}
                </div>
              </div>
              {availableTimes.slice(0, 3).map((time) => (
                <div className={styles.date} key={`${time.date}-${time.time}`}>
                  <p>{time.date}</p>
                  <div>{time.time}</div>
                  <p>
                    {menu.price}$ / {t("menu.person")}
                  </p>
                  <button onClick={() => order(time)}>{t("menu.order")}</button>
                </div>
              ))}
              {availableTimes.length > 3 && (
                <div className={styles.buttonContainer}>
                  <button onClick={() => setOpenTimes(true)}>
                    {t("menu.more")}
                  </button>
                </div>
              )}
              {availableTimes.length === 0 && (
                <>
                  <div className={styles.notime}>{t("menu.noTime")}</div>
                  <div className={styles.buttonContainer}>
                    <button
                      className={styles.requestTime}
                      onClick={requestTime}
                    >
                      {t("menu.requestTime")}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className={styles.host}>
          <div className={styles.section}>
            <div>
              <p>{t("menu.host", { name: menu.hostName })}</p>
              <div className={styles.description}>{menu.hostIntroduction}</div>
              <img src={menu.hostImage} alt="" />
            </div>
            <button
              onClick={requestTime}
              className={availableTimes.length === 0 ? styles.noTime : ""}
            >
              {t("menu.requestTime")}
            </button>
          </div>
          <div className={styles.image}>
            <img src={menu.hostImage} alt="" />
          </div>
        </div>
        <div
          className={
            availableTimes.length === 0 ? styles.noavaliable : styles.avaliable
          }
        >
          <div className={styles.section}>
            <p>{t("menu.available")}</p>
            <div className={styles.times}>
              {availableTimes.slice(0, 10).map((time) => (
                <div
                  className={styles.time}
                  key={`${time.date}-${time.time}-1`}
                  onClick={() => order(time)}
                >
                  <div className={styles.date}>{time.date}</div>
                  <div className={styles.t}>{time.time}</div>
                  <div className={styles.price}>
                    {menu.price}$ / {t("menu.person")}
                  </div>
                </div>
              ))}
              {availableTimes.length > 10 && (
                <div className={styles.more} onClick={() => setOpenTimes(true)}>
                  {t("menu.more")}
                </div>
              )}
            </div>
            {availableTimes.length === 0 ? (
              <>
                <div className={styles.notime}>{t("menu.noTime")}</div>
                <button onClick={requestTime} className={styles.request}>
                  {t("menu.requestTime")}
                </button>
              </>
            ) : (
              <button onClick={order}>{t("menu.order")}</button>
            )}
          </div>
        </div>
        <div className={styles.moreInfo}>
          <div className={styles.section}>
            <p>{t("menu.notice")}</p>
            <div className={styles.notices}>
              <div className={styles.notice}>
                <div className={styles.title}>{t("menu.customer")}</div>
                <div>
                  {t("menu.address")}：{menu.address}
                </div>
                {menu.addressGuide && (
                  <div>
                    {t("menu.addressGuide")}：{menu.addressGuide}
                  </div>
                )}
                {menu.allergy && (
                  <div>
                    {t("menu.allergy")}：{menu.allergy}
                  </div>
                )}
                {menu.notice && (
                  <div>
                    {t("menu.noticeDetail")}：{menu.notice}
                  </div>
                )}
              </div>
              <div className={styles.notice}>
                <div className={styles.title}>{t("menu.cancel")}</div>
                <div>
                  {t("menu.cancelDetail.1")}
                  <b>{t("menu.cancelDetail.2")}</b>
                  {t("menu.cancelDetail.3")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer className={styles.footer} />
      <div className={styles.mobileOrder}>
        <div>
          {menu.price}$/{t("menu.person")}
        </div>
        {availableTimes.length !== 0 ? (
          <button onClick={order}>{t("menu.order")}</button>
        ) : (
          <button className={styles.requestTime} onClick={requestTime}>
            {t("menu.requestTime")}
          </button>
        )}
      </div>
      <div
        className={styles.timesContainer}
        style={{ display: openTimes ? "flex" : "none" }}
      >
        <img
          className={styles.close}
          src={closeImg}
          alt=""
          onClick={() => setOpenTimes(false)}
        />
        {availableTimes.map((time) => (
          <div className={styles.time} key={`${time.date}-${time.time}-modal`}>
            <div className={styles.date}>{time.date}</div>
            <div className={styles.textContainer}>
              <div>
                <div className={styles.t}>{time.time}</div>
                <div className={styles.price}>
                  {menu.price}$ / {t("menu.person")}
                </div>
              </div>
              <button onClick={() => order(time)}>{t("menu.order")}</button>
            </div>
          </div>
        ))}
      </div>
      {notifySuccess && (
        <NotifySuccessModal onClose={() => setNotifySuccess(false)} />
      )}
      {loading && <LoadingModal />}
    </div>
  );
};

export default Menu;
