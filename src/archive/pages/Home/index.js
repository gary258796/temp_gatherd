import { Typography } from "@mui/material";
import React from "react";
import styles from "./index.module.scss";
import "swiper/css";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import ItemCard from "../../components/ItemCard";
import { MENUS } from "../../constants/menus";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.top}>
          <Typography variant="body2" className={styles.title}>
            不一樣的聚餐體驗
          </Typography>
          <Typography variant="body2" className={styles.subtitle}>
            來到烹飪料理者家中，透過一道道料理，與你分享生活、文化以及他們的人生故事。快與他們預定美食吧！
          </Typography>
          <div className={styles.cards}>
            {MENUS.map((menu, index) => (
              <ItemCard
                key={index}
                images={menu.images}
                location={menu.location}
                name={menu.name}
                price={menu.price}
                onClick={() => navigate(`/archive/experiences/${index}`)}
              />
            ))}
          </div>
        </div>
        <Footer className={styles.footer} />
      </div>
    </>
  );
};

export default Home;
