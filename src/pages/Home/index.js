import { Typography } from "@mui/material";
import React from "react";
import styles from "./index.module.scss";
import "swiper/css";
// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, get, child, set } from "firebase/database";
import logoImg from "../../images/logo.png";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import ItemCard from "../../components/ItemCard";
import { MENUS } from "../../constants/menus";
import { useTranslation } from "react-i18next";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  // const [selectedSetMenu, setSelectedSetMenu] = useState({});
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [menus, setMenus] = useState([]);
  // const [vendors, setVendors] = useState([]);
  // const firebaseConfig = {
  //   databaseURL:
  //     "https://gatherd-test-default-rtdb.asia-southeast1.firebasedatabase.app/",
  // };

  // const app = initializeApp(firebaseConfig);
  // const db = getDatabase(app);
  // const dbRef = ref(db);

  // useEffect(() => {
  //   // 用來寫入資料用
  //   // set(ref(db, "vendor"), VENDORS_DATA);
  //   // set(ref(db, "menu"), SET_MENUS);
  //   get(child(dbRef, "/"))
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         setMenus(snapshot.val().menu);
  //         setVendors(snapshot.val().vendor);
  //       } else {
  //         console.log("No data available");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.top}>
          <img
            className={styles.logo}
            src={logoImg}
            alt=""
            onClick={() => navigate("../joinus")}
          />
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
                images={menu.images}
                location={menu.location}
                name={menu.name}
                price={menu.price}
                onClick={() => navigate(`../experiences/${index}`)}
              />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
