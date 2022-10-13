import { Typography } from "@mui/material";
import React, { useState } from "react";
import styles from "./index.module.scss";
import "swiper/css";
import SetMenuCard from "../../components/SetMenuCard";
import { SET_MENUS } from "../../constants/SetMenus";
import SetMenuModal from "../../components/SetMenuModal";
import PasswordModal from "../../components/PasswordModal";

const Home = () => {
  const [selectedSetMenu, setSelectedSetMenu] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [passwordModalIsOpen, setPasswordModalIsOpen] = useState(true);

  return (
    <div className={styles.container}>
      <Typography variant="h2" className={styles.title}>
        Gatherd
      </Typography>
      <Typography variant="subtitle1" className={styles.subtitle}>
        在美食創作家家中，透過一道道佳餚，與您分享生活、文化以及他們的人生經歷。快和創作家預定美食，一起
        Gatherd 吧！
      </Typography>
      <div className={styles.cards}>
        {SET_MENUS.map((menu, index) => (
          <SetMenuCard
            key={index}
            menu={menu}
            onClick={() => {
              setSelectedSetMenu(menu);
              setModalIsOpen(true);
            }}
          />
        ))}
      </div>
      <SetMenuModal
        menu={selectedSetMenu}
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      />
      <PasswordModal
        isOpen={passwordModalIsOpen}
        onCorrect={() => setPasswordModalIsOpen(false)}
      />
    </div>
  );
};

export default Home;
