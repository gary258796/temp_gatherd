import { Typography } from "@mui/material";
import React from "react";
import styles from "./index.module.scss";
import "swiper/css";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import ItemCard from "../../components/ItemCard";
import { MENUS } from "../../constants/menus";
import { useTranslation } from "react-i18next";

const Home = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.top}>
          <Typography variant="body2" className={styles.title}>
            {t("home.title")}
          </Typography>
          <Typography variant="body2" className={styles.subtitle}>
            {t("home.subtitle")}
          </Typography>
          <div className={styles.cards}>
            {MENUS.map((menu, index) => (
              <ItemCard
                key={index}
                images={menu[lang].images}
                location={menu[lang].location}
                name={menu[lang].name}
                price={menu[lang].price}
                onClick={() => navigate(`../experiences/${index}`)}
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
