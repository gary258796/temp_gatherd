import styles from "./index.module.scss";
import { Button, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState } from "react";
import { PAYMENT_MOTHODS } from "../../constants/Vendors";
import { SET_MENU_TYPES, DISH_TYPES } from "../../constants/SetMenus";
import arrowImg from "../../images/arrow.png";
import pinImg from "../../images/pin.png";
import lineImg from "../../images/line.png";
import jkoImg from "../../images/jko.png";
import bankImg from "../../images/bank.png";
import cashImg from "../../images/cash.png";
import closeImg from "../../images/close.png";
import moment from "moment";

const SetMenuModal = (props) => {
  const { menu, vendor, isOpen, onClose } = props;
  const [swiper, setSwiper] = useState(undefined);

  const handleSwipe = (isNext) => {
    isNext ? swiper.slideNext() : swiper.slidePrev();
  };

  const handlePaymentMethodImg = (method) => {
    switch (method) {
      case PAYMENT_MOTHODS.CASH:
        return cashImg;
      case PAYMENT_MOTHODS.BANK:
        return bankImg;
      case PAYMENT_MOTHODS.LINEPAY:
        return lineImg;
      case PAYMENT_MOTHODS.JKO:
        return jkoImg;
      default:
        return "";
    }
  };

  const handlePaymentMethodText = (method) => {
    switch (method) {
      case PAYMENT_MOTHODS.CASH:
        return "現金";
      case PAYMENT_MOTHODS.BANK:
        return "匯款";
      case PAYMENT_MOTHODS.LINEPAY:
        return "Line Pay";
      case PAYMENT_MOTHODS.JKO:
        return "街口支付";
      default:
        return "";
    }
  };

  const handleOrderButtonOnClick = () => {
    window.open("https://forms.gle/vPoxWfHhhafXsoAR6");
  };

  const handleTimeRender = () => {
    const times = [];
    for (let index = -7; index <= 7; index++) {
      let isAvailable = true;
      const curr = new Date();
      const day = curr.getDate() + index;
      const date = new Date(curr.setDate(day));
      const availablePeriods = vendor.available.filter(
        (time) => time.day === date.getDay() + 1
      );
      if (availablePeriods.length > 0) {
        date.setDate(date.getDate() + 1);
        let timeText = moment(date).format("Y/MM/DD");
        availablePeriods.forEach((period) => {
          if (
            vendor.booked?.find(
              (time) => timeText + "/" + period.period === time
            )
          ) {
            isAvailable = false;
          }
          switch (period.period) {
            case 1:
              timeText += " 早餐 ";
              break;
            case 2:
              timeText += " 午餐 ";
              break;
            case 3:
              timeText += " 晚餐 ";
              break;
            default:
              break;
          }
          timeText += period.time;
          times.push({ time: timeText, isAvailable });
        });
      }
    }
    return (
      <>
        {times.map((time) => (
          <div className={styles.date} key={`${time.time}`}>
            <Typography variant="body2">{time.time}</Typography>
            <Typography
              variant="overline"
              className={
                time.isAvailable ? styles.available : styles.notAvailable
              }
            >
              已預訂
            </Typography>
          </div>
        ))}
      </>
    );
  };

  if (!isOpen || !vendor || !menu) return <></>;

  return (
    <div className={styles.container}>
      <div className={styles.closeContainer}>
        <img src={closeImg} alt="" onClick={() => onClose()} />
      </div>
      <div className={styles.modal}>
        <div className={styles.swiperContainer}>
          <img
            className={styles.arrowBack}
            src={arrowImg}
            alt=""
            onClick={(e) => handleSwipe(false)}
          />
          <Swiper
            className={styles.swiper}
            slidesPerView={1}
            onSwiper={setSwiper}
          >
            {menu.images.map((image, index) => (
              <SwiperSlide className={styles.slide} key={index}>
                <img src={image} alt="" />
              </SwiperSlide>
            ))}
          </Swiper>
          <img
            className={styles.arrowForward}
            src={arrowImg}
            alt=""
            onClick={(e) => handleSwipe(true)}
          />
        </div>
        <div className={styles.menuInfo}>
          <div className={styles.name}>{menu.name}</div>
          <div className={styles.description}>{menu.description}</div>
        </div>
        <div className={styles.vendor}>
          <div>
            <div className={styles.title}>
              <div>美食創作家</div>
              <div>{vendor.name}</div>
            </div>
            <div className={styles.introduction}>{vendor.introduction}</div>
          </div>
          <img src={vendor.image} alt="" />
        </div>
        <div className={styles.dishes}>
          <div className={styles.title}>套餐內容</div>
          <div className={styles.dishContainer}>
            {menu.menu.split("\n").map((dish) => (
              <div className={styles.dish}>・{dish}</div>
            ))}
          </div>
        </div>
        <div className={styles.times}>
          <div className={styles.title}>可訂餐時段</div>
          <div className={styles.subtitle}>各時段可預訂人數：{menu.amount}</div>
          {handleTimeRender()}
          <Typography variant="body1" className={styles.lastOrderDays}>
            最晚 {menu.finalOrder} 天前預訂，最早 7 天前預訂，最晚 3 天前取消
          </Typography>
        </div>
        {/* <div className={styles.payment}>
          <div className={styles.title}>付款方式</div>
          <div className={styles.methods}>
            {vendor.payment.map((method) => (
              <Typography
                variant="body1"
                key={method}
                className={styles.method}
              >
                <img src={handlePaymentMethodImg(method)} alt="" />
                <Typography variant="caption">
                  {handlePaymentMethodText(method)}
                </Typography>
              </Typography>
            ))}
          </div>
        </div> */}
        <div className={styles.addressContainer}>
          <div className={styles.title}>地址資訊</div>
          <Typography
            variant="caption"
            className={styles.address}
            onClick={() => window.open(vendor.addressUrl)}
          >
            <img src={pinImg} alt="" />
            {vendor.address}
          </Typography>
        </div>
        <div className={styles.more}>
          <div className={styles.title}>更多資訊</div>
          <div className={styles.moreInfo}>
            {menu.allergy && (
              <div className={styles.info}>
                <Typography variant="body2">-</Typography>
                <Typography variant="body2" className={styles.text}>
                  過敏原: {menu.allergy}
                </Typography>
              </div>
            )}
            {menu.memo && (
              <div className={styles.info}>
                <Typography variant="body2">-</Typography>
                <Typography variant="body2" className={styles.text}>
                  備註：{menu.memo}
                </Typography>
              </div>
            )}
            {vendor.addressGuide && (
              <div className={styles.info}>
                <Typography variant="body2">-</Typography>
                <Typography variant="body2" className={styles.text}>
                  交通指引：{vendor.addressGuide}
                </Typography>
              </div>
            )}
            {/* <div className={styles.info}>
              <Typography variant="body2">-</Typography>
              <Typography variant="body2" className={styles.text}>
                若需取消訂單，會於下訂成功的郵件中附上取消表單，在訂單日期三天前皆可取消訂單，
                <b>如在訂單日期三天內取消訂單你將需支付總費用的 50%。</b>
              </Typography>
            </div> */}
          </div>
        </div>
        <div className={styles.buttons}>
          <Button variant="contained" onClick={handleOrderButtonOnClick}>
            訂餐 ${menu.price}/人
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SetMenuModal;
