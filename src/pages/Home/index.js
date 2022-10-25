import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import "swiper/css";
import SetMenuCard from "../../components/SetMenuCard";
import SetMenuModal from "../../components/SetMenuModal";
import PasswordModal from "../../components/PasswordModal";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, child, set } from "firebase/database";

const Home = () => {
  const [selectedSetMenu, setSelectedSetMenu] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [passwordModalIsOpen, setPasswordModalIsOpen] = useState(true);
  const [menus, setMenus] = useState([]);
  const [vendor, setVendor] = useState({});
  const firebaseConfig = {
    databaseURL:
      "https://gatherd-test-default-rtdb.asia-southeast1.firebasedatabase.app/",
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const dbRef = ref(db);

  useEffect(() => {
    // 用來寫入資料用
    // set(ref(db, "vendor"), VENDORS_DATA);
    // set(ref(db, "menu"), SET_MENUS);
    get(child(dbRef, "menu"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setMenus(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (
      selectedSetMenu.vendorId === undefined ||
      vendor.id === selectedSetMenu.vendorId
    )
      return;
    get(child(dbRef, `vendor/${selectedSetMenu.vendorId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setVendor(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedSetMenu]);

  return (
    <div className={styles.container}>
      <Typography variant="h2" className={styles.title}>
        Gatherd
      </Typography>
      <Typography variant="subtitle1" className={styles.subtitle}>
        在美食創作家家中，透過一道道佳餚，與您分享生活、文化以及他們的人生經歷。快與創作家預定美食吧！
      </Typography>
      <div className={styles.cards}>
        {menus.map((menu, index) => (
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
        vendor={vendor}
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
