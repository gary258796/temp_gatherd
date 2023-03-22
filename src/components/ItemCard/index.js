import styles from "./index.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

const ItemCard = (props) => {
  const { images, location, name, price, onClick } = props;

  return (
    <div className={styles.container}>
      <div className={styles.images} onClick={onClick}>
        <Swiper
          pagination={{
            clickable: true,
            bulletActiveClass: styles.bullet,
          }}
          slidesPerView={1}
          className={styles.swiper}
          modules={[Pagination]}
        >
          {images.map((image, index) => (
            <SwiperSlide className={styles.slide} key={index}>
              <div className={styles.image}>
                <img src={image} alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.text}>
        <div className={styles.location}>{location}</div>
        <div className={styles.name}>{name}</div>
        <div className={styles.price}>${price}</div>
      </div>
    </div>
  );
};

export default ItemCard;
