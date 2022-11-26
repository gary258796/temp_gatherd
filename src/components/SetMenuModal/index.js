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

  const handleDishRender = (dish) => {
    return (
      <div className={styles.dish} key={dish.name}>
        <div className={styles.bar} />
        <div>
          <Typography variant="body2">{dish.name}</Typography>
          <Typography variant="caption">{dish.memo}</Typography>
        </div>
      </div>
    );
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

  const handleTimeDayText = (weekDay) => {
    let d = new Date();
    d.setDate(d.getDate() + ((weekDay + 7 - d.getDay()) % 7));
    return moment(d).format("Y/M/D");
  };

  const handleAvailableTimesRender = (time) => {
    let isNotAvailable = false;
    let timeText = handleTimeDayText(time.day);
    vendor.booked.forEach((date) => {
      if (timeText + "/" + time.period === date) {
        isNotAvailable = true;
      }
    });
    switch (time.period) {
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
    timeText += time.time;
    return (
      <div className={styles.date} key={`${time.day}${time.period}`}>
        <Typography variant="body2">{timeText}</Typography>
        <Typography
          variant="overline"
          className={isNotAvailable ? styles.notAvailable : styles.available}
        >
          已預訂
        </Typography>
      </div>
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
          <Typography variant="h4" className={styles.name}>
            {menu.name}
          </Typography>
          <Typography variant="body1" className={styles.description}>
            {menu.description}
          </Typography>
          <Typography
            variant="caption"
            className={styles.address}
            onClick={() => window.open(vendor.addressUrl)}
          >
            <img src={pinImg} alt="" />
            {vendor.address}
          </Typography>
        </div>
        <div className={styles.vendor}>
          <div>
            <Typography variant="h6" className={styles.name}>
              <div>美食創作家</div>
              <div>{vendor.name}</div>
            </Typography>
            <Typography variant="body1">{vendor.introduction}</Typography>
          </div>
          <img src={vendor.image} alt="" />
        </div>
        <div className={styles.dishes}>
          <Typography variant="h5" className={styles.title}>
            餐點
          </Typography>
          <Typography variant="body2">{menu.menu}</Typography>
        </div>
        <div className={styles.times}>
          <Typography variant="h5" className={styles.title}>
            可訂餐時段
          </Typography>
          <Typography variant="body1" className={styles.subtitle}>
            各時段可預訂人數：{menu.amount}
          </Typography>
          {vendor.available.map(handleAvailableTimesRender)}
          <Typography variant="body1" className={styles.lastOrderDays}>
            最晚 {menu.finalOrder} 天前預訂，最早 7 天前預訂，最晚 3 天前取消
          </Typography>
        </div>
        <div className={styles.payment}>
          <Typography variant="h5" className={styles.title}>
            付款方式
          </Typography>
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
        </div>
        <div className={styles.more}>
          <Typography variant="h5" className={styles.title}>
            更多資訊
          </Typography>
          <div className={styles.moreInfo}>
            <div>
              <Typography variant="body2">-</Typography>
              <Typography variant="body2">-</Typography>
              <Typography variant="body2">-</Typography>
            </div>
            <div>
              <Typography variant="body2" className={styles.text}>
                過敏原: {menu.allergy || "無"}
              </Typography>
              <Typography variant="body2" className={styles.text}>
                備註：{menu.memo || "無"}
              </Typography>
              <Typography variant="body2" className={styles.text}>
                若需取消或是修改訂單，會於下訂成功的郵件中附上表單，在訂單日期三天前皆可取消或修改訂單，如在訂單日期三天內取消訂單你將需支付總費用的
                50% 。
              </Typography>
            </div>
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
