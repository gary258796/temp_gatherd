import styles from "./index.module.scss";
import { Card, CardContent, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState } from "react";
import { VENDORS_DATA } from "../../constants/Vendors";
import arrowImg from "../../images/arrow.png";

const SetMenuCard = (props) => {
  const { menu, onClick } = props;
  const [swiper, setSwiper] = useState(undefined);
  const vendor = VENDORS_DATA.find((vendor) => vendor.id === menu.vendorId);

  const handleSwipe = (e, isNext) => {
    e.stopPropagation();
    isNext ? swiper.slideNext() : swiper.slidePrev();
  };

  return (
    <Card className={styles.card} onClick={onClick}>
      <CardContent>
        <div className={styles.swiperContainer}>
          <img
            className={styles.arrowBack}
            src={arrowImg}
            alt=""
            onClick={(e) => handleSwipe(e, false)}
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
            onClick={(e) => handleSwipe(e, true)}
          />
        </div>
        <div className={styles.cardTitle}>
          <Typography variant="h6">{menu.name}</Typography>
          <Typography variant="caption" className={styles.location}>
            {vendor.location}
          </Typography>
        </div>
        <Typography variant="body2" noWrap className={styles.description}>
          {menu.description}
        </Typography>
        <div className={styles.bottom}>
          <Typography variant="h6">${menu.price}</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default SetMenuCard;
