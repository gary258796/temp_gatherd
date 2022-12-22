import styles from "./index.module.scss";
import { Card, CardContent, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState } from "react";
import arrowImg from "../../images/arrow.png";

const SetMenuCard = (props) => {
  const { menu, vendor, onClick } = props;
  const [swiper, setSwiper] = useState(undefined);

  const handleSwipe = (e, isNext) => {
    e.stopPropagation();
    isNext ? swiper.slideNext() : swiper.slidePrev();
  };

  console.log(vendor);

  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.swiperContainer}>
        <img
          className={styles.arrowBack}
          src={arrowImg}
          alt=""
          onClick={(e) => handleSwipe(e, false)}
        />
        <Swiper
          slidesPerView={1}
          onSwiper={setSwiper}
          className={styles.swiper}
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
          onClick={(e) => handleSwipe(e, true)}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.location}>{vendor.location}大安區</div>
        <div className={styles.name}>{menu.name}</div>
        <Typography noWrap className={styles.description}>
          {menu.description}
        </Typography>
        <div className={styles.vendor}>美食創作家 {vendor.name}</div>
        <div className={styles.price}>${menu.price} / 人</div>
      </div>
    </div>
  );
};

export default SetMenuCard;
