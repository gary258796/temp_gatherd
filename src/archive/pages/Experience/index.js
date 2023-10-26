import styles from "./index.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useNavigate, useParams } from "react-router-dom";
import { MENUS } from "../../constants/menus";
import Footer from "../../components/Footer";
import { useState } from "react";
import closeImg from "../../images/close.png";
import { handleDisplayTimes } from "../../utils/time";
import NotifySuccessModal from "../../components/NotifySuccessModal";
import LoadingModal from "../../components/LoadingModal";

const Experience = () => {
  const { experienceId } = useParams();
  const navigate = useNavigate();
  const [openTimes, setOpenTimes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notifySuccess, setNotifySuccess] = useState(false);
  const menu = MENUS[experienceId];
  const availableTimes = handleDisplayTimes(menu.availableTimes);

  const order = (time) => {
    if (!time.date || !time.time) {
      navigate("./checkout");
    } else {
      navigate(`./checkout?date=${time.date}&time=${time.time}`);
    }
  };

  const requestTime = async () => {
    setLoading(true);
    setNotifySuccess(true);
    setLoading(false);
  };

  if (!menu) return <></>;

  return (
    <div className={styles.box}>
      <div className={styles.container}>
        <div className={styles.title}>{menu.name}</div>
        <div className={styles.subtitle}>
          {`${menu.location}・${menu.duration} 小時・${
            menu.persons
          } 人`}
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
        } 小時・${menu.persons} 人`}</div>
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
                  <p>
                    {menu.price}$ / 人
                  </p>
                  <button onClick={() => order(time)}>預定</button>
                </div>
              ))}
              {availableTimes.length > 3 && (
                <div className={styles.buttonContainer}>
                  <button onClick={() => setOpenTimes(true)}>
                    查看更多
                  </button>
                </div>
              )}
              {availableTimes.length === 0 && (
                <>
                  <div className={styles.notime}>目前無可預約時間</div>
                  <div className={styles.buttonContainer}>
                    <button
                      className={styles.requestTime}
                      onClick={requestTime}
                    >
                      可預約通知我
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
              <p>Host 介紹,  {menu.hostName}</p>
              <div className={styles.description}>{menu.hostIntroduction}</div>
              <img src={menu.hostImage} alt="" />
            </div>
            <button
              onClick={requestTime}
              className={availableTimes.length === 0 ? styles.noTime : ""}
            >
              可預約通知我
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
            <p>可預訂時間</p>
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
                    {menu.price}$ / 人
                  </div>
                </div>
              ))}
              {availableTimes.length > 10 && (
                <div className={styles.more} onClick={() => setOpenTimes(true)}>
                  查看更多
                </div>
              )}
            </div>
            {availableTimes.length === 0 ? (
              <>
                <div className={styles.notime}>目前無可預約時間</div>
                <button onClick={requestTime} className={styles.request}>
                  可預約通知我
                </button>
              </>
            ) : (
              <button onClick={order}>預定</button>
            )}
          </div>
        </div>
        <div className={styles.moreInfo}>
          <div className={styles.section}>
            <p>注意事項</p>
            <div className={styles.notices}>
              <div className={styles.notice}>
                <div className={styles.title}>客人須知</div>
                <div>
                地址：{menu.address}
                </div>
                {menu.addressGuide && (
                  <div>
                    交通指引：{menu.addressGuide}
                  </div>
                )}
                {menu.allergy && (
                  <div>
                    過敏原：{menu.allergy}
                  </div>
                )}
                {menu.notice && (
                  <div>
                    注意事項：{menu.notice}
                  </div>
                )}
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
      <div className={styles.mobileOrder}>
        <div>
          {menu.price}$/人
        </div>
        {availableTimes.length !== 0 ? (
          <button onClick={order}>預定</button>
        ) : (
          <button className={styles.requestTime} onClick={requestTime}>
            可預約通知我
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
                  {menu.price}$ / 人
                </div>
              </div>
              <button onClick={() => order(time)}>預定</button>
            </div>
          </div>
        ))}
      </div>
      <Footer className={styles.footer} />
      {notifySuccess && (
        <NotifySuccessModal onClose={() => setNotifySuccess(false)} />
      )}
      {loading && <LoadingModal />}
    </div>
  );
};

export default Experience;