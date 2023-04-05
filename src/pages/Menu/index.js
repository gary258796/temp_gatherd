import styles from "./index.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { useParams } from "react-router-dom";
import { MENUS } from "../../constants/menus";
import Footer from "../../components/Footer";
import { useState } from "react";
import closeImg from "../../images/close.png";
import moment from "moment";

const Menu = () => {
  const { experienceId } = useParams();
  const [openTimes, setOpenTimes] = useState(false);
  const menu = MENUS[experienceId];

  const order = () => {
    window.open("https://forms.gle/vPoxWfHhhafXsoAR6");
  };

  const requestTime = () => {
    window.open("https://forms.gle/EdW4pko259bbyhL46");
  };

  const handleDisplayTimes = () => {
    const today = new Date();
    return menu.availableTimes.filter(
      (time) => moment(time.id).toDate() > today
    );
  };

  const availableTimes = handleDisplayTimes();

  if (!menu) return <></>;

  return (
    <div className={styles.box}>
      <div className={styles.container}>
        <div className={styles.title}>{menu.name}</div>
        <div className={styles.subtitle}>
          {`${menu.location}・${menu.duration} 小時`}
        </div>
        <div className={styles.images}>
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
        <div
          className={styles.mobileSubtitle}
        >{`${menu.location}・${menu.duration} 小時`}</div>
        <div className={styles.menuDetail}>
          <div className={styles.info}>
            <div className={styles.section}>
              <p>體驗介紹</p>
              <div>{menu.description}</div>
              <div className={styles.image}>
                <img className={styles.image0} src={menu.images[0]} alt="" />
                <img className={styles.image1} src={menu.images[1]} alt="" />
                <img className={styles.image2} src={menu.images[2]} alt="" />
              </div>
            </div>
            <div className={styles.section}>
              <p>體驗內容</p>
              <div>{menu.detail}</div>
            </div>
          </div>
          <div className={styles.bookingContainer}>
            <div className={styles.booking}>
              <div className={styles.top}>
                <div className={styles.price}>
                  <p>{menu.price}$</p>/ 人
                </div>
              </div>
              {availableTimes.slice(0, 3).map((time) => (
                <div className={styles.date} key={`${time.date}-${time.time}`}>
                  <p>{time.date}</p>
                  <div>{time.time}</div>
                  <p>{menu.price}$ / 人</p>
                  <button onClick={order}>預定</button>
                </div>
              ))}
              {availableTimes.length > 3 && (
                <div className={styles.buttonContainer}>
                  <button onClick={() => setOpenTimes(true)}>更多時間</button>
                </div>
              )}
              {availableTimes.length === 0 && <div>目前無可預約時間</div>}
            </div>
          </div>
        </div>
        <div className={styles.host}>
          <div className={styles.section}>
            <div>
              <p>Host 介紹</p>
              <div className={styles.description}>{menu.hostIntroduction}</div>
              <img src={menu.hostImage} alt="" />
            </div>
            <button onClick={requestTime}>詢問其他時間</button>
          </div>
          <div className={styles.image}>
            <img src={menu.hostImage} alt="" />
          </div>
        </div>
        <div className={styles.avaliable}>
          <div className={styles.section}>
            <p>可預訂時間</p>
            <div className={styles.times}>
              {availableTimes.slice(0, 10).map((time) => (
                <div
                  className={styles.time}
                  key={`${time.date}-${time.time}-1`}
                >
                  <div className={styles.date}>{time.date}</div>
                  <div className={styles.t}>{time.time}</div>
                  <div className={styles.price}>{menu.price}$ / 人</div>
                </div>
              ))}
              {availableTimes.length > 10 && (
                <div className={styles.more} onClick={() => setOpenTimes(true)}>
                  查看更多
                </div>
              )}
            </div>
            {availableTimes.length === 0 ? (
              <div>目前無可預約時間</div>
            ) : (
              <button onClick={order}>預訂</button>
            )}
          </div>
        </div>
        <div className={styles.moreInfo}>
          <div className={styles.section}>
            <p>注意事項</p>
            <div className={styles.notices}>
              <div className={styles.notice}>
                <div className={styles.title}>客人須知</div>
                <div>地址：{menu.address}</div>
                {menu.addressGuide && <div>交通指引：{menu.addressGuide}</div>}
                {menu.allergy && <div>過敏原：{menu.allergy}</div>}
                {menu.notice && <div>注意事項：{menu.notice}</div>}
              </div>
              <div className={styles.notice}>
                <div className={styles.title}>取消政策</div>
                <div>
                  若需取消訂單，會於下訂成功的郵件中附上取消表單，在訂單日期三天前皆可取消訂單，
                  <b>如在訂單日期三天內取消訂單你將需支付總費用的 50%。</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <div className={styles.mobileOrder}>
        <div>{menu.price}$/人</div>
        <button onClick={order}>預訂</button>
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
                <div className={styles.price}>{menu.price}$ / 人</div>
              </div>
              <button onClick={order}>預定</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
