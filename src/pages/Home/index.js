import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import "swiper/css";
import SetMenuCard from "../../components/SetMenuCard";
import SetMenuModal from "../../components/SetMenuModal";
import PasswordModal from "../../components/PasswordModal";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, child, set } from "firebase/database";
import logoImg from "../../images/logo.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [selectedSetMenu, setSelectedSetMenu] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [passwordModalIsOpen, setPasswordModalIsOpen] = useState(true);
  const mockMenu = {
    id: 0, // Set menu ID
    vendorId: 0, // 對應美食創作家 ID
    name: "set menu", // 名稱
    description: "description", // 介紹
    images: ["", "", ""], // 照片
    price: 100, // 售價
    amount: 3, // 數量
    finalOrder: 5, // 需提前幾天預定
    menu: "dish one\ndish two\ndish three", // 菜單
    allergy: null, // 過敏原，如有多個，用逗點隔開即可
    memo: null,
  };
  const mockVnedor = {
    id: 0, // 美食創作家 id
    email: "email@email.com", // email
    name: "name", // 姓名
    image: "123", // 大頭照
    introduction: "introduction", // 自我介紹
    phone: "0987654321", // 手機
    lineName: "line", // Line 名稱
    birthday: "1999/11/11", // 生日，格式：YYYY/MM/DD
    address: "台北市什麼路", // 地址
    addressUrl: "www.google.com",
    location: "大安區", // 區（地址）
    payment: [1, 4],
    // 付款方式（1:現金|2:轉帳|3:LinePay|4:街口支付）
    available: [
      {
        day: 1, // 星期幾
        period: 2, // 時段（1:早餐|2:午餐|3:晚餐）
        time: "12:00-14:00", // 時間，格式：HH:MM-HH:MM
      },
      {
        day: 1, // 星期幾
        period: 3, // 時段（1:早餐|2:午餐|3:晚餐）
        time: "19:00-21:00", // 時間，格式：HH:MM-HH:MM
      },
      {
        day: 6, // 星期幾
        period: 3, // 時段（1:早餐|2:午餐|3:晚餐）
        time: "18:00-21:00", // 時間，格式：HH:MM-HH:MM
      },
      {
        day: 7, // 星期幾
        period: 2, // 時段（1:早餐|2:午餐|3:晚餐）
        time: "12:00-14:00", // 時間，格式：HH:MM-HH:MM
      },
    ],
    booked: ["2022/11/28/2"],
  };
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
      <img
        className={styles.logo}
        src={logoImg}
        alt=""
        onClick={() => navigate("../explore")}
      />
      <Typography variant="body2" className={styles.title}>
        美食創作家體驗
      </Typography>
      <Typography variant="body2" className={styles.subtitle}>
        到美食創作家家中，透過一道道佳餚，與你分享生活、文化以及他們的人生經歷。快與創作家預定美食吧！
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
