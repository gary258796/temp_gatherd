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
  const [vendors, setVendors] = useState([]);
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
    get(child(dbRef, "/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setMenus(snapshot.val().menu);
          setVendors(snapshot.val().vendor);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <Typography variant="h2" className={styles.title}>
        Gatherd
      </Typography>
      <Typography variant="subtitle1" className={styles.subtitle}>
        在美食創作家家中，透過一道道佳餚，與你分享生活、文化以及他們的人生經歷。快與創作家預定美食吧！
      </Typography>
      <div className={styles.cards}>
        {menus.map((menu, index) => {
          const vendor = vendors.find((vendor) => vendor.id === menu.vendorId);
          if (!vendor) return <></>;
          return (
            <SetMenuCard
              key={index}
              menu={menu}
              vendor={vendor}
              onClick={() => {
                setSelectedSetMenu(menu);
                setModalIsOpen(true);
              }}
            />
          );
        })}
      </div>
      <SetMenuModal
        menu={selectedSetMenu}
        vendor={
          vendors.find((vendor) => vendor.id === selectedSetMenu.vendorId) || {}
        }
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
