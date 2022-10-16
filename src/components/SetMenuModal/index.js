import styles from "./index.module.scss";
import { Button, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState } from "react";
import { PAYMENT_MOTHODS, VENDORS_DATA } from "../../constants/Vendors";
import { SET_MENU_TYPES, DISH_TYPES } from "../../constants/SetMenus";
import arrowImg from "../../images/arrow.png";
import pinImg from "../../images/pin.png";
import lineImg from "../../images/line.png";
import jkoImg from "../../images/jko.png";
import bankImg from "../../images/bank.png";
import cashImg from "../../images/cash.png";
import closeImg from "../../images/close.png";

const SetMenuModal = (props) => {
  const { menu, isOpen, onClose } = props;
  const [swiper, setSwiper] = useState(undefined);
  const vendor = VENDORS_DATA.find((vendor) => vendor.id === menu.vendorId);

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
      case PAYMENT_MOTHODS.LINEPAY:
        return lineImg;
      case PAYMENT_MOTHODS.JKO:
        return jkoImg;
      case PAYMENT_MOTHODS.BANK:
        return bankImg;
      default:
        return "";
    }
  };

  const handleOrderButtonOnClick = () => {
    window.open(
      "https://docs.google.com/forms/d/1_sXY9e8RZkT4jGH89JJQoA7eN3cDhp280ZHCXEg2_0c/prefill"
    );
  };

  if (!isOpen) return <></>;

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
          <Swiper slidesPerView={1} onSwiper={setSwiper}>
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
            <Typography variant="body1">{vendor.description}</Typography>
          </div>
          <img src={vendor.profileImage} alt="" />
        </div>
        <div className={styles.dishes}>
          <Typography variant="h5" className={styles.title}>
            餐點
          </Typography>
          {menu.type === SET_MENU_TYPES.SET ? (
            <>
              <div className={styles.part}>
                <Typography variant="h6" className={styles.subtitle}>
                  前菜
                </Typography>
                {menu.dishes
                  .filter((dish) => dish.type === DISH_TYPES.APPETIZER)
                  .map(handleDishRender)}
              </div>
              <div className={styles.part}>
                <Typography variant="h6" className={styles.subtitle}>
                  主餐
                </Typography>
                {menu.dishes
                  .filter((dish) => dish.type === DISH_TYPES.MAIN_DISH)
                  .map(handleDishRender)}
              </div>
              <div className={styles.part}>
                <Typography variant="h6" className={styles.subtitle}>
                  副餐
                </Typography>
                {menu.dishes
                  .filter((dish) => dish.type === DISH_TYPES.SIDE_DISH)
                  .map(handleDishRender)}
              </div>
              <div className={styles.part}>
                <Typography variant="h6" className={styles.subtitle}>
                  甜點
                </Typography>
                {menu.dishes
                  .filter((dish) => dish.type === DISH_TYPES.DESSERT)
                  .map(handleDishRender)}
              </div>
            </>
          ) : (
            <>{menu.dishes.map(handleDishRender)}</>
          )}
        </div>
        <div className={styles.times}>
          <Typography variant="h5" className={styles.title}>
            可訂餐時段
          </Typography>
          {menu.avaliableTimes.map((time) => (
            <div className={styles.date} key={`${time.day}${time.period}`}>
              <Typography variant="body2">
                {time.day} {time.period}
              </Typography>
              <Typography variant="overline">份量：{time.amount}</Typography>
            </div>
          ))}
          <Typography variant="body1" className={styles.lastOrderDays}>
            最晚 {menu.lastOrderDays} 天前預訂，最早 7 天前預訂，最晚 3 天前取消
          </Typography>
        </div>
        <div className={styles.payment}>
          <Typography variant="h5" className={styles.title}>
            付款方式
          </Typography>
          <div className={styles.methods}>
            {vendor.paymentMethods.map((method) => (
              <Typography
                variant="body1"
                key={method}
                className={styles.method}
              >
                <img src={handlePaymentMethodImg(method)} alt="" />
                <Typography variant="caption">{method}</Typography>
              </Typography>
            ))}
          </div>
        </div>
        <div className={styles.more}>
          <Typography variant="h5" className={styles.title}>
            更多資訊
          </Typography>
          <Typography variant="body2">- 過敏原: {menu.allergy}</Typography>
          <Typography variant="body2">- {menu.memo}</Typography>
          <Typography variant="body2">
            -
            若需取消或是修改訂單，會於下訂成功的郵件中附上表單，在訂單日期三天前皆可取消或修改訂單
          </Typography>
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
